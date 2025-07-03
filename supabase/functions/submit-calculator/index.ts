
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalculatorSubmission {
  name: string;
  phone?: string;
  functie: string;
  company: string;
  employees: number;
  avgEmployeeCosts: number;
  currentAbsenteeism: number;
  currentTurnover: number;
  calculationResults: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const submission: CalculatorSubmission = await req.json();
    console.log("Received calculator submission:", submission);

    // Store in database
    const { data, error: dbError } = await supabase
      .from("calculator_submissions")
      .insert({
        name: submission.name,
        phone: submission.phone || null,
        functie: submission.functie,
        company: submission.company,
        employees: submission.employees,
        avg_employee_costs: submission.avgEmployeeCosts,
        current_absenteeism: submission.currentAbsenteeism,
        current_turnover: submission.currentTurnover,
        calculation_results: submission.calculationResults,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Successfully stored submission in database:", data);

    // Send email notification
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Nieuwe Calculator Besparing Aanvraag</h2>
        
        <h3>Contactgegevens:</h3>
        <ul>
          <li><strong>Naam:</strong> ${submission.name}</li>
          <li><strong>Telefoon:</strong> ${submission.phone || 'Niet opgegeven'}</li>
          <li><strong>Functie:</strong> ${submission.functie}</li>
          <li><strong>Bedrijf:</strong> ${submission.company}</li>
        </ul>
        
        <h3>Bedrijfsgegevens:</h3>
        <ul>
          <li><strong>Aantal medewerkers:</strong> ${submission.employees}</li>
          <li><strong>Gem. werkgeverskosten per jaar:</strong> €${submission.avgEmployeeCosts.toLocaleString()}</li>
          <li><strong>Huidig verzuimpercentage:</strong> ${submission.currentAbsenteeism}%</li>
          <li><strong>Huidig verlooppercentage:</strong> ${submission.currentTurnover}%</li>
        </ul>
        
        <h3>Berekende Resultaten:</h3>
        <ul>
          <li><strong>Verzuimbesparing:</strong> €${submission.calculationResults.verzuimBesparing?.toLocaleString() || 0}</li>
          <li><strong>Retentiebesparing:</strong> €${submission.calculationResults.retentieBesparing?.toLocaleString() || 0}</li>
          <li><strong>Totale besparing:</strong> €${submission.calculationResults.totalSaving?.toLocaleString() || 0}</li>
          <li><strong>Bruto besparing:</strong> €${submission.calculationResults.grossSaving?.toLocaleString() || 0}</li>
          <li><strong>ROI:</strong> ${submission.calculationResults.roi || 0}%</li>
          <li><strong>Aantal groepen benodigd:</strong> ${submission.calculationResults.numberOfGroups || 0}</li>
          <li><strong>Totale investering:</strong> €${submission.calculationResults.investment?.toLocaleString() || 0}</li>
        </ul>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
          <img src="https://7f1b052b-e2ee-419a-aec0-e4591c9e4afe.lovableproject.com/lovable-uploads/07c13706-b4be-4b0a-8b50-701bd69610fc.png" 
               alt="Bas van der Ven" 
               style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
          <div>
            <p style="margin: 0; font-weight: bold; color: #333;">Bas van der Ven</p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Oprichter Halt.academy</p>
          </div>
        </div>
        
        <p style="margin-top: 20px;"><em>Ingediend op: ${new Date().toLocaleString('nl-NL')}</em></p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "HALT Academy <onboarding@resend.dev>",
      to: ["info@halt.academy"],
      subject: `Nieuwe Calculator Aanvraag - ${submission.company}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: data }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-calculator function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
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
