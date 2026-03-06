import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (text: string): string => {
  return text.replace(/[&<>"']/g, (char) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escapeMap[char] || char;
  });
};

const roiAnalysisSchema = z.object({
  naam: z.string(),
  email: z.string().email(),
  bedrijfsnaam: z.string(),
  verzuimPercentage: z.string().optional(),
  verloopPercentage: z.string().optional(),
  aantalDeelnemers: z.string().regex(/^\d+$/).max(7),
  brutoJaarsalaris: z.string(),
  calculationResults: z.object({
    totaleLoonkosten: z.number(),
    numberOfGroups: z.number(),
    investment: z.number(),
    scenarios: z.object({
      scenario1: z.object({
        name: z.string(),
        description: z.string(),
        verzuimBesparing: z.number(),
        retentieBesparing: z.number(),
        productiviteitBesparing: z.number(),
        totaleBesparing: z.number(),
        netBesparing: z.number(),
        roi: z.number(),
      }),
      scenario2: z.object({
        name: z.string(),
        description: z.string(),
        verzuimBesparing: z.number(),
        retentieBesparing: z.number(),
        productiviteitBesparing: z.number(),
        totaleBesparing: z.number(),
        netBesparing: z.number(),
        roi: z.number(),
      }),
      scenario3: z.object({
        name: z.string(),
        description: z.string(),
        verzuimBesparing: z.number(),
        retentieBesparing: z.number(),
        productiviteitBesparing: z.number(),
        totaleBesparing: z.number(),
        netBesparing: z.number(),
        roi: z.number(),
      }),
    }),
    constants: z.object({
      VK: z.number(),
      VKP: z.number(),
    })
  })
});

type ROIAnalysisRequest = z.infer<typeof roiAnalysisSchema>;

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatPercentage = (percentage: number): string => {
  return `${Math.round(percentage)}%`;
};

