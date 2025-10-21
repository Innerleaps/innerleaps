import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface StressQuestionnaireSubmission {
  naam: string;
  email: string;
  organisatie: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
  total_score: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting stress questionnaire submission...");
    
    const submission: StressQuestionnaireSubmission = await req.json();
    console.log("Received submission for:", submission.email);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const { error: dbError } = await supabase
      .from("stress_questionnaire_submissions")
      .insert(submission);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Submission saved to database successfully");

    // Send email with Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const getStressLevel = (score: number): string => {
      if (score <= 13) return "Laag stressniveau";
      if (score <= 18) return "Gemiddeld stressniveau";
      return "Hoog stressniveau";
    };

    const emailResponse = await resend.emails.send({
      from: "MBSR Nederland <onboarding@resend.dev>",
      to: [submission.email],
      subject: "Jouw stressvragenlijst resultaat",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Bedankt voor het invullen van de stressvragenlijst</h1>
          <p>Beste ${submission.naam},</p>
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