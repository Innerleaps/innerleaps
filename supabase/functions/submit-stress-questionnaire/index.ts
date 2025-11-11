import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema - personal details are optional
const StressQuestionnaireSchema = z.object({
  naam: z.string().trim().max(100, "Name must be less than 100 characters").optional().default(""),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters").optional().or(z.literal("")),
  organisatie: z.string().trim().max(200, "Organization must be less than 200 characters").optional().default(""),
  q1: z.number().int().min(0).max(4, "Question 1 must be between 0 and 4"),
  q2: z.number().int().min(0).max(4, "Question 2 must be between 0 and 4"),
  q3: z.number().int().min(0).max(4, "Question 3 must be between 0 and 4"),
  q4: z.number().int().min(0).max(4, "Question 4 must be between 0 and 4"),
  q5: z.number().int().min(0).max(4, "Question 5 must be between 0 and 4"),
  q6: z.number().int().min(0).max(4, "Question 6 must be between 0 and 4"),
  q7: z.number().int().min(0).max(4, "Question 7 must be between 0 and 4"),
  q8: z.number().int().min(0).max(4, "Question 8 must be between 0 and 4"),
  q9: z.number().int().min(0).max(4, "Question 9 must be between 0 and 4"),
  q10: z.number().int().min(0).max(4, "Question 10 must be between 0 and 4"),
  total_score: z.number().int().min(0).max(40, "Total score must be between 0 and 40"),
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

// Score level classification
function getScoreLevel(score: number) {
  if (score >= 0 && score <= 13) {
    return {
      level: "Goed",
      color: "#16a34a", // green-600
      bgColor: "#f0fdf4", // green-50
      icon: "✓"
    };
  } else if (score >= 14 && score <= 26) {
    return {
      level: "Let op, actie aanbevolen",
      color: "#ea580c", // orange-600
      bgColor: "#fff7ed", // orange-50
      icon: "⚠️"
    };
  } else {
    return {
      level: "Gevaar, actie nodig",
      color: "#dc2626", // red-600
      bgColor: "#fef2f2", // red-50
      icon: "⚠️"
    };
  }
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

    // Server-side score verification with reversed scoring for questions 4, 5, 7, 8
    const reversedQuestions = [4, 5, 7, 8];
    let calculatedScore = 0;
    
    for (let i = 1; i <= 10; i++) {
      const value = submission[`q${i}` as keyof typeof submission] as number;
      if (reversedQuestions.includes(i)) {
        // Reversed scoring: 0→4, 1→3, 2→2, 3→1, 4→0
        calculatedScore += (4 - value);
      } else {
        // Normal scoring
        calculatedScore += value;
      }
    }

    console.log(`Client score: ${submission.total_score}, Server calculated score: ${calculatedScore}`);
    
    // Use server-calculated score (more trustworthy)
    submission.total_score = calculatedScore;

    // Check rate limit (only if email is provided)
    if (submission.email && submission.email.trim() !== "") {
      const rateLimitCheck = checkRateLimit(submission.email);
      if (!rateLimitCheck.allowed) {
        console.warn("Rate limit exceeded for:", submission.email);
        return new Response(
          JSON.stringify({ 
            error: "Te veel inzendingen. Probeer het over een uur opnieuw.",
            retryAfter: "1 hour"
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check for duplicate submission in last 5 minutes (only if email is provided)
    if (submission.email && submission.email.trim() !== "") {
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
            error: "Je hebt dit formulier recent al ingevuld. Wacht een paar minuten voordat je opnieuw indient."
          }),
          {
            status: 409,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
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

    // Send email only if email is provided
    if (submission.email && submission.email.trim() !== "") {
      const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

      // Escape all user-controlled fields for HTML to prevent XSS
      const safeName = submission.naam && submission.naam.trim() !== "" 
        ? escapeHtml(submission.naam) 
        : "Beste deelnemer";
      const safeEmail = submission.email ? escapeHtml(submission.email) : "";
      const safeOrganisatie = submission.organisatie ? escapeHtml(submission.organisatie) : "";

      const scoreLevel = getScoreLevel(submission.total_score);

      const emailResponse = await resend.emails.send({
        from: "InnerLeaps <bas@innerleaps.nl>",
        to: [submission.email],
        subject: "Jouw vragenlijst resultaat",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Bedankt voor het invullen</h1>
            
            <p>${safeName},</p>
            
            <div style="background-color: ${scoreLevel.bgColor}; border: 2px solid ${scoreLevel.color}; border-radius: 8px; padding: 32px; margin: 20px 0; text-align: center;">
              <p style="font-size: 16px; margin-bottom: 8px; color: #333;">Je score is</p>
              <p style="font-size: 48px; font-weight: bold; color: ${scoreLevel.color}; margin: 8px 0;">${submission.total_score}</p>
              <p style="font-size: 16px; margin-bottom: 20px; color: #333;">van de 40 punten</p>
              
              <div style="display: inline-block; background-color: white; border: 2px solid ${scoreLevel.color}; border-radius: 20px; padding: 10px 20px;">
                <span style="font-size: 20px; margin-right: 8px;">${scoreLevel.icon}</span>
                <span style="font-weight: bold; color: ${scoreLevel.color}; font-size: 16px;">${scoreLevel.level}</span>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666;">
                Met vriendelijke groet,<br>
                <strong>InnerLeaps</strong>
              </p>
            </div>
          </div>
        `,
      });

      console.log("Email sent successfully:", emailResponse);
    } else {
      console.log("No email sent - email not provided");
    }

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