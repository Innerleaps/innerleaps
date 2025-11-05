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
  aantalDeelnemers: z.string(),
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
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
      <h1 style="margin: 0;">ROI-Analyse InnerLeaps</h1>
      <p style="margin: 10px 0 0 0;">${safeBedrijfsnaam}</p>
    </div>

    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
      <p>Beste ${safeNaam},</p>
      <p>Hieronder vind je drie scenario's voor ${safeBedrijfsnaam} met ${data.aantalDeelnemers} deelnemers (${numberOfGroups} groep${numberOfGroups !== 1 ? 'en' : ''}).</p>

      <!-- Scenario 1 -->
      <div style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3>${escapeHtml(scenarios.scenario1.name)}</h3>
        <p style="color: #6b7280;">${escapeHtml(scenarios.scenario1.description)}</p>
        <table style="width: 100%;">
          <tr><td>Verzuimbesparing</td><td style="text-align: right;"><strong>${formatCurrency(scenarios.scenario1.verzuimBesparing)}</strong></td></tr>
          <tr><td>Netto besparing</td><td style="text-align: right;"><strong>${formatCurrency(scenarios.scenario1.netBesparing)}</strong></td></tr>
          <tr><td>ROI</td><td style="text-align: right;"><strong>${formatPercentage(scenarios.scenario1.roi)}</strong></td></tr>
        </table>
      </div>

      <!-- Scenario 2 - Aanbevolen -->
      <div style="background: linear-gradient(135deg, #0f766e, #14b8a6); color: white; border: 4px solid #ea580c; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <div style="text-align: center; background: #ea580c; margin: -20px -20px 15px -20px; padding: 5px; border-radius: 4px 4px 0 0;"><strong>⭐ AANBEVOLEN</strong></div>
        <h3>${escapeHtml(scenarios.scenario2.name)}</h3>
        <p>${escapeHtml(scenarios.scenario2.description)}</p>
        <table style="width: 100%; color: white;">
          <tr><td>Verzuimbesparing</td><td style="text-align: right;">${formatCurrency(scenarios.scenario2.verzuimBesparing)}</td></tr>
          <tr><td>Retentiebesparing</td><td style="text-align: right;">${formatCurrency(scenarios.scenario2.retentieBesparing)}</td></tr>
          <tr><td>Productiviteit</td><td style="text-align: right;">${formatCurrency(scenarios.scenario2.productiviteitBesparing)}</td></tr>
          <tr><td><strong>Netto besparing</strong></td><td style="text-align: right;"><strong>${formatCurrency(scenarios.scenario2.netBesparing)}</strong></td></tr>
          <tr><td><strong>ROI</strong></td><td style="text-align: right;"><strong>${formatPercentage(scenarios.scenario2.roi)}</strong></td></tr>
        </table>
      </div>

      <!-- Scenario 3 -->
      <div style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3>${escapeHtml(scenarios.scenario3.name)}</h3>
        <p style="color: #6b7280;">${escapeHtml(scenarios.scenario3.description)}</p>
        <table style="width: 100%;">
          <tr><td>Verzuimbesparing</td><td style="text-align: right;">${formatCurrency(scenarios.scenario3.verzuimBesparing)}</td></tr>
          <tr><td>Retentiebesparing</td><td style="text-align: right;">${formatCurrency(scenarios.scenario3.retentieBesparing)}</td></tr>
          <tr><td>Productiviteit</td><td style="text-align: right;">${formatCurrency(scenarios.scenario3.productiviteitBesparing)}</td></tr>
          <tr><td><strong>Netto besparing</strong></td><td style="text-align: right;"><strong>${formatCurrency(scenarios.scenario3.netBesparing)}</strong></td></tr>
          <tr><td><strong>ROI</strong></td><td style="text-align: right;"><strong>${formatPercentage(scenarios.scenario3.roi)}</strong></td></tr>
        </table>
      </div>

      <h3>Wetenschappelijke Bronnen</h3>
      <ul>
        <li><strong>Verzuimkosten (${calculationResults.constants.VK}x):</strong> Sazas (2024)</li>
        <li><strong>Verzuimreductie (15-21%):</strong> Virgili (2015) - Meta-analyse 19 studies</li>
        <li><strong>Vervangingskosten (${calculationResults.constants.VKP}x):</strong> O'Connell & Kung (2007)</li>
        <li><strong>Retentie & Productiviteit (5-8%):</strong> Khoury et al. (2015), Good et al. (2016)</li>
      </ul>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://calendar.app.google/BgGy8cVUSk4w5Zzg8" style="display: inline-block; background: #0f766e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">📅 Plan een gesprek</a>
      </div>

      <p>Met vriendelijke groet,<br><strong>Het InnerLeaps Team</strong></p>
    </div>
  </div>
</body>
</html>`;
};

const generateEmailText = (data: ROIAnalysisRequest): string => {
  const { naam, bedrijfsnaam, calculationResults } = data;
  const { scenarios } = calculationResults;
  
  return `
ROI ANALYSE - ${bedrijfsnaam.toUpperCase()}

Beste ${naam},

SCENARIO 1: ${scenarios.scenario1.name}
Netto besparing: ${formatCurrency(scenarios.scenario1.netBesparing)}
ROI: ${formatPercentage(scenarios.scenario1.roi)}

⭐ SCENARIO 2 (AANBEVOLEN): ${scenarios.scenario2.name}
Verzuim: ${formatCurrency(scenarios.scenario2.verzuimBesparing)}
Retentie: ${formatCurrency(scenarios.scenario2.retentieBesparing)}
Productiviteit: ${formatCurrency(scenarios.scenario2.productiviteitBesparing)}
Netto besparing: ${formatCurrency(scenarios.scenario2.netBesparing)}
ROI: ${formatPercentage(scenarios.scenario2.roi)}

SCENARIO 3: ${scenarios.scenario3.name}
Netto besparing: ${formatCurrency(scenarios.scenario3.netBesparing)}
ROI: ${formatPercentage(scenarios.scenario3.roi)}

Plan een gesprek: https://calendar.app.google/BgGy8cVUSk4w5Zzg8

Met vriendelijke groet,
Het InnerLeaps Team
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
      subject: `ROI-analyse ${validatedData.bedrijfsnaam}`,
      html: htmlContent,
      text: textContent,
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
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
