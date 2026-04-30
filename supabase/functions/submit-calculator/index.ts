import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema for ROI Calculator
const SubmissionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().nullable(),
  company: z.string().trim().min(1).max(200),
  numberOfEmployees: z.number().int().positive().max(1000000),
  avgGrossAnnualSalary: z.number().positive().max(10000000),
  currentAbsenteeism: z.number().min(0).max(100),
  employeeTurnover: z.number().min(0).max(100),
  language: z.enum(["nl", "en"]).optional().default("nl"),
  results: z.object({
    totaleLoonkosten: z.number(),
    investment: z.number(),
    scenarios: z.object({
      conservative: z.object({
        verzuimBesparing: z.number(),
        retentieBesparing: z.number(),
        productiviteitBesparing: z.number(),
        totaleBesparing: z.number(),
        netBesparing: z.number(),
        roi: z.number(),
      }),
      positive: z.object({
        verzuimBesparing: z.number(),
        retentieBesparing: z.number(),
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
  company: string;
  numberOfEmployees: number;
  avgGrossAnnualSalary: number;
  currentAbsenteeism: number;
  employeeTurnover: number;
  language: "nl" | "en";
  results: any;
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

// Format currency helper (locale-aware)
function formatCurrency(amount: number, language: "nl" | "en" = "nl"): string {
  const locale = language === "en" ? "en-US" : "nl-NL";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Localized copy for the user-facing confirmation email
const EMAIL_COPY = {
  nl: {
    htmlLang: "nl",
    titleTag: "Jouw Business Case Calculator Resultaten - Innerleaps",
    headerTitle: (company: string) => `Besparing ${company} met Innerleaps`,
    headerSub: "Bedankt voor het aanvragen van de calculator",
    yourOrg: "Jouw organisatie",
    employees: "Aantal werknemers",
    avgSalary: "Gemiddeld salaris",
    absenteeism: "Verzuim",
    turnover: "Verloop",
    conservative: "Conservative Scenario",
    positive: "Positive Scenario",
    absenteeismSaving: "Verzuimbesparing",
    retentionSaving: "Personeelsverloopbesparing",
    productivityGain: "Productiviteitswinst",
    totalSaving: "Totale besparing",
    investment: "Investering",
    netProfit: "Netto winst",
    roi: "ROI",
    scientificTitle: "Wetenschappelijk bewezen effecten",
    scientificIntro:
      "In de bijlage vind je het wetenschappelijke bewijs voor de besparingen op verzuim, medewerkersverloop en de productiviteitswinst",
    bullet1: "Verzuimbesparing 15-21%",
    bullet2: "Productiviteitswinst 5-8%",
    bullet3: "Personeelsverloopbesparing 5-8%",
    ctaQuestion: "Wil je deze winst realiseren?",
    ctaButton: "Kennismaken met Bas",
    subject: (company: string) =>
      `Ontdek de besparing voor ${company} met de Innerleaps training`,
    pdfFilename: "Business_Case_Awareness_Interventions.pdf",
  },
  en: {
    htmlLang: "en",
    titleTag: "Your Business Case Calculator Results - Innerleaps",
    headerTitle: (company: string) => `Savings for ${company} with Innerleaps`,
    headerSub: "Thanks for requesting the calculator",
    yourOrg: "Your organisation",
    employees: "Number of employees",
    avgSalary: "Average salary",
    absenteeism: "Absenteeism",
    turnover: "Turnover",
    conservative: "Conservative scenario",
    positive: "Positive scenario",
    absenteeismSaving: "Absenteeism saving",
    retentionSaving: "Retention saving",
    productivityGain: "Productivity gain",
    totalSaving: "Total saving",
    investment: "Investment",
    netProfit: "Net profit",
    roi: "ROI",
    scientificTitle: "Scientifically proven effects",
    scientificIntro:
      "In the attachment you'll find the scientific evidence for the savings on absenteeism, employee turnover and the productivity gain",
    bullet1: "Absenteeism saving 15-21%",
    bullet2: "Productivity gain 5-8%",
    bullet3: "Retention saving 5-8%",
    ctaQuestion: "Want to realise these gains?",
    ctaButton: "Meet Bas",
    subject: (company: string) =>
      `Discover the savings for ${company} with the Innerleaps training`,
    pdfFilename: "Business_Case_Awareness_Interventions.pdf",
  },
} as const;

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

    // Store in database
    const { data, error: dbError } = await supabase
      .from("calculator_submissions")
      .insert({
        name: submission.name,
        email: submission.email,
        phone: submission.phone || null,
        company: submission.company,
        number_of_employees: submission.numberOfEmployees,
        avg_gross_annual_salary: submission.avgGrossAnnualSalary,
        current_absenteeism: submission.currentAbsenteeism,
        employee_turnover: submission.employeeTurnover,
        calculation_results: submission.results,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Er is een fout opgetreden bij het opslaan van uw gegevens. Probeer het later opnieuw.");
    }

    console.log("Successfully stored submission in database:", data);

    // Escape all user-controlled data
    const safeName = escapeHtml(submission.name);
    const safeEmail = escapeHtml(submission.email);
    const safePhone = submission.phone ? escapeHtml(submission.phone) : 'Niet opgegeven';
    const safeCompany = escapeHtml(submission.company);

    const results = submission.results;
    const lang = submission.language === "en" ? "en" : "nl";
    const copy = EMAIL_COPY[lang];
    const fmt = (n: number) => formatCurrency(n, lang);

    // PDF attachment URL - Supabase Storage
    const pdfUrl = "https://bvvzmprtuzdvvosaenbs.supabase.co/storage/v1/object/public/documents/business-case-awareness-interventions.pdf";

    // Bas profile image URL - Supabase Storage
    const basImageUrl = "https://bvvzmprtuzdvvosaenbs.supabase.co/storage/v1/object/public/images/bas-profile.png";

    // Calendar redirect URL - innerleaps.nl domain
    const calendarUrl = "https://innerleaps.nl/calendar";

    // Confirmation email to lead (localized)
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html lang="${copy.htmlLang}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${copy.titleTag}</title>
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
                      ${copy.headerTitle(safeCompany)}
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
                      ${copy.headerSub}
                    </p>
                  </td>
                </tr>

                <!-- Organization summary -->
                <tr>
                  <td style="padding: 30px; background-color: #f8fafc;">
                    <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                      ${copy.yourOrg}
                    </h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>${copy.employees}:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${submission.numberOfEmployees}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>${copy.avgSalary}:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${fmt(submission.avgGrossAnnualSalary)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>${copy.absenteeism}:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${submission.currentAbsenteeism}%</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; font-size: 14px;"><strong>${copy.turnover}:</strong></td>
                        <td style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${submission.employeeTurnover}%</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Conservative Scenario -->
                <tr>
                  <td style="padding: 30px;">
                    <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin-bottom: 30px;">
                      <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                        ${copy.conservative}
                      </h2>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;">
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.absenteeismSaving} (15%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${fmt(results.scenarios.conservative.verzuimBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.retentionSaving} (5%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${fmt(results.scenarios.conservative.retentieBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.productivityGain} (5%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${fmt(results.scenarios.conservative.productiviteitBesparing)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 600;">${copy.totalSaving}:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; text-align: right;">${fmt(results.scenarios.conservative.totaleBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.investment}:</td>
                          <td style="padding: 5px 0; color: #dc2626; font-weight: 600; text-align: right;">-${fmt(results.investment)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700; font-size: 16px;">${copy.netProfit}:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; font-size: 18px; text-align: right;">${fmt(results.scenarios.conservative.netBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700;">${copy.roi}:</td>
                          <td style="padding: 5px 0; color: #2563eb; font-weight: 700; font-size: 16px; text-align: right;">${Math.round(results.scenarios.conservative.roi)}%</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Positive Scenario -->
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <div style="border-left: 4px solid #10b981; padding-left: 20px;">
                      <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                        ${copy.positive}
                      </h2>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;">
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.absenteeismSaving} (21%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${fmt(results.scenarios.positive.verzuimBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.retentionSaving} (8%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${fmt(results.scenarios.positive.retentieBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.productivityGain} (8%):</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 600; text-align: right;">${fmt(results.scenarios.positive.productiviteitBesparing)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 600;">${copy.totalSaving}:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; text-align: right;">${fmt(results.scenarios.positive.totaleBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #64748b;">${copy.investment}:</td>
                          <td style="padding: 5px 0; color: #dc2626; font-weight: 600; text-align: right;">-${fmt(results.investment)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px 0; border-top: 1px solid #e5e7eb;"></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700; font-size: 16px;">${copy.netProfit}:</td>
                          <td style="padding: 5px 0; color: #059669; font-weight: 700; font-size: 18px; text-align: right;">${fmt(results.scenarios.positive.netBesparing)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; color: #1e293b; font-weight: 700;">${copy.roi}:</td>
                          <td style="padding: 5px 0; color: #2563eb; font-weight: 700; font-size: 16px; text-align: right;">${Math.round(results.scenarios.positive.roi)}%</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Scientific basis -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #eff6ff; border-top: 1px solid #bfdbfe;">
                    <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px; font-weight: 600;">
                      ${copy.scientificTitle}
                    </h3>
                    <p style="margin: 0 0 15px 0; color: #1e40af; font-size: 14px; line-height: 1.5;">
                      ${copy.scientificIntro}
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; list-style: none;">
                      <li style="margin: 5px 0;">✓ ${copy.bullet1}</li>
                      <li style="margin: 5px 0;">✓ ${copy.bullet2}</li>
                      <li style="margin: 5px 0;">✓ ${copy.bullet3}</li>
                    </ul>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f8fafc;">
                    <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                      ${copy.ctaQuestion}
                    </p>
                    <a href="${calendarUrl}"
                       style="display: inline-block; padding: 16px 32px; background-color: #FF6B35; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      ${copy.ctaButton}
                    </a>
                  </td>
                </tr>

                <!-- Contact Section -->
                <tr>
                  <td style="padding: 20px 30px; border-top: 1px solid #e2e8f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-right: 15px; vertical-align: top;">
                          <img src="${basImageUrl}"
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
                            <a href="tel:+31623453477" style="color: #2563eb; text-decoration: none;">+31 6 23453477</a>
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
                      <tr><td style="padding: 5px 0;"><strong>Bedrijf:</strong> ${safeCompany}</td></tr>
                    </table>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Bedrijfsgegevens:</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Aantal werknemers:</strong> ${submission.numberOfEmployees}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Gemiddeld salaris:</strong> ${formatCurrency(submission.avgGrossAnnualSalary)}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Verzuimpercentage:</strong> ${submission.currentAbsenteeism}%</td></tr>
                      <tr><td style="padding: 5px 0;"><strong>Verlooppercentage:</strong> ${submission.employeeTurnover}%</td></tr>
                    </table>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Berekende Resultaten:</h3>
                    
                    <div style="background-color: #f8fafc; padding: 15px; margin-bottom: 15px; border-left: 4px solid #3b82f6;">
                      <h4 style="margin: 0 0 10px 0; color: #1e293b;">Conservative Scenario:</h4>
                      <p style="margin: 5px 0;"><strong>Netto winst:</strong> ${formatCurrency(results.scenarios.conservative.netBesparing)}</p>
                      <p style="margin: 5px 0;"><strong>ROI:</strong> ${Math.round(results.scenarios.conservative.roi)}%</p>
                    </div>
                    
                    <div style="background-color: #f0fdf4; padding: 15px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                      <h4 style="margin: 0 0 10px 0; color: #1e293b;">Positive Scenario:</h4>
                      <p style="margin: 5px 0;"><strong>Netto winst:</strong> ${formatCurrency(results.scenarios.positive.netBesparing)}</p>
                      <p style="margin: 5px 0;"><strong>ROI:</strong> ${Math.round(results.scenarios.positive.roi)}%</p>
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
        subject: copy.subject(submission.company),
        html: confirmationEmailHtml,
        attachments: [
          {
            filename: copy.pdfFilename,
            path: pdfUrl,
          }
        ]
      });

      // Send notification email to admin (no PDF attachment)
      await resend.emails.send({
        from: "InnerLeaps <info@innerleaps.nl>",
        to: "bas@innerleaps.nl",
        subject: `Nieuwe Calculator Aanvraag - ${submission.company}`,
        html: notificationEmailHtml,
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
