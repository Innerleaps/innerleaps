import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ROIAnalysisRequest {
  naam: string;
  email: string;
  bedrijfsnaam: string;
  verzuimPercentage: string;
  aantalDeelnemers: string;
  brutoJaarsalaris: string;
  calculationResults: {
    totaleLoonkosten: number;
    verzuimkosten: number;
    programmakosten: number;
    minVerzuimbesparing: number;
    maxVerzuimbesparing: number;
    minTerugverdientijd: number;
    maxTerugverdientijd: number;
    minROI: number;
    maxROI: number;
    showROI: boolean;
  };
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatPercentage = (percentage: number): string => {
  return Math.round(percentage).toString();
};

const formatMonths = (months: number): string => {
  return Math.round(months).toString();
};

const generateEmailHTML = (data: ROIAnalysisRequest): string => {
  const { naam, bedrijfsnaam, verzuimPercentage, aantalDeelnemers, brutoJaarsalaris, calculationResults } = data;
  const { programmakosten, minVerzuimbesparing, maxVerzuimbesparing, minTerugverdientijd, maxTerugverdientijd, minROI, maxROI, showROI } = calculationResults;

  const conditionalContent = showROI ? `
    <h3 style="color: #2563eb; margin: 24px 0 16px 0;">FINANCIËLE IMPACT LIFE+ PROGRAMMA:</h3>
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 8px 0;"><strong>Programma-investering:</strong> ${formatCurrency(programmakosten)}</p>
      <p style="margin: 8px 0;"><strong>Terugverdientijd:</strong> ${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden</p>
      <p style="margin: 8px 0;"><strong>Jaarlijkse kostenbesparing:</strong> ${formatCurrency(minVerzuimbesparing)} - ${formatCurrency(maxVerzuimbesparing)}</p>
      <p style="margin: 8px 0;"><strong>ROI na 1 jaar:</strong> ${formatPercentage(minROI)}% - ${formatPercentage(maxROI)}%</p>
    </div>
    <p>Het Life+ programma verdient zichzelf binnen ${formatMonths(maxTerugverdientijd)} maanden terug.</p>
  ` : `
    <h3 style="color: #2563eb; margin: 24px 0 16px 0;">FINANCIËLE IMPACT LIFE+ PROGRAMMA:</h3>
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 8px 0;"><strong>Programma-investering:</strong> ${formatCurrency(programmakosten)}</p>
      <p style="margin: 8px 0;"><strong>Geschatte terugverdientijd:</strong> ${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden</p>
    </div>
    <p>Het Life+ programma is een investering in duurzame inzetbaarheid die zich binnen ${formatMonths(maxTerugverdientijd)} maanden terugverdient.</p>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ROI-analyse voor ${bedrijfsnaam}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin-bottom: 10px;">InnerLeaps Life+ Programma</h1>
        <p style="color: #666; margin: 0;">ROI-analyse voor ${bedrijfsnaam}</p>
      </div>

      <p>Beste ${naam},</p>

      <p>Bedankt voor je interesse in het InnerLeaps Life+ programma.<br>
      Op basis van jouw bedrijfsgegevens hebben we de volgende analyse gemaakt:</p>

      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2563eb; margin-top: 0;">JOUW ORGANISATIE:</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin: 8px 0;">• ${bedrijfsnaam}</li>
          <li style="margin: 8px 0;">• ${aantalDeelnemers} deelnemers</li>
          <li style="margin: 8px 0;">• ${verzuimPercentage}% huidig verzuimpercentage</li>
          <li style="margin: 8px 0;">• ${formatCurrency(parseInt(brutoJaarsalaris))} gemiddeld bruto jaarsalaris</li>
        </ul>
      </div>

      ${conditionalContent}

      <p>Deze berekening is gebaseerd op wetenschappelijk onderzoek naar MBSR-effectiviteit.</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://calendly.com/bas-innerleaps" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Plan een vrijblijvend gesprek</a>
      </div>

      <p>Met vriendelijke groet,<br>
      <strong>Bas ter Haar Romenij</strong><br>
      InnerLeaps</p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

      <div style="font-size: 12px; color: #666;">
        <p><strong>Bronvermelding:</strong></p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Verzuimpercentages gebaseerd op CBS Nederland (2024)</li>
          <li>Verzuimkostenfactor volgens Sazas onderzoek (2024): 140-230%</li>
          <li>MBSR verzuimreductie: 15-21% (gebaseerd op meta-analyses van 40+ jaar onderzoek)</li>
          <li>Volledige referentielijst en onderzoeksdata op aanvraag beschikbaar</li>
        </ul>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p><strong>InnerLeaps</strong><br>
          Koningin Wilhelminaplein 454<br>
          06 23 45 34 77<br>
          KVK nummer: 98136925</p>
          
          <p style="font-size: 11px; color: #888;">
            Individuele resultaten kunnen variëren. Berekening gebaseerd op gemiddelde effecten uit wetenschappelijke literatuur.
          </p>
        </div>
      </div>

    </body>
    </html>
  `;
};

const generateEmailText = (data: ROIAnalysisRequest): string => {
  const { naam, bedrijfsnaam, verzuimPercentage, aantalDeelnemers, brutoJaarsalaris, calculationResults } = data;
  const { programmakosten, minVerzuimbesparing, maxVerzuimbesparing, minTerugverdientijd, maxTerugverdientijd, minROI, maxROI, showROI } = calculationResults;

  const conditionalContent = showROI ? `
FINANCIËLE IMPACT LIFE+ PROGRAMMA:

Programma-investering: ${formatCurrency(programmakosten)}
Terugverdientijd: ${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden
Jaarlijkse kostenbesparing: ${formatCurrency(minVerzuimbesparing)} - ${formatCurrency(maxVerzuimbesparing)}
ROI na 1 jaar: ${formatPercentage(minROI)}% - ${formatPercentage(maxROI)}%

Het Life+ programma verdient zichzelf binnen ${formatMonths(maxTerugverdientijd)} maanden terug.
  ` : `
FINANCIËLE IMPACT LIFE+ PROGRAMMA:

Programma-investering: ${formatCurrency(programmakosten)}
Geschatte terugverdientijd: ${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden

Het Life+ programma is een investering in duurzame inzetbaarheid die zich binnen ${formatMonths(maxTerugverdientijd)} maanden terugverdient.
  `;

  return `
Beste ${naam},

Bedankt voor je interesse in het InnerLeaps Life+ programma.
Op basis van jouw bedrijfsgegevens hebben we de volgende analyse gemaakt:

JOUW ORGANISATIE:
- ${bedrijfsnaam}
- ${aantalDeelnemers} deelnemers
- ${verzuimPercentage}% huidig verzuimpercentage
- ${formatCurrency(parseInt(brutoJaarsalaris))} gemiddeld bruto jaarsalaris

${conditionalContent}

Deze berekening is gebaseerd op wetenschappelijk onderzoek naar MBSR-effectiviteit.

Wil je deze cijfers bespreken? Plan een vrijblijvend gesprek in via: https://calendly.com/bas-innerleaps

Met vriendelijke groet,
Bas ter Haar Romenij
InnerLeaps

---
Bronvermelding:
- Verzuimpercentages gebaseerd op CBS Nederland (2024)
- Verzuimkostenfactor volgens Sazas onderzoek (2024): 140-230%
- MBSR verzuimreductie: 15-21% (gebaseerd op meta-analyses van 40+ jaar onderzoek)
- Volledige referentielijst en onderzoeksdata op aanvraag beschikbaar

InnerLeaps
Koningin Wilhelminaplein 454
06 23 45 34 77
KVK nummer: 98136925

Individuele resultaten kunnen variëren. Berekening gebaseerd op gemiddelde effecten uit wetenschappelijke literatuur.
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ROIAnalysisRequest = await req.json();
    console.log("Sending ROI analysis for:", data.bedrijfsnaam);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Bas van InnerLeaps <bas@innerleaps.nl>",
      replyTo: "bas@innerleaps.nl",
      to: [data.email],
      subject: `ROI-analyse voor ${data.bedrijfsnaam} - Life+ programma resultaten`,
      html: generateEmailHTML(data),
      text: generateEmailText(data),
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error sending ROI analysis:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to send ROI analysis email"
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);