import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const StressQuestionnaireSchema = z.object({
  naam: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  organisatie: z.string().trim().min(1, "Organization is required").max(200, "Organization must be less than 200 characters"),
  q1: z.number().int().min(0).max(3, "Question 1 must be between 0 and 3"),
  q2: z.number().int().min(0).max(3, "Question 2 must be between 0 and 3"),
  q3: z.number().int().min(0).max(3, "Question 3 must be between 0 and 3"),
  q4: z.number().int().min(0).max(3, "Question 4 must be between 0 and 3"),
  q5: z.number().int().min(0).max(3, "Question 5 must be between 0 and 3"),
  q6: z.number().int().min(0).max(3, "Question 6 must be between 0 and 3"),
  q7: z.number().int().min(0).max(3, "Question 7 must be between 0 and 3"),
  q8: z.number().int().min(0).max(3, "Question 8 must be between 0 and 3"),
  q9: z.number().int().min(0).max(3, "Question 9 must be between 0 and 3"),
  q10: z.number().int().min(0).max(3, "Question 10 must be between 0 and 3"),
  total_score: z.number().int().min(0).max(30, "Total score must be between 0 and 30"),
});

type StressQuestionnaireSubmission = z.infer<typeof StressQuestionnaireSchema>;

// Rate limiting
const rateLimitStore = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(email: string): { allowed: boolean; remainingAttempts?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(email);

  if (!record) {
    rateLimitStore.set(email, { count: 1, firstAttempt: now });
    return { allowed: true, remainingAttempts: RATE_LIMIT_MAX - 1 };
  }

  if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(email, { count: 1, firstAttempt: now });
    return { allowed: true, remainingAttempts: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false };
  }

  record.count++;
  return { allowed: true, remainingAttempts: RATE_LIMIT_MAX - record.count };
}

// Cleanup old rate limit records every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, record] of rateLimitStore.entries()) {
    if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(email);
    }
  }
}, 30 * 60 * 1000);

// HTML escape function to prevent XSS
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
    console.log("Starting stress questionnaire submission...");
    
    const rawData = await req.json();
    console.log("Received submission for:", rawData.email);

    // Validate input
    const validationResult = StressQuestionnaireSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input data",
          details: validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const submission = validationResult.data;

    // Check rate limit
    const rateLimitCheck = checkRateLimit(submission.email);
    if (!rateLimitCheck.allowed) {
      console.warn("Rate limit exceeded for:", submission.email);
      return new Response(
        JSON.stringify({ 
          error: "Too many submissions. Please try again later.",
          retryAfter: "1 hour"
        }),
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

    // Check for duplicate submission in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentSubmissions, error: checkError } = await supabase
      .from("stress_questionnaire_submissions")
      .select("id")
      .eq("email", submission.email)
      .gte("created_at", fiveMinutesAgo)
      .limit(1);

    if (checkError) {
      console.error("Error checking for duplicates:", checkError);
    } else if (recentSubmissions && recentSubmissions.length > 0) {
      console.warn("Duplicate submission detected for:", submission.email);
      return new Response(
        JSON.stringify({ 
          error: "You have already submitted this form recently. Please wait a few minutes before submitting again."
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Save to database
    const { error: dbError } = await supabase
      .from("stress_questionnaire_submissions")
      .insert(submission);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Unable to save your submission. Please try again later.");
    }

    console.log("Submission saved to database successfully");

    // Send email with Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const getStressLevel = (score: number): string => {
      if (score <= 13) return "Laag stressniveau";
      if (score <= 18) return "Gemiddeld stressniveau";
      return "Hoog stressniveau";
    };

    // Escape user data for HTML
    const escapedNaam = escapeHtml(submission.naam);
    const escapedOrganisatie = escapeHtml(submission.organisatie);

    const emailResponse = await resend.emails.send({
      from: "MBSR Nederland <onboarding@resend.dev>",
      to: [submission.email],
      subject: "Jouw stressvragenlijst resultaat",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Bedankt voor het invullen van de stressvragenlijst</h1>
          <p>Beste ${escapedNaam},</p>
          <p>Bedankt voor het invullen van onze stressvragenlijst. Hieronder vind je jouw resultaten:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Jouw Score: ${submission.total_score}/30</h2>
            <p style="font-size: 18px; font-weight: bold; color: ${submission.total_score > 18 ? '#d32f2f' : submission.total_score > 13 ? '#f57c00' : '#388e3c'};">
              ${getStressLevel(submission.total_score)}
            </p>
          </div>

          <h3>Wat betekent dit?</h3>
          <ul>
            <li><strong>0-13 punten:</strong> Laag stressniveau - Je ervaart weinig stress</li>
            <li><strong>14-18 punten:</strong> Gemiddeld stressniveau - Er is ruimte voor verbeterin</li>
            <li><strong>19-30 punten:</strong> Hoog stressniveau - Overwegingen voor stressreductie zijn belangrijk</li>
          </ul>

          <p>Wil je meer weten over hoe MBSR je kan helpen? Neem gerust contact met ons op.</p>
          
          <p>Met vriendelijke groet,<br>
          Het MBSR Nederland Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Submission saved and email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-stress-questionnaire function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);