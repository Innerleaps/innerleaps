import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

/**
 * Het berichtformulier op de contactpagina.
 *
 * Dit slaat bewust niets op in de database. Een bericht is geen aanmelding met
 * velden die je later wilt uitrekenen, het is een mailtje. Het gaat dus naar de
 * mailbox van Bas, met het adres van de afzender als antwoordadres zodat hij
 * gewoon op "beantwoorden" kan drukken.
 *
 * Verstuurd via Resend vanaf `info@innerleaps.nl`, precies zoals de andere
 * formulieren op de site. Geen nieuwe sleutel en geen nieuw afzenderdomein
 * nodig: `RESEND_API_KEY` staat er al en dit domein is al geverifieerd.
 */

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ONTVANGER = "bas@innerleaps.nl";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ContactMessageSchema = z.object({
  naam: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  bericht: z.string().trim().min(1).max(2000),
  taal: z.enum(["nl", "en"]).optional(),
  herkomst: z.string().max(500).optional(),
});

// Hoeveel berichten één adres per uur mag sturen.
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_SUBMISSIONS = 3;

setInterval(() => {
  const now = Date.now();
  for (const [email, data] of rateLimitStore.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) rateLimitStore.delete(email);
  }
}, 10 * 60 * 1000);

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(email);
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(email, { count: 1, timestamp: now });
    return true;
  }
  if (record.count >= MAX_SUBMISSIONS) return false;
  record.count++;
  return true;
}

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
    const rawBody = await req.json();
    const parsed = ContactMessageSchema.safeParse(rawBody);

    if (!parsed.success) {
      console.error("Validatie mislukt:", parsed.error.errors);
      return new Response(
        JSON.stringify({ error: "Validation failed", details: parsed.error.errors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const data = parsed.data;

    if (!checkRateLimit(data.email)) {
      console.warn("Te veel berichten van hetzelfde adres");
      return new Response(
        JSON.stringify({ error: "Te veel berichten. Probeer het later opnieuw." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const naam = escapeHtml(data.naam);
    const email = escapeHtml(data.email);
    const bericht = escapeHtml(data.bericht).replace(/\n/g, "<br>");
    const herkomst = data.herkomst ? escapeHtml(data.herkomst) : "onbekend";

    await resend.emails.send({
      from: "InnerLeaps <info@innerleaps.nl>",
      to: [ONTVANGER],
      // Zo kan Bas gewoon op beantwoorden drukken en komt het bij de afzender uit.
      reply_to: data.email,
      subject: `Bericht via de site van ${data.naam}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #230c47; font-size: 20px;">Nieuw bericht via de contactpagina</h1>
          <p><strong>Naam:</strong> ${naam}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Taal:</strong> ${data.taal ?? "nl"}</p>
          <p><strong>Pagina:</strong> ${herkomst}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="white-space: pre-wrap;">${bericht}</p>
        </body>
        </html>
      `,
    });

    console.log("Contactbericht verstuurd");

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Onverwachte fout:", error);
    return new Response(JSON.stringify({ error: "Er ging iets mis bij het versturen." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