const generateEmailHTML = (data: ROIAnalysisRequest): string => {
  const { naam, bedrijfsnaam, calculationResults } = data;
  const { scenarios, investment, numberOfGroups } = calculationResults;
  
  const safeNaam = escapeHtml(naam);
  const safeBedrijfsnaam = escapeHtml(bedrijfsnaam);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ROI-Analyse InnerLeaps</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="max-width: 900px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #4b5563 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">ROI van Innerleaps voor ${safeBedrijfsnaam}</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px;">Beste ${safeNaam},</p>
              <p style="margin: 0 0 30px 0; font-size: 16px;">Hieronder vind je drie scenario's voor ${safeBedrijfsnaam} met ${data.aantalDeelnemers} deelnemers (${numberOfGroups} groep${numberOfGroups !== 1 ? 'en' : ''}).</p>

              <!-- Three Scenarios Side by Side -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 40px 0;">
                <tr>
                  <!-- Scenario 1 -->
                  <td style="width: 32%; padding: 20px; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; vertical-align: top;">
                    <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #1f2937;">${escapeHtml(scenarios.scenario1.name)}</h3>
                    <p style="margin: 0 0 15px 0; font-size: 13px; color: #6b7280; line-height: 1.5;">${escapeHtml(scenarios.scenario1.description)}</p>
                    <table role="presentation" style="width: 100%; font-size: 14px;">
                      <tr><td style="padding: 4px 0; color: #4b5563;">Verzuimbesparing</td></tr>
                      <tr><td style="padding: 4px 0; font-weight: 700; color: #1f2937;">${formatCurrency(scenarios.scenario1.verzuimBesparing)}</td></tr>
                      <tr><td style="padding: 10px 0 4px 0; color: #4b5563;">Netto besparing</td></tr>
                      <tr><td style="padding: 4px 0; font-weight: 700; color: #1f2937;">${formatCurrency(scenarios.scenario1.netBesparing)}</td></tr>
                      <tr><td style="padding: 10px 0 4px 0; color: #4b5563;">ROI</td></tr>
                      <tr><td style="padding: 4px 0; font-weight: 700; font-size: 18px; color: #ea580c;">${formatPercentage(scenarios.scenario1.roi)}</td></tr>
                    </table>
                  </td>

                  <!-- Spacer -->
                  <td style="width: 2%;"></td>

                  <!-- Scenario 2 -->
                  <td style="width: 32%; padding: 20px; background-color: #fff5f0; border: 2px solid #ea580c; border-radius: 8px; vertical-align: top;">
                    <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #1f2937;">${escapeHtml(scenarios.scenario2.name)}</h3>
                    <p style="margin: 0 0 15px 0; font-size: 13px; color: #6b7280; line-height: 1.5;">${escapeHtml(scenarios.scenario2.description)}</p>
                    <table role="presentation" style="width: 100%; font-size: 14px;">
                      <tr><td style="padding: 4px 0; color: #4b5563;">Verzuimbesparing</td></tr>
                      <tr><td style="padding: 4px 0; color: #1f2937;">${formatCurrency(scenarios.scenario2.verzuimBesparing)}</td></tr>
                      <tr><td style="padding: 4px 0; color: #4b5563;">Retentiebesparing</td></tr>
                      <tr><td style="padding: 4px 0; color: #1f2937;">${formatCurrency(scenarios.scenario2.retentieBesparing)}</td></tr>
                      <tr><td style="padding: 4px 0; color: #4b5563;">Productiviteit</td></tr>
                      <tr><td style="padding: 4px 0; color: #1f2937;">${formatCurrency(scenarios.scenario2.productiviteitBesparing)}</td></tr>
                      <tr><td style="padding: 10px 0 4px 0; color: #4b5563;">Netto besparing</td></tr>
                      <tr><td style="padding: 4px 0; font-weight: 700; color: #1f2937;">${formatCurrency(scenarios.scenario2.netBesparing)}</td></tr>
                      <tr><td style="padding: 10px 0 4px 0; color: #4b5563;">ROI</td></tr>
                      <tr><td style="padding: 4px 0; font-weight: 700; font-size: 18px; color: #ea580c;">${formatPercentage(scenarios.scenario2.roi)}</td></tr>
                    </table>
                  </td>

                  <!-- Spacer -->
                  <td style="width: 2%;"></td>

                  <!-- Scenario 3 -->
                  <td style="width: 32%; padding: 20px; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; vertical-align: top;">
                    <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #1f2937;">${escapeHtml(scenarios.scenario3.name)}</h3>
                    <p style="margin: 0 0 15px 0; font-size: 13px; color: #6b7280; line-height: 1.5;">${escapeHtml(scenarios.scenario3.description)}</p>
                    <table role="presentation" style="width: 100%; font-size: 14px;">
                      <tr><td style="padding: 4px 0; color: #4b5563;">Verzuimbesparing</td></tr>
                      <tr><td style="padding: 4px 0; color: #1f2937;">${formatCurrency(scenarios.scenario3.verzuimBesparing)}</td></tr>
                      <tr><td style="padding: 4px 0; color: #4b5563;">Retentiebesparing</td></tr>
                      <tr><td style="padding: 4px 0; color: #1f2937;">${formatCurrency(scenarios.scenario3.retentieBesparing)}</td></tr>
                      <tr><td style="padding: 4px 0; color: #4b5563;">Productiviteit</td></tr>
                      <tr><td style="padding: 4px 0; color: #1f2937;">${formatCurrency(scenarios.scenario3.productiviteitBesparing)}</td></tr>
                      <tr><td style="padding: 10px 0 4px 0; color: #4b5563;">Netto besparing</td></tr>
                      <tr><td style="padding: 4px 0; font-weight: 700; color: #1f2937;">${formatCurrency(scenarios.scenario3.netBesparing)}</td></tr>
                      <tr><td style="padding: 10px 0 4px 0; color: #4b5563;">ROI</td></tr>
                      <tr><td style="padding: 4px 0; font-weight: 700; font-size: 18px; color: #ea580c;">${formatPercentage(scenarios.scenario3.roi)}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 0 0 40px 0;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #4b5563;">Wil je kijken hoe ${safeBedrijfsnaam} deze resultaten kan behalen?</p>
                    <a href="https://calendar.app.google/BgGy8cVUSk4w5Zzg8" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Maak vrijblijvend kennis met Bas</a>
                  </td>
                </tr>
              </table>

              <!-- Scientific Sources -->
              <div style="background-color: #f9fafb; padding: 25px; border-radius: 8px; margin: 0 0 30px 0;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #1f2937;">Wetenschappelijke Bronnen</h3>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4b5563; line-height: 1.8;">
                  <li><strong>Verzuimkosten (${calculationResults.constants.VK}x):</strong> Sazas (2024)</li>
                  <li><strong>Verzuimreductie (15-21%):</strong> Virgili (2015) - Meta-analyse 19 studies</li>
                  <li><strong>Vervangingskosten (${calculationResults.constants.VKP}x):</strong> O'Connell & Kung (2007)</li>
                  <li><strong>Retentie & Productiviteit (5-8%):</strong> Khoury et al. (2015), Good et al. (2016)</li>
                </ul>
              </div>

              <!-- Signature -->
              <p style="margin: 0; font-size: 16px;">Met vriendelijke groet,<br><strong>Het InnerLeaps Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">InnerLeaps - Vitaliteitsprogramma's voor duurzame inzetbaarheid</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const generateEmailText = (data: ROIAnalysisRequest): string => {
  const { naam, bedrijfsnaam, calculationResults } = data;
  const { scenarios, numberOfGroups } = calculationResults;
  
  return `ROI van Innerleaps voor ${bedrijfsnaam}

Beste ${naam},

Hieronder vind je drie ROI-scenario's voor ${bedrijfsnaam} met ${data.aantalDeelnemers} deelnemers (${numberOfGroups} groep${numberOfGroups !== 1 ? 'en' : ''}).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENARIO 1: ${scenarios.scenario1.name}
${scenarios.scenario1.description}

Verzuimbesparing: ${formatCurrency(scenarios.scenario1.verzuimBesparing)}
Netto besparing: ${formatCurrency(scenarios.scenario1.netBesparing)}
ROI: ${formatPercentage(scenarios.scenario1.roi)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENARIO 2: ${scenarios.scenario2.name}
${scenarios.scenario2.description}

Verzuimbesparing: ${formatCurrency(scenarios.scenario2.verzuimBesparing)}
Retentiebesparing: ${formatCurrency(scenarios.scenario2.retentieBesparing)}
Productiviteitsbesparing: ${formatCurrency(scenarios.scenario2.productiviteitBesparing)}
Netto besparing: ${formatCurrency(scenarios.scenario2.netBesparing)}
ROI: ${formatPercentage(scenarios.scenario2.roi)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENARIO 3: ${scenarios.scenario3.name}
${scenarios.scenario3.description}

Verzuimbesparing: ${formatCurrency(scenarios.scenario3.verzuimBesparing)}
Retentiebesparing: ${formatCurrency(scenarios.scenario3.retentieBesparing)}
Productiviteitsbesparing: ${formatCurrency(scenarios.scenario3.productiviteitBesparing)}
Netto besparing: ${formatCurrency(scenarios.scenario3.netBesparing)}
ROI: ${formatPercentage(scenarios.scenario3.roi)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Wil je kijken hoe ${bedrijfsnaam} deze resultaten kan behalen?

MAAK VRIJBLIJVEND KENNIS MET BAS
https://calendar.app.google/BgGy8cVUSk4w5Zzg8

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WETENSCHAPPELIJKE BRONNEN

• Verzuimkosten (${calculationResults.constants.VK}x): Sazas (2024)
• Verzuimreductie (15-21%): Virgili (2015) - Meta-analyse 19 studies
• Vervangingskosten (${calculationResults.constants.VKP}x): O'Connell & Kung (2007)
• Retentie & Productiviteit (5-8%): Khoury et al. (2015), Good et al. (2016)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Met vriendelijke groet,
Het InnerLeaps Team

InnerLeaps - Vitaliteitsprogramma's voor duurzame inzetbaarheid
`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validatedData = roiAnalysisSchema.parse(body);

    if (!resend) {
      console.log("No RESEND_API_KEY - simulating email");
      return new Response(JSON.stringify({ success: true, simulated: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const htmlContent = generateEmailHTML(validatedData);
    const textContent = generateEmailText(validatedData);

    await resend.emails.send({
      from: "InnerLeaps <info@innerleaps.nl>",
      to: [validatedData.email],
      subject: `Ontdek de ROI van Innerleaps voor ${validatedData.bedrijfsnaam}`,
      html: htmlContent,
      text: textContent,
      replyTo: "bas@innerleaps.nl",
    });

    await resend.emails.send({
      from: "InnerLeaps <info@innerleaps.nl>",
      to: ["bas@innerleaps.nl"],
      subject: `Nieuwe ROI: ${validatedData.bedrijfsnaam}`,
      text: `Nieuwe aanvraag van ${validatedData.naam} (${validatedData.email})`,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Er is een fout opgetreden. Probeer het later opnieuw." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
