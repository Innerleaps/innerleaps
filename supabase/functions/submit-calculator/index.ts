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

    // Send confirmation email to the user
    const confirmationEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">Bedankt voor uw interesse!</h1>
          <p style="color: #666; font-size: 16px;">We hebben uw besparingsberekening ontvangen</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-bottom: 15px;">Uw berekende besparing</h2>
          <div style="display: flex; gap: 20px; margin-bottom: 15px;">
            <div style="flex: 1; text-align: center; padding: 15px; background-color: white; border-radius: 6px;">
              <div style="font-size: 24px; font-weight: bold; color: #059669;">€${submission.calculationResults.totalSaving?.toLocaleString() || 0}</div>
              <div style="font-size: 14px; color: #666;">Netto jaarlijkse besparing</div>
            </div>
            <div style="flex: 1; text-align: center; padding: 15px; background-color: white; border-radius: 6px;">
              <div style="font-size: 24px; font-weight: bold; color: #059669;">${submission.calculationResults.roi || 0}%</div>
              <div style="font-size: 14px; color: #666;">ROI</div>
            </div>
          </div>
          <div style="text-align: center; padding: 15px; background-color: white; border-radius: 6px;">
            <div style="font-size: 18px; font-weight: bold; color: #2563eb;">${submission.calculationResults.numberOfGroups || 0} groep${submission.calculationResults.numberOfGroups !== 1 ? 'en' : ''}</div>
            <div style="font-size: 14px; color: #666;">Benodigde MBSR-groepen</div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e293b; margin-bottom: 15px;">Wat nu?</h3>
          <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            Ik neem binnen 24 uur contact met u op om deze resultaten persoonlijk toe te lichten en te bespreken 
            hoe we deze besparing voor ${submission.company} kunnen realiseren.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Heeft u vragen of wilt u eerder contact? Bel of mail mij gerust.
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="https://7f1b052b-e2ee-419a-aec0-e4591c9e4afe.lovableproject.com/lovable-uploads/07c13706-b4be-4b0a-8b50-701bd69610fc.png" 
                 alt="Bas van der Ven" 
                 style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
            <div>
              <p style="margin: 0; font-weight: bold; color: #1e293b;">Bas van der Ven</p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Oprichter Halt.academy</p>
              <p style="margin: 5px 0 0 0; color: #2563eb; font-size: 14px;">
                <a href="mailto:bas@haltacademy.nl" style="color: #2563eb; text-decoration: none;">bas@haltacademy.nl</a> | 
                <a href="tel:+31612345678" style="color: #2563eb; text-decoration: none;">06 12345678</a>
              </p>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px;">
            © ${new Date().getFullYear()} Halt.academy - Mindfulness-Based Stress Reduction voor organisaties
          </p>
        </div>
      </div>
    `;

    // Send notification email to Bas (keep existing functionality)
    const notificationEmailHtml = `
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

    // Send both emails
    try {
      // Send confirmation email to user
      const confirmationResponse = await resend.emails.send({
        from: "Bas van der Ven - HALT Academy <bas@haltacademy.nl>",
        to: [submission.name.includes('@') ? submission.name : `${submission.name}@${submission.company.toLowerCase().replace(/\s+/g, '')}.nl`],
        subject: `Uw besparingsberekening voor ${submission.company}`,
        html: confirmationEmailHtml,
      });

      console.log("Confirmation email sent successfully:", confirmationResponse);

      // Send notification email to Bas
      const notificationResponse = await resend.emails.send({
        from: "HALT Academy Calculator <bas@haltacademy.nl>",
        to: ["bas@haltacademy.nl"],
        subject: `Nieuwe Calculator Aanvraag - ${submission.company}`,
        html: notificationEmailHtml,
      });

      console.log("Notification email sent successfully:", notificationResponse);

    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't throw error here - we want to continue even if email fails
    }

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
