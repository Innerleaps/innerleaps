import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

/**
 * De rekentool: bewaart de aanvraag, mailt de bezoeker zijn omslagpunt en
 * meldt de lead aan Bas.
 *
 * Sinds 29 oktober 2026 een omslagpunt-tool (keuze van Bas). De vorige versie
 * mailde twee scenario's met een besparing en een ROI, gebouwd op 15 tot 21%
 * minder verzuim, plus de oude business-case-PDF. Dat cijfer was een eigen
 * rekensom en is op rood gezet. Zie CLAIMS.md in de repo.
 *
 * Let op bij uitrollen: de site stuurt sinds die datum het nieuwe formaat
 * (numberOfParticipants en het omslagpunt). De oude functie weigert dat, en
 * dan gaat er geen mail uit, ook niet naar Bas. Rol deze functie dus uit
 * vóórdat de site live gaat.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SubmissionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().nullable(),
  company: z.string().trim().min(1).max(200),
  numberOfParticipants: z.number().int().positive().max(1000000),
  avgGrossAnnualSalary: z.number().positive().max(10000000),
  language: z.enum(["nl", "en"]).optional().default("nl"),
  results: z.object({
    aantalDeelnemers: z.number(),
    prijsPerDeelnemer: z.number(),
    investering: z.number(),
    loonsom: z.number(),
    omslagpuntProcent: z.number(),
    omslagpuntDagen: z.number(),
  }),
});

type CalculatorSubmission = z.infer<typeof SubmissionSchema>;

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

function formatCurrency(amount: number, language: "nl" | "en" = "nl"): string {
  return new Intl.NumberFormat(language === "en" ? "en-GB" : "nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(value: number, decimals: number, language: "nl" | "en" = "nl"): string {
  return new Intl.NumberFormat(language === "en" ? "en-GB" : "nl-NL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: decimals,
  }).format(value);
}

// Gemeten bij TheyDo: claim "theydo-productiviteit" in src/content/claims.json.
// Dit bestand kan het register niet inlezen (de functie wordt los uitgerold),
// dus verandert het cijfer daar, verander het dan ook hier en in de teksten.
const THEYDO_PRODUCTIVITEIT = 8.6;

// Hoe vaak het gemeten cijfer in het omslagpunt past, naar beneden afgerond
// zodat "ruim" altijd klopt. Zelfde som als RoiResultaat.tsx op de site.
const veelvoud = (omslagpuntProcent: number) =>
  omslagpuntProcent > 0 ? Math.ceil(THEYDO_PRODUCTIVITEIT / omslagpuntProcent) - 1 : 0;

// De teksten van de mail aan de bezoeker, gelijk aan de bedanktpagina
// (calculator.json, results). Geen beloofde besparing, geen ROI: het omslagpunt,
// één gemeten cijfer met bron, en het veelvoud als voorwaarde.
const EMAIL_COPY = {
  nl: {
    htmlLang: "nl",
    titleTag: "Jouw omslagpunt - Innerleaps",
    headerTitle: (company: string) => `Het omslagpunt voor ${company}`,
    headerSub: "Bedankt voor het gebruiken van de rekentool.",
    yourInput: "Jullie invoer",
    participants: "Aantal deelnemers",
    avgSalary: "Gemiddeld salaris",
    investment: "Investering",
    breakEvenTitle: "Vanaf deze productiviteitstoename is de training een slimme investering",
    breakEvenDays: (dagen: string) => `Of als elke deelnemer ${dagen} ziektedagen per jaar minder heeft (alleen het doorbetaalde salaris gerekend).`,
    multiple: (keer: number) => `ruim ${keer}x`,
    compare: (keer: number) =>
      `Bij TheyDo rapporteerden deelnemers 8,6%. Merkt jullie team hetzelfde, dan is dat ruim ${keer} keer jullie omslagpunt.`,
    barYours: "Jullie omslagpunt",
    barTheydo: "Gemeten bij TheyDo",
    theydoBreakEven: "Bij TheyDo zelf lag het omslagpunt op 0,36%. Gemeten werd 8,6%: ruim 23 keer zoveel.",
    footnote: "Bron: zelfgerapporteerd, n=14, deelnemers bij TheyDo, 4 weken na de training (voorjaar 2026).",
    disclaimer: "Dit is een rekenvoorbeeld, geen belofte. Resultaten verschillen per organisatie.",
    methodLink: "Zo meten we, en dit zijn de beperkingen",
    methodUrl: "https://innerleaps.nl/methode",
    ctaQuestion: "Wil je weten wat dit voor jullie betekent?",
    ctaButton: "Plan 20 minuten met Bas",
    contactUrl: "https://innerleaps.nl/contact",
    subject: (company: string) => `Het omslagpunt voor ${company}`,
  },
  en: {
    htmlLang: "en",
    titleTag: "Your break-even point - Innerleaps",
    headerTitle: (company: string) => `The break-even point for ${company}`,
    headerSub: "Thanks for using the calculator.",
    yourInput: "Your input",
    participants: "Number of participants",
    avgSalary: "Average salary",
    investment: "Investment",
    breakEvenTitle: "From this productivity gain, the training is a smart investment",
    breakEvenDays: (dagen: string) => `Or if each participant has ${dagen} fewer sick days a year (counting only the salary paid during absence).`,
    multiple: (keer: number) => `over ${keer}x`,
    compare: (keer: number) =>
      `At TheyDo, participants reported 8.6%. If your team sees the same, that's more than ${keer} times your break-even point.`,
    barYours: "Your break-even point",
    barTheydo: "Measured at TheyDo",
    theydoBreakEven: "At TheyDo itself, the break-even point was 0.36%. The measured gain was 8.6%: more than 23 times as much.",
    footnote: "Source: self-reported, n=14, participants at TheyDo, 4 weeks after the training (spring 2026).",
    disclaimer: "This is an example calculation, not a promise. Results differ per organisation.",
    methodLink: "How we measure, and the limitations",
    methodUrl: "https://innerleaps.nl/en/methodology",
    ctaQuestion: "Want to know what this means for you?",
    ctaButton: "Book 20 minutes with Bas",
    contactUrl: "https://innerleaps.nl/en/contact",
    subject: (company: string) => `The break-even point for ${company}`,
  },
} as const;

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

    let submission: CalculatorSubmission;
    try {
      submission = SubmissionSchema.parse(rawData);
    } catch (validationError) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid input data. Please check your submission and try again.",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const rateLimitCheck = checkRateLimit(submission.email);
    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for email: ${submission.email}`);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Te veel aanvragen. Probeer het over ${rateLimitCheck.retryAfter} seconden opnieuw.`,
          retryAfter: rateLimitCheck.retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": rateLimitCheck.retryAfter?.toString() || "3600",
            ...corsHeaders,
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
          error: "U heeft recent al een berekening aangevraagd. Controleer uw e-mail of probeer het later opnieuw.",
        }),
        { status: 409, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Zelfde tabel als voorheen. current_absenteeism is verplicht in de tabel,
    // maar de rekentool vraagt geen verzuim meer: daarom 0.
    const { error: dbError } = await supabase.from("calculator_submissions").insert({
      name: submission.name,
      email: submission.email,
      phone: submission.phone || null,
      company: submission.company,
      number_of_employees: submission.numberOfParticipants,
      avg_gross_annual_salary: submission.avgGrossAnnualSalary,
      current_absenteeism: 0,
      employee_turnover: null,
      calculation_results: { soort: "omslagpunt", ...submission.results },
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Er is een fout opgetreden bij het opslaan van uw gegevens. Probeer het later opnieuw.");
    }

    const safeName = escapeHtml(submission.name);
    const safeEmail = escapeHtml(submission.email);
    const safePhone = submission.phone ? escapeHtml(submission.phone) : "Niet opgegeven";
    const safeCompany = escapeHtml(submission.company);

    const lang = submission.language === "en" ? "en" : "nl";
    const copy = EMAIL_COPY[lang];
    const r = submission.results;
    const procent = `${formatNumber(r.omslagpuntProcent, 2, lang)}%`;
    const dagen = formatNumber(r.omslagpuntDagen, 1, lang);
    const keer = veelvoud(r.omslagpuntProcent);
    const grootste = Math.max(r.omslagpuntProcent, THEYDO_PRODUCTIVITEIT);

    // Een balk als tabel, want dat is wat Outlook en Gmail allebei goed tonen.
    // Nooit smaller dan een stipje, anders lijkt het omslagpunt nul.
    const balk = (label: string, waarde: string, aandeel: number, kleur: string) => {
      const breedte = Math.max(Math.round(aandeel * 100), 2);
      return `
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 14px 0;">
                      <tr>
                        <td style="color: #334155; font-size: 15px; padding: 0 0 6px 0;">${label}</td>
                        <td align="right" style="color: #2a1250; font-size: 15px; font-weight: 700; padding: 0 0 6px 0;">${waarde}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f1f5f9;">
                            <tr>
                              <td width="${breedte}%" style="background-color: ${kleur}; height: 14px; font-size: 0; line-height: 0;">&nbsp;</td>
                              ${breedte < 100 ? '<td style="font-size: 0; line-height: 0;">&nbsp;</td>' : ""}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>`;
    };

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
                <tr>
                  <td style="padding: 30px; border-bottom: 1px solid #e2e8f0;">
                    <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">${copy.headerTitle(safeCompany)}</h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">${copy.headerSub}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 30px;">
                    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">${copy.yourInput}</p>
                    <p style="margin: 0; color: #1e293b; font-size: 14px;">
                      ${copy.participants}: <strong>${r.aantalDeelnemers}</strong><br>
                      ${copy.avgSalary}: <strong>${formatCurrency(submission.avgGrossAnnualSalary, lang)}</strong><br>
                      ${copy.investment}: <strong>${formatCurrency(r.investering, lang)}</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 24px 30px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 2px solid #f26b3a;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 700; line-height: 1.35;">${copy.breakEvenTitle}</p>
                          <p style="margin: 10px 0 0 0; color: #2a1250; font-size: 48px; font-weight: 700; line-height: 1.1;">${procent}</p>
                          <p style="margin: 12px 0 0 0; color: #334155; font-size: 15px;">${copy.breakEvenDays(dagen)}</p>
                          <div style="border-top: 1px solid #e2e8f0; margin: 24px 0;"></div>
                          ${keer >= 2 ? `
                          <p style="margin: 0; color: #f26b3a; font-size: 48px; font-weight: 700; line-height: 1.1;">${copy.multiple(keer)}</p>
                          <p style="margin: 12px 0 24px 0; color: #1e293b; font-size: 17px; line-height: 1.5;">${copy.compare(keer)}</p>` : ""}
                          ${balk(copy.barYours, procent, r.omslagpuntProcent / grootste, "#94a3b8")}
                          ${balk(copy.barTheydo, `${formatNumber(THEYDO_PRODUCTIVITEIT, 1, lang)}%`, THEYDO_PRODUCTIVITEIT / grootste, "#f26b3a")}
                          <p style="margin: 10px 0 0 0; color: #475569; font-size: 15px; line-height: 1.5;">${copy.theydoBreakEven}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 24px 30px;">
                    <p style="margin: 0; color: #64748b; font-size: 13px;">${copy.footnote}</p>
                    <p style="margin: 8px 0 0 0; color: #64748b; font-size: 13px;">${copy.disclaimer}
                      <a href="${copy.methodUrl}" style="color: #2563eb;">${copy.methodLink}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <p style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">${copy.ctaQuestion}</p>
                    <a href="${copy.contactUrl}" style="display: inline-block; padding: 12px 24px; background-color: #f97316; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">${copy.ctaButton}</a>
                  </td>
                </tr>
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

    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head><meta charset="UTF-8"><title>Nieuwe rekentool-aanvraag</title></head>
      <body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333;">
        <h2 style="margin: 0 0 16px 0; color: #1e293b;">Nieuwe rekentool-aanvraag - ${safeCompany}</h2>
        <p style="margin: 0 0 16px 0;">
          <strong>Naam:</strong> ${safeName}<br>
          <strong>E-mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a><br>
          <strong>Telefoon:</strong> ${safePhone}<br>
          <strong>Organisatie:</strong> ${safeCompany}<br>
          <strong>Taal:</strong> ${lang}
        </p>
        <p style="margin: 0 0 16px 0;">
          <strong>Deelnemers:</strong> ${r.aantalDeelnemers}<br>
          <strong>Gemiddeld salaris:</strong> ${formatCurrency(submission.avgGrossAnnualSalary)}<br>
          <strong>Investering:</strong> ${formatCurrency(r.investering)}<br>
          <strong>Omslagpunt:</strong> ${formatNumber(r.omslagpuntProcent, 2)}% productiviteit, of ${formatNumber(r.omslagpuntDagen, 1)} ziektedagen per deelnemer per jaar
        </p>
        <a href="mailto:${safeEmail}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px;">Mail terug</a>
      </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: "InnerLeaps <info@innerleaps.nl>",
        to: submission.email,
        subject: copy.subject(submission.company),
        html: confirmationEmailHtml,
      });

      await resend.emails.send({
        from: "InnerLeaps <info@innerleaps.nl>",
        to: "bas@innerleaps.nl",
        subject: `Nieuwe rekentool-aanvraag - ${submission.company}`,
        html: notificationEmailHtml,
      });

      console.log("Emails sent successfully");
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
      // Don't fail the request if emails fail
    }

    return new Response(JSON.stringify({ success: true, message: "Berekening succesvol verzonden" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in calculator submission:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Er is een fout opgetreden. Probeer het later opnieuw." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
