import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema with strict input validation
const SubmissionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().nullable(),
  functie: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(200),
  employees: z.number().int().positive().max(1000000),
  avgSalary: z.number().positive().max(10000000),
  currentAbsenteeism: z.number().min(0).max(100),
  sector: z.string().trim().min(1).max(100),
  calculationResults: z.object({
    totaleLoonkosten: z.number(),
    huidigeVerzuimkosten: z.number(),
    numberOfGroups: z.number(),
    investment: z.number(),
    scenarios: z.object({
      conservative: z.object({
        verzuimBesparing: z.number(),
        uitvalReductie: z.number(),
        productiviteitBesparing: z.number(),
        totaleBesparing: z.number(),
        netBesparing: z.number(),
        roi: z.number(),
      }),
      positive: z.object({
        verzuimBesparing: z.number(),
        uitvalReductie: z.number(),
        productiviteitBesparing: z.number(),
        totaleBesparing: z.number(),
        netBesparing: z.number(),
        roi: z.number(),
      }),
    }),
  }),
});

interface CalculatorSubmission {
  name: string;
  email: string;
  phone?: string;
  functie: string;
  company: string;
  employees: number;
  avgSalary: number;
  currentAbsenteeism: number;
  sector: string;
  calculationResults: any;
}

// In-memory rate limiting store (resets on function restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting: 3 submissions per email per hour
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(email: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = email.toLowerCase();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

// HTML escape function to prevent XSS attacks
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Format currency helper
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Parse and validate input
    const rawData = await req.json();
    
    let submission: CalculatorSubmission;
    try {
      submission = SubmissionSchema.parse(rawData);
    } catch (validationError) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid input data. Please check your submission and try again." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check rate limit
    const rateLimitCheck = checkRateLimit(submission.email);
    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for email: ${submission.email}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Te veel aanvragen. Probeer het over ${rateLimitCheck.retryAfter} seconden opnieuw.`,
          retryAfter: rateLimitCheck.retryAfter
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": rateLimitCheck.retryAfter?.toString() || "3600",
            ...corsHeaders 
          },
        }
      );
    }

    // Check for duplicate submissions within last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentSubmissions, error: checkError } = await supabase
      .from("calculator_submissions")
      .select("id")
      .eq("email", submission.email)
      .gte("created_at", fiveMinutesAgo)
      .limit(1);

    if (checkError) {
      console.error("Error checking for duplicates:", checkError);
    } else if (recentSubmissions && recentSubmissions.length > 0) {
      console.warn(`Duplicate submission attempt from: ${submission.email}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "U heeft recent al een berekening aangevraagd. Controleer uw e-mail of probeer het later opnieuw." 
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Validated calculator submission:", {
      email: submission.email,
      company: submission.company
    });

    // Store in database - include sector in calculation_results
    const calculationResultsWithSector = {
      ...submission.calculationResults,
      sector: submission.sector
    };

    const { data, error: dbError } = await supabase
      .from("calculator_submissions")
      .insert({
        name: submission.name,
        email: submission.email,
        phone: submission.phone || null,
        functie: submission.functie,
        company: submission.company,
        employees: submission.employees,
        avg_employee_costs: submission.avgSalary,
        current_absenteeism: submission.currentAbsenteeism,
        current_turnover: 0, // Not used in business case calculator
        calculation_results: calculationResultsWithSector,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Successfully stored submission in database:", data);

    // Escape all user-controlled data
    const safeName = escapeHtml(submission.name);
    const safeEmail = escapeHtml(submission.email);
    const safePhone = submission.phone ? escapeHtml(submission.phone) : 'Niet opgegeven';
    const safeFunctie = escapeHtml(submission.functie);
    const safeCompany = escapeHtml(submission.company);
    const safeSector = escapeHtml(submission.sector);

    const results = submission.calculationResults;

    // PDF attachment URL
    const pdfUrl = `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}.supabase.co/storage/v1/object/public/documents/business-case-awareness-interventions.pdf`;

    // Confirmation email to lead
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jouw Business Case Calculator Resultaten - Innerleaps</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #ffffff;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 30px; text-align: left; border-bottom: 1px solid #e2e8f0;">
                    <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">
                      Jouw kostenbesparingsberekening voor ${safeCompany}
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
                      Bedankt voor het aanvragen van de calculator
                    </p>
                  </td>
                </tr>
                
                <!-- Bedrijfsgegevens samenvatting -->
                <tr>
                  <td style="padding: 30px; background-color: #f8fafc;">
                    <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                      Jouw organisatie
                    </h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>Aantal werknemers:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${submission.employees}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>Gemiddeld salaris:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${formatCurrency(submission.avgSalary)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>Verzuim:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${submission.currentAbsenteeism}%</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>Sector:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${safeSector}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Conservative Scenario -->
                <tr>
                  <td style="padding: 30px;">
                    <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin-bottom: 30px;">
                      <h2 style="margin: 0 0 5px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                        Conservative Scenario
                      </h2>
                      <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">
                        15% verzuimreductie met minimale effecten
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;">
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Verzuimbesparing:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${formatCurrency(results.scenarios.conservative.verzuimBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Uitvalreductie (70%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${formatCurrency(results.scenarios.conservative.uitvalReductie)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Productiviteitswinst (6%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${formatCurrency(results.scenarios.conservative.productiviteitBesparing)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 600;">Totale besparing:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; text-align: right;">${formatCurrency(results.scenarios.conservative.totaleBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Investering:</td>
                          <td style="padding: 5px 0; color: #dc2626; font-weight: 600; text-align: right;">-${formatCurrency(results.investment)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700; font-size: 16px;">Netto winst:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; font-size: 18px; text-align: right;">${formatCurrency(results.scenarios.conservative.netBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700;">ROI:</td>
                          <td style="padding: 5px 0; color: #2563eb; font-weight: 700; font-size: 16px; text-align: right;">${results.scenarios.conservative.roi}%</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Positive Scenario -->
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <div style="border-left: 4px solid #10b981; padding-left: 20px;">
                      <h2 style="margin: 0 0 5px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                        Positive Scenario
                      </h2>
                      <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">
                        21% verzuimreductie met volledige effecten
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;">
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Verzuimbesparing:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${formatCurrency(results.scenarios.positive.verzuimBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Uitvalreductie (70%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${formatCurrency(results.scenarios.positive.uitvalReductie)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Productiviteitswinst (6%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${formatCurrency(results.scenarios.positive.productiviteitBesparing)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 600;">Totale besparing:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; text-align: right;">${formatCurrency(results.scenarios.positive.totaleBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">Investering:</td>
                          <td style="padding: 5px 0; color: #dc2626; font-weight: 600; text-align: right;">-${formatCurrency(results.investment)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700; font-size: 16px;">Netto winst:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; font-size: 18px; text-align: right;">${formatCurrency(results.scenarios.positive.netBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700;">ROI:</td>
                          <td style="padding: 5px 0; color: #2563eb; font-weight: 700; font-size: 16px; text-align: right;">${results.scenarios.positive.roi}%</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Wetenschappelijke onderbouwing -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #eff6ff; border-top: 1px solid #bfdbfe;">
                    <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px; font-weight: 600;">
                      ✓ Wetenschappelijk bewezen effecten
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px;">
                      <li style="margin: 5px 0;">15-21% verzuimreductie (Oxford/UMass onderzoek)</li>
                      <li style="margin: 5px 0;">70% minder kans op uitval door langdurig verzuim</li>
                      <li style="margin: 5px 0;">6% productiviteitsverbetering per werknemer</li>
                    </ul>
                  </td>
                </tr>
                
                <!-- CTA -->
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f8fafc;">
                    <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                      Wil je deze winst realiseren?
                    </p>
                    <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0yOuKvF_kkyuN7VW0l2y8U0V0hxKHQVDPXVBELJ_VB3SDKMC9TVEjT5sK5m4AoEfN8Gc4MqmcY" 
                       style="display: inline-block; padding: 16px 32px; background-color: #FF6B35; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Kennismaken met Bas
                    </a>
                  </td>
                </tr>
                
                <!-- Contact Section -->
                <tr>
                  <td style="padding: 20px 30px; border-top: 1px solid #e2e8f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-right: 15px; vertical-align: top;">
                          <img src="https://7f1b052b-e2ee-419a-aec0-e4591c9e4afe.lovableproject.com/lovable-uploads/dea9200c-b881-4007-bd3b-c07db498ca17.png" 
                               alt="Bas Ter Haar Romenij" 
                               style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; display: block;">
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-weight: 600; color: #1e293b; font-size: 14px;">
                            Bas Ter Haar Romenij
                          </p>
                          <p style="margin: 2px 0; color: #64748b; font-size: 13px;">
                            Innerleaps
                          </p>
                          <p style="margin: 5px 0 0 0; font-size: 13px;">
                            <a href="mailto:bas@innerleaps.nl" style="color: #2563eb; text-decoration: none;">bas@innerleaps.nl</a>
                            <span style="color: #64748b;"> | </span>
                            <a href="tel:+31623453477" style="color: #2563eb; text-decoration: none;">06 23453477</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 15px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                    Innerleaps - ${new Date().getFullYear()}
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Admin notification email
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nieuwe Calculator Aanvraag</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #f8f9fa;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px;">
                
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px;">Nieuwe Calculator Aanvraag - ${safeCompany}</h2>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Contactgegevens:</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Naam:</strong> ${safeName}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>E-mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Telefoon:</strong> <a href="tel:${safePhone}">${safePhone}</a></td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Functie:</strong> ${safeFunctie}</td></tr>
                      <tr><td style="padding: 5px 0;"><strong>Bedrijf:</strong> ${safeCompany}</td></tr>
                    </table>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Bedrijfsgegevens:</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Aantal werknemers:</strong> ${submission.employees}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Gemiddeld salaris:</strong> ${formatCurrency(submission.avgSalary)}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Verzuimpercentage:</strong> ${submission.currentAbsenteeism}%</td></tr>
                      <tr><td style="padding: 5px 0;"><strong>Sector:</strong> ${safeSector}</td></tr>
                    </table>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Berekende Resultaten:</h3>
                    
                    <div style="background-color: #f8fafc; padding: 15px; margin-bottom: 15px; border-left: 4px solid #3b82f6;">
                      <h4 style="margin: 0 0 10px 0; color: #1e293b;">Conservative Scenario:</h4>
                      <p style="margin: 5px 0;"><strong>Netto winst:</strong> ${formatCurrency(results.scenarios.conservative.netBesparing)}</p>
                      <p style="margin: 5px 0;"><strong>ROI:</strong> ${results.scenarios.conservative.roi}%</p>
                    </div>
                    
                    <div style="background-color: #f0fdf4; padding: 15px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                      <h4 style="margin: 0 0 10px 0; color: #1e293b;">Positive Scenario:</h4>
                      <p style="margin: 5px 0;"><strong>Netto winst:</strong> ${formatCurrency(results.scenarios.positive.netBesparing)}</p>
                      <p style="margin: 5px 0;"><strong>ROI:</strong> ${results.scenarios.positive.roi}%</p>
                    </div>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Acties:</h3>
                    <p style="margin: 10px 0;">
                      <a href="mailto:${safeEmail}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; margin-right: 10px;">Email versturen</a>
                      <a href="tel:${safePhone}" style="display: inline-block; padding: 10px 20px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 6px;">Bellen</a>
                    </p>
                    
                    <p style="margin: 20px 0 0 0; font-size: 12px; color: #64748b;">
                      Ingediend op: ${new Date().toLocaleString('nl-NL')}
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send emails
    try {
      // Send confirmation email to lead with PDF attachment
      await resend.emails.send({
        from: "InnerLeaps <info@innerleaps.nl>",
        to: submission.email,
        subject: `Jouw kostenbesparingsberekening voor ${submission.company}`,
        html: confirmationEmailHtml,
        attachments: [
          {
            filename: "Business_Case_Awareness_Interventions.pdf",
            path: pdfUrl,
          }
        ]
      });

      // Send notification email to admin with PDF attachment
      await resend.emails.send({
        from: "InnerLeaps <info@innerleaps.nl>",
        to: "bas@innerleaps.nl",
        subject: `Nieuwe Calculator Aanvraag - ${submission.company}`,
        html: notificationEmailHtml,
        attachments: [
          {
            filename: "Business_Case_Awareness_Interventions.pdf",
            path: pdfUrl,
          }
        ]
      });

      console.log("Emails sent successfully");
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
      // Don't fail the request if emails fail
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Berekening succesvol verzonden"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error) {
    console.error("Error in calculator submission:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Er is een fout opgetreden. Probeer het later opnieuw." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
