import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod validation schema
const MasterclassRegistrationSchema = z.object({
  naam: z.string().trim().min(1, "Naam is verplicht").max(100),
  email: z.string().trim().email("Ongeldig email adres").max(255),
  is_leidinggevende: z.boolean(),
  functie_titel: z.string().trim().min(1, "Functie titel is verplicht").max(150),
  selected_timeslot: z.string(),
  timeslot_display: z.string(),
  calendar_url: z.string().url(),
});

type MasterclassRegistration = z.infer<typeof MasterclassRegistrationSchema>;

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS = 3;

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of rateLimitStore.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(email);
    }
  }
}, 10 * 60 * 1000);

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(email);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(email, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= MAX_SUBMISSIONS) {
    return false;
  }

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
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received masterclass registration request");

    // Parse and validate request body
    const rawBody = await req.json();
    console.log("Raw body received:", { ...rawBody, email: "[REDACTED]" });

    const validationResult = MasterclassRegistrationSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data: MasterclassRegistration = validationResult.data;

    // Check rate limit
    if (!checkRateLimit(data.email)) {
      console.warn("Rate limit exceeded for email:", data.email);
      return new Response(
        JSON.stringify({ error: "Te veel aanmeldingen. Probeer later opnieuw." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check for duplicate submissions (within 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: existingSubmissions, error: checkError } = await supabase
      .from("masterclass_registrations")
      .select("id")
      .eq("email", data.email)
      .gte("created_at", fiveMinutesAgo)
      .limit(1);

    if (checkError) {
      console.error("Error checking duplicates:", checkError);
    }

    if (existingSubmissions && existingSubmissions.length > 0) {
      console.warn("Duplicate submission detected for email:", data.email);
      return new Response(
        JSON.stringify({ error: "Je hebt recent al een aanmelding gedaan." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Insert into database
    console.log("Inserting registration into database");
    const { error: insertError } = await supabase
      .from("masterclass_registrations")
      .insert({
        naam: data.naam,
        email: data.email,
        is_leidinggevende: data.is_leidinggevende,
        functie_titel: data.functie_titel,
        selected_timeslot: data.selected_timeslot,
        timeslot_display: data.timeslot_display,
        calendar_url: data.calendar_url,
        source_page: "masterclass-stress-qr",
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Fout bij opslaan gegevens" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Registration saved successfully");

    // Send confirmation email
    try {
      const escapedNaam = escapeHtml(data.naam);
      const escapedTimeslot = escapeHtml(data.timeslot_display);
      const escapedCalendarUrl = escapeHtml(data.calendar_url);

      console.log("Sending confirmation email to:", data.email);

      const emailResponse = await resend.emails.send({
        from: "InnerLeaps <onboarding@resend.dev>",
        to: [data.email],
        subject: "Welkom bij de gratis Masterclass Stressmanagement!",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1e3a8a; margin-bottom: 20px;">Welkom bij de gratis Masterclass Stressmanagement!</h1>
            
            <p style="font-size: 16px; margin-bottom: 15px;">Beste ${escapedNaam},</p>
            
            <p style="font-size: 16px; margin-bottom: 15px;">
              Bedankt voor je aanmelding voor onze masterclass. We kijken ernaar uit om je te verwelkomen!
            </p>

            <div style="background: #f0f9ff; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f97316;">
              <strong style="font-size: 16px; display: block; margin-bottom: 8px;">Jouw gekozen tijdstip:</strong>
              <span style="font-size: 18px; color: #1e3a8a;">${escapedTimeslot}</span>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${escapedCalendarUrl}" 
                 style="background: #f97316; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 16px; font-weight: 600;">
                📅 Voeg toe aan mijn agenda
              </a>
            </div>

            <div style="margin-top: 30px;">
              <p style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">Wat je gaat leren:</p>
              <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0; padding-left: 24px; position: relative;">
                  <span style="position: absolute; left: 0; color: #f97316;">✓</span>
                  Inzicht in jouw stress level
                </li>
                <li style="padding: 8px 0; padding-left: 24px; position: relative;">
                  <span style="position: absolute; left: 0; color: #f97316;">✓</span>
                  Aandachtoefening voor meer focus
                </li>
                <li style="padding: 8px 0; padding-left: 24px; position: relative;">
                  <span style="position: absolute; left: 0; color: #f97316;">✓</span>
                  Reset tool voor je werkgeheugen
                </li>
              </ul>
            </div>

            <p style="font-size: 16px; margin-top: 30px;">
              Tot snel!<br>
              <strong>Team InnerLeaps</strong>
            </p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              <p>Vragen? Neem contact op:</p>
              <p>
                📧 <a href="mailto:info@innerleaps.nl" style="color: #f97316; text-decoration: none;">info@innerleaps.nl</a><br>
                📱 <a href="tel:+31621967068" style="color: #f97316; text-decoration: none;">06 21 96 70 68</a>
              </p>
            </div>
          </body>
          </html>
        `,
      });

      console.log("Email sent successfully:", emailResponse);
    } catch (emailError) {
      console.error("Email sending failed (non-critical):", emailError);
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Aanmelding succesvol ontvangen" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Unexpected error in submit-masterclass-registration:", error);
    return new Response(
      JSON.stringify({ 
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
