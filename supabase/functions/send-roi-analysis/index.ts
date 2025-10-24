import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escaping function to prevent XSS attacks
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

// Zod validation schema
const roiAnalysisSchema = z.object({
  naam: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  bedrijfsnaam: z.string().trim().min(1, "Company name is required").max(200, "Company name must be less than 200 characters"),
  verzuimPercentage: z.string().trim().regex(/^\d+(\.\d+)?$/, "Invalid percentage format").max(10, "Invalid percentage"),
  aantalDeelnemers: z.string().trim().regex(/^\d+$/, "Invalid number format").max(10, "Invalid number"),
  brutoJaarsalaris: z.string().trim().regex(/^\d+$/, "Invalid salary format").max(15, "Invalid salary"),
  calculationResults: z.object({
    totaleLoonkosten: z.number(),
    verzuimkosten: z.number(),
    programmakosten: z.number(),
    minVerzuimbesparing: z.number(),
    maxVerzuimbesparing: z.number(),
    productiviteitswinst: z.number(),
    minTotaleBesparing: z.number(),
    maxTotaleBesparing: z.number(),
    minTerugverdientijd: z.number(),
    maxTerugverdientijd: z.number(),
    minROI: z.number(),
    maxROI: z.number(),
    showROI: z.boolean(),
  }),
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
  return Math.round(percentage).toString();
};

const formatMonths = (months: number): string => {
  return Math.round(months).toString();
};

const generateEmailHTML = (data: ROIAnalysisRequest): string => {
  const { naam, bedrijfsnaam, verzuimPercentage, aantalDeelnemers, brutoJaarsalaris, calculationResults } = data;
  const { programmakosten, minVerzuimbesparing, maxVerzuimbesparing, productiviteitswinst, minTotaleBesparing, maxTotaleBesparing, minTerugverdientijd, maxTerugverdientijd, minROI, maxROI, showROI } = calculationResults;
  
  // Escape all user-controlled data for HTML
  const safeNaam = escapeHtml(naam);
  const safeBedrijfsnaam = escapeHtml(bedrijfsnaam);
  const safeVerzuimPercentage = escapeHtml(verzuimPercentage);
  const safeAantalDeelnemers = escapeHtml(aantalDeelnemers);
  const safeBrutoJaarsalaris = escapeHtml(brutoJaarsalaris);

  const conditionalContent = showROI ? `
    <h3 style="color: #6B46C1; font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 24px 0 16px 0; font-weight: 600;">FINANCIËLE IMPACT INNERLEAPS PROGRAMMA:</h3>
    <div style="background: #F8FAFC; padding: 24px; border-radius: 8px; margin: 20px 0;">
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Programma-investering</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(programmakosten)}</p>
      </div>
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Terugverdientijd</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden</p>
      </div>
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Jaarlijkse verzuimbesparing</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(minVerzuimbesparing)} - ${formatCurrency(maxVerzuimbesparing)}</p>
      </div>
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Productiviteitswinst</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(productiviteitswinst)}</p>
      </div>
      <div style="margin: 12px 0; padding: 16px; border-left: 4px solid #F97316; background: white; border-radius: 4px;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Totale jaarlijkse besparing</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(minTotaleBesparing)} - ${formatCurrency(maxTotaleBesparing)}</p>
      </div>
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">ROI na 1 jaar</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatPercentage(minROI)}% - ${formatPercentage(maxROI)}%</p>
      </div>
    </div>
  ` : `
    <h3 style="color: #6B46C1; font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 24px 0 16px 0; font-weight: 600;">FINANCIËLE IMPACT INNERLEAPS PROGRAMMA:</h3>
    <div style="background: #F8FAFC; padding: 24px; border-radius: 8px; margin: 20px 0;">
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Programma-investering</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(programmakosten)}</p>
      </div>
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Geschatte terugverdientijd</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden</p>
      </div>
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Jaarlijkse verzuimbesparing</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(minVerzuimbesparing)} - ${formatCurrency(maxVerzuimbesparing)}</p>
      </div>
      <div style="margin: 12px 0; padding: 12px; border-left: 4px solid #F97316;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Productiviteitswinst</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(productiviteitswinst)}</p>
      </div>
      <div style="margin: 12px 0; padding: 16px; border-left: 4px solid #F97316; background: white; border-radius: 4px;">
        <p style="margin: 0; color: #6B46C1; font-size: 14px; font-weight: 600;">Totale jaarlijkse besparing</p>
        <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #334155;">${formatCurrency(minTotaleBesparing)} - ${formatCurrency(maxTotaleBesparing)}</p>
      </div>
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>InnerLeaps ROI analyse voor ${bedrijfsnaam}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 0; background: #ffffff;">
      
      <div style="background: #6B46C1; padding: 32px 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">InnerLeaps Programma</h1>
        <p style="color: #E9D5FF; margin: 8px 0 0 0; font-size: 16px;">ROI-analyse voor ${safeBedrijfsnaam}</p>
      </div>

      <div style="padding: 32px 20px;">
        <p style="margin: 0 0 16px 0; font-size: 16px;">Beste ${safeNaam},</p>

        <p style="margin: 0 0 24px 0; font-size: 16px;">Leuk dat je onze website hebt bezocht en verstandig dat je uitzoekt of ons programma de investering waard is. Hieronder jullie resultaten.</p>

        <div style="background: #F8FAFC; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #E2E8F0;">
          <h3 style="color: #6B46C1; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">JOUW ORGANISATIE:</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin: 0 0 8px 0; padding-left: 20px; position: relative; font-size: 15px;">
              <span style="position: absolute; left: 0; color: #F97316; font-weight: 700;">•</span>
              ${safeBedrijfsnaam}
            </li>
            <li style="margin: 0 0 8px 0; padding-left: 20px; position: relative; font-size: 15px;">
              <span style="position: absolute; left: 0; color: #F97316; font-weight: 700;">•</span>
              ${safeAantalDeelnemers} deelnemers
            </li>
            <li style="margin: 0 0 8px 0; padding-left: 20px; position: relative; font-size: 15px;">
              <span style="position: absolute; left: 0; color: #F97316; font-weight: 700;">•</span>
              ${safeVerzuimPercentage}% huidig verzuimpercentage
            </li>
            <li style="margin: 0 0 0 0; padding-left: 20px; position: relative; font-size: 15px;">
              <span style="position: absolute; left: 0; color: #F97316; font-weight: 700;">•</span>
              ${formatCurrency(parseInt(safeBrutoJaarsalaris))} gemiddeld bruto jaarsalaris
            </li>
          </ul>
        </div>

        ${conditionalContent}

        <p style="margin: 24px 0; font-size: 15px; line-height: 1.6;">Deze berekening is gebaseerd op wetenschappelijk onderzoek naar aandacht training.</p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="https://calendar.google.com/appointments/schedules/AcZssZ3VM8RLgeZm9Ej29kbhx4LugakTLXw_vF9BePhup0zm-DtWT5kk6nbHQw-chzBGEQQInd7l3Fs4" style="background: #F97316; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">Maak kennis met Bas</a>
        </div>

        <p style="margin: 24px 0 8px 0; font-size: 15px;">Met vriendelijke groet,</p>
        <p style="margin: 0 0 4px 0; font-weight: 700; font-size: 15px; color: #6B46C1;">Bas ter Haar Romenij</p>
        <p style="margin: 0; font-size: 15px; color: #64748B;">InnerLeaps</p>

        <hr style="border: none; border-top: 2px solid #E2E8F0; margin: 32px 0;">

        <div style="font-size: 13px; color: #64748B; line-height: 1.6;">
          <p style="margin: 0 0 12px 0; font-weight: 600; color: #334155;">Bronvermelding:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin: 0 0 6px 0;">Verzuimkostenfactor volgens Sazas onderzoek (2024): 140-230%</li>
            <li style="margin: 0 0 6px 0;">Verzuimreductie: 15-21% (gebaseerd op meta-analyses van 40+ jaar onderzoek)</li>
            <li style="margin: 0 0 6px 0;">Productiviteitsstijging: 6% (gebaseerd op meta-analyses van 40+ jaar onderzoek)</li>
            <li style="margin: 0;">Volledige referentielijst en onderzoeksdata op aanvraag beschikbaar</li>
          </ul>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E2E8F0;">
            <p style="margin: 0 0 4px 0; font-weight: 600; color: #334155;">InnerLeaps</p>
            <p style="margin: 0 0 2px 0;">Koningin Wilhelminaplein 454</p>
            <p style="margin: 0 0 2px 0;">06 23 45 34 77</p>
            <p style="margin: 0 0 12px 0;">KVK nummer: 98136925</p>
            
            <p style="font-size: 11px; color: #94A3B8; margin: 0;">
              Individuele resultaten kunnen variëren. Berekening gebaseerd op gemiddelde effecten uit wetenschappelijke literatuur.
            </p>
          </div>
        </div>
      </div>

    </body>
    </html>
  `;
};

const generateEmailText = (data: ROIAnalysisRequest): string => {
  const { naam, bedrijfsnaam, verzuimPercentage, aantalDeelnemers, brutoJaarsalaris, calculationResults } = data;
  const { programmakosten, minVerzuimbesparing, maxVerzuimbesparing, productiviteitswinst, minTotaleBesparing, maxTotaleBesparing, minTerugverdientijd, maxTerugverdientijd, minROI, maxROI, showROI } = calculationResults;
  
  // Plain text doesn't need HTML escaping, but we still use the validated data

  const conditionalContent = showROI ? `
FINANCIËLE IMPACT INNERLEAPS PROGRAMMA:

Programma-investering: ${formatCurrency(programmakosten)}
Terugverdientijd: ${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden
Jaarlijkse verzuimbesparing: ${formatCurrency(minVerzuimbesparing)} - ${formatCurrency(maxVerzuimbesparing)}
Productiviteitswinst: ${formatCurrency(productiviteitswinst)}
Totale jaarlijkse besparing: ${formatCurrency(minTotaleBesparing)} - ${formatCurrency(maxTotaleBesparing)}
ROI na 1 jaar: ${formatPercentage(minROI)}% - ${formatPercentage(maxROI)}%
  ` : `
FINANCIËLE IMPACT INNERLEAPS PROGRAMMA:

Programma-investering: ${formatCurrency(programmakosten)}
Geschatte terugverdientijd: ${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden
Jaarlijkse verzuimbesparing: ${formatCurrency(minVerzuimbesparing)} - ${formatCurrency(maxVerzuimbesparing)}
Productiviteitswinst: ${formatCurrency(productiviteitswinst)}
Totale jaarlijkse besparing: ${formatCurrency(minTotaleBesparing)} - ${formatCurrency(maxTotaleBesparing)}
  `;

  return `
Beste ${naam},

Leuk dat je onze website hebt bezocht en verstandig dat je uitzoekt of ons programma de investering waard is. Hieronder jullie resultaten.

JOUW ORGANISATIE:
- ${bedrijfsnaam}
- ${aantalDeelnemers} deelnemers
- ${verzuimPercentage}% huidig verzuimpercentage
- ${formatCurrency(parseInt(brutoJaarsalaris))} gemiddeld bruto jaarsalaris

${conditionalContent}

Deze berekening is gebaseerd op wetenschappelijk onderzoek naar aandacht training.

Plan een gesprek: https://calendar.google.com/appointments/schedules/AcZssZ3VM8RLgeZm9Ej29kbhx4LugakTLXw_vF9BePhup0zm-DtWT5kk6nbHQw-chzBGEQQInd7l3Fs4

Met vriendelijke groet,
Bas ter Haar Romenij
InnerLeaps

---
Bronvermelding:
- Verzuimkostenfactor volgens Sazas onderzoek (2024): 140-230%
- Verzuimreductie: 15-21% (gebaseerd op meta-analyses van 40+ jaar onderzoek)
- Productiviteitsstijging: 6% (gebaseerd op meta-analyses van 40+ jaar onderzoek)
- Volledige referentielijst en onderzoeksdata op aanvraag beschikbaar

InnerLeaps
Koningin Wilhelminaplein 454
06 23 45 34 77
KVK nummer: 98136925

Individuele resultaten kunnen variëren. Berekening gebaseerd op gemiddelde effecten uit wetenschappelijke literatuur.
  `;
};

const generateNotificationEmail = (data: ROIAnalysisRequest): string => {
  const { naam, email, bedrijfsnaam, verzuimPercentage, aantalDeelnemers, brutoJaarsalaris, calculationResults } = data;
  const { programmakosten, minVerzuimbesparing, maxVerzuimbesparing, productiviteitswinst, minTotaleBesparing, maxTotaleBesparing, minTerugverdientijd, maxTerugverdientijd, minROI, maxROI, showROI } = calculationResults;
  
  // Plain text doesn't need HTML escaping, but we still use the validated data

  return `
Nieuwe ROI aanvraag ontvangen

CONTACTGEGEVENS:
- Naam: ${naam}
- Email: ${email}
- Bedrijfsnaam: ${bedrijfsnaam}

BEDRIJFSGEGEVENS:
- Huidig verzuimpercentage: ${verzuimPercentage}%
- Aantal deelnemers: ${aantalDeelnemers}
- Gemiddeld bruto jaarsalaris: €${brutoJaarsalaris}

BEREKENDE RESULTATEN:
- Programmakosten: ${formatCurrency(programmakosten)}
- Terugverdientijd: ${formatMonths(minTerugverdientijd)}-${formatMonths(maxTerugverdientijd)} maanden
- Jaarlijkse verzuimbesparing: ${formatCurrency(minVerzuimbesparing)} - ${formatCurrency(maxVerzuimbesparing)}
- Productiviteitswinst: ${formatCurrency(productiviteitswinst)}
- Totale jaarlijkse besparing: ${formatCurrency(minTotaleBesparing)} - ${formatCurrency(maxTotaleBesparing)}
${showROI ? `- ROI na 1 jaar: ${formatPercentage(minROI)}% - ${formatPercentage(maxROI)}%` : ''}

Dit is een automatische notificatie van de ROI calculator op de website.
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input data using Zod schema
    const validationResult = roiAnalysisSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.format());
      return new Response(
        JSON.stringify({ 
          error: "Invalid input data",
          details: validationResult.error.format()
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    
    const data = validationResult.data;
    console.log("Sending ROI analysis for:", data.bedrijfsnaam);

    // Check if Resend API key is available
    if (!resend) {
      console.log("Testing mode: No RESEND_API_KEY found, simulating email send");
      console.log("Email would be sent to:", data.email);
      console.log("Subject:", `ROI-analyse voor ${data.bedrijfsnaam} - Life+ programma resultaten`);
      console.log("HTML Content:", generateEmailHTML(data));
      console.log("Text Content:", generateEmailText(data));
      
      // Return success for testing
      return new Response(JSON.stringify({ 
        success: true, 
        emailId: "test-mode-" + Date.now(),
        message: "Testing mode: Email content logged to console"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Send customer email using Resend
    const customerEmailResponse = await resend.emails.send({
      from: "Bas van InnerLeaps <bas@innerleaps.nl>",
      replyTo: "bas@innerleaps.nl",
      to: [data.email],
      subject: `InnerLeaps ROI analyse voor ${escapeHtml(data.bedrijfsnaam)}`,
      html: generateEmailHTML(data),
      text: generateEmailText(data),
    });

    console.log("Customer email sent successfully:", customerEmailResponse);

    // Send notification email to Bas
    const notificationEmailResponse = await resend.emails.send({
      from: "InnerLeaps Notifications <bas@innerleaps.nl>",
      to: ["bas@innerleaps.nl"],
      subject: `Nieuwe ROI aanvraag van ${escapeHtml(data.bedrijfsnaam)}`,
      text: generateNotificationEmail(data),
    });

    console.log("Notification email sent successfully:", notificationEmailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      customerEmailId: customerEmailResponse.data?.id,
      notificationEmailId: notificationEmailResponse.data?.id
    }), {
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