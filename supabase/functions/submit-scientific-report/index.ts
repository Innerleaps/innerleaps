import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SubmissionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().nullable(),
  company: z.string().trim().min(1).max(200),
  functie: z.string().trim().min(1).max(100),
});

interface ScientificReportRequest {
  name: string;
  email: string;
  phone?: string | null;
  company: string;
  functie: string;
}

// Rate limiting: 1 request per 5 minutes per email
const rateLimitStore = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

function checkRateLimit(email: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = email.toLowerCase();
  const lastRequest = rateLimitStore.get(key);

  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    const retryAfter = Math.ceil((lastRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  rateLimitStore.set(key, now);
  return { allowed: true };
}

// Clean up old entries
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}, 2 * 60 * 1000);

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const rawData = await req.json();
    
    let submission: ScientificReportRequest;
    try {
      submission = SubmissionSchema.parse(rawData);
    } catch (validationError) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Ongeldige gegevens. Controleer je invoer en probeer opnieuw." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const rateLimitCheck = checkRateLimit(submission.email);
    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for email: ${submission.email}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Je hebt dit rapport al recent aangevraagd. Probeer het over ${rateLimitCheck.retryAfter} seconden opnieuw.`,
          retryAfter: rateLimitCheck.retryAfter
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": rateLimitCheck.retryAfter?.toString() || "300",
            ...corsHeaders 
          },
        }
      );
    }

    console.log("Processing scientific report request:", {
      email: submission.email,
      company: submission.company
    });

    const { error: dbError } = await supabase
      .from("scientific_report_requests")
      .insert({
        name: submission.name,
        email: submission.email,
        phone: submission.phone || null,
        company: submission.company,
        functie: submission.functie,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Successfully stored request in database");

    const safeName = escapeHtml(submission.name);
    const safeEmail = escapeHtml(submission.email);
    const safePhone = submission.phone ? escapeHtml(submission.phone) : 'Niet opgegeven';
    const safeCompany = escapeHtml(submission.company);
    const safeFunctie = escapeHtml(submission.functie);

    const pdfUrl = `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}.supabase.co/storage/v1/object/public/documents/business-case-awareness-interventions.pdf`;

    // Email to user with PDF attachment
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jouw Wetenschappelijk Rapport - InnerLeaps</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #ffffff;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                
                <tr>
                  <td style="padding: 30px; text-align: left; border-bottom: 1px solid #e2e8f0;">
              <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">
                Wetenschappelijk rapport over Aandachttraining
              </h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
                      Bedankt voor je interesse, ${safeName}!
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 30px;">
                    <p style="margin: 0 0 15px 0; color: #1e293b; font-size: 16px;">
                      In de bijlage vind je het uitgebreide wetenschappelijke rapport:
                    </p>
                    
                    <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
                      <h2 style="margin: 0 0 10px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                        The Business Case for Awareness Interventions
                      </h2>
                      <p style="margin: 0; color: #64748b; font-size: 14px;">
                        Een analyse van 40 jaar wetenschappelijk onderzoek
                      </p>
                    </div>
                    
                    <h3 style="margin: 25px 0 15px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                      Wat je vindt in dit rapport:
                    </h3>
                    <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #1e293b; font-size: 14px;">
                      <li style="margin-bottom: 8px;">📊 <strong>Effectgroottes</strong> van aandachttraining op verzuim, productiviteit en retentie</li>
                      <li style="margin-bottom: 8px;">🧠 <strong>Pathway-analyses</strong> die laten zien hoe aandachttraining werkt</li>
                      <li style="margin-bottom: 8px;">💰 <strong>ROI berekeningen</strong> gebaseerd op wetenschappelijk onderzoek</li>
                      <li style="margin-bottom: 8px;">📚 <strong>Referenties</strong> naar alle belangrijke studies en bronnen</li>
                      <li style="margin-bottom: 8px;">🏛️ <strong>Academische onderbouwing</strong> van Oxford en University of Massachusetts</li>
                    </ul>
                    
                    <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0;">
                      <p style="margin: 0 0 15px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                        Wil je bespreken wat dit voor ${safeCompany} betekent?
                      </p>
                      <p style="margin: 0 0 20px 0; color: #64748b; font-size: 14px;">
                        Plan een vrijblijvend kennismakingsgesprek met Bas ter Haar Romenij
                      </p>
                       <a href="https://innerleaps.nl/Calendar" 
                          style="display: inline-block; background-color: #FF6B35; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                         Plan een gesprek
                       </a>
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 20px 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">
                      Met vriendelijke groet,<br>
                      <strong style="color: #1e293b;">Bas ter Haar Romenij</strong><br>
                      InnerLeaps<br>
                      <a href="https://innerleaps.nl" style="color: #3b82f6; text-decoration: none;">www.innerleaps.nl</a>
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

    // Admin notification email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <title>Nieuwe Wetenschappelijk Rapport Aanvraag</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; background-color: #f8fafc;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                
                <tr>
                  <td style="padding: 30px; background-color: #1e293b;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px;">
                      📄 Nieuwe Rapport Aanvraag
                    </h1>
                    <p style="margin: 5px 0 0 0; color: #cbd5e1; font-size: 14px;">
                      ${safeCompany}
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px;">
                      Lead Informatie
                    </h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Naam:</strong></td>
                        <td style="padding: 8px 0; color: #1e293b;">${safeName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                        <td style="padding: 8px 0; color: #1e293b;">
                          <a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b;"><strong>Telefoon:</strong></td>
                        <td style="padding: 8px 0; color: #1e293b;">
                          <a href="tel:${safePhone}" style="color: #3b82f6; text-decoration: none;">${safePhone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b;"><strong>Bedrijf:</strong></td>
                        <td style="padding: 8px 0; color: #1e293b;">${safeCompany}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b;"><strong>Functie:</strong></td>
                        <td style="padding: 8px 0; color: #1e293b;">${safeFunctie}</td>
                      </tr>
                    </table>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                      <a href="mailto:${safeEmail}" 
                         style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; margin-right: 10px; font-weight: 600;">
                        📧 Email Lead
                      </a>
                      <a href="tel:${safePhone}" 
                         style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 600;">
                        📞 Bel Lead
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      // Send user email with PDF attachment
      const { error: userEmailError } = await resend.emails.send({
        from: "InnerLeaps <info@innerleaps.nl>",
        to: [submission.email],
        subject: "Rapport: Ontdek de effectiviteit van onze methode",
        html: userEmailHtml,
        attachments: [
          {
            filename: "Business_Case_Awareness_Interventions.pdf",
            path: pdfUrl,
          }
        ]
      });

      if (userEmailError) {
        console.error("Error sending user email:", userEmailError);
        throw userEmailError;
      }

      console.log("User confirmation email sent successfully");

      // Send admin notification
      const { error: adminEmailError } = await resend.emails.send({
        from: "InnerLeaps <info@innerleaps.nl>",
        to: ["bas@innerleaps.nl"],
        subject: `Nieuwe Rapport Aanvraag - ${submission.company}`,
        html: adminEmailHtml,
      });

      if (adminEmailError) {
        console.error("Error sending admin email:", adminEmailError);
      } else {
        console.log("Admin notification email sent successfully");
      }

    } catch (emailError: any) {
      console.error("Email sending error:", emailError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Er is een probleem opgetreden bij het versturen van de email. Probeer het later opnieuw." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Rapport succesvol aangevraagd! Je ontvangt het binnen enkele minuten per email."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in submit-scientific-report function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "Er is een onverwachte fout opgetreden. Probeer het later opnieuw." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
