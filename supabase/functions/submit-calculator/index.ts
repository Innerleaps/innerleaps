import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalculatorSubmission {
  name: string;
  email: string;
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
        email: submission.email,
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

    // More transactional confirmation email
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Uw aangevraagde berekening - HALT Academy</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #ffffff;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                
                <!-- Simple Header -->
                <tr>
                  <td style="padding: 30px; text-align: left; border-bottom: 1px solid #e2e8f0;">
                    <h1 style="margin: 0; color: #1e293b; font-size: 20px; font-weight: 600;">
                      Uw berekening voor ${submission.company}
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
                      Zoals aangevraagd hebben wij uw kostenbesparingsberekening uitgevoerd.
                    </p>
                  </td>
                </tr>
                
                <!-- Results Section -->
                <tr>
                  <td style="padding: 30px;">
                    <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px;">
                      Beste ${submission.name},
                    </p>
                    
                    <p style="margin: 0 0 20px 0; color: #374151; font-size: 14px; line-height: 1.6;">
                      Hierbij ontvangt u de resultaten van uw kostenbesparingsberekening zoals u deze heeft aangevraagd via onze website.
                    </p>
                    
                    <h2 style="margin: 20px 0 15px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                      Berekende resultaten voor ${submission.company}:
                    </h2>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; border: 1px solid #e2e8f0;">
                      <tr style="background-color: #f8fafc;">
                        <td style="padding: 12px; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Jaarlijkse netto besparing</td>
                        <td style="padding: 12px; color: #059669; font-weight: 600; font-size: 14px; border-bottom: 1px solid #e2e8f0;">€${submission.calculationResults.totalSaving?.toLocaleString('nl-NL') || 0}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px; color: #374151; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Return on Investment</td>
                        <td style="padding: 12px; color: #2563eb; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${submission.calculationResults.roi || 0}%</td>
                      </tr>
                      <tr style="background-color: #f8fafc;">
                        <td style="padding: 12px; color: #374151; font-size: 14px;">Benodigde groepen</td>
                        <td style="padding: 12px; color: #374151; font-size: 14px;">${submission.calculationResults.numberOfGroups || 0}</td>
                      </tr>
                    </table>
                    
                    <p style="margin: 20px 0 15px 0; color: #374151; font-size: 14px; line-height: 1.6;">
                      Ik neem binnen 24 uur contact met u op om deze resultaten persoonlijk toe te lichten.
                    </p>
                    
                    <div style="background-color: #f1f5f9; padding: 15px; margin: 20px 0; border-left: 3px solid #2563eb;">
                      <p style="margin: 0; color: #475569; font-size: 14px; font-style: italic;">
                        "Wij vinden het echt ontzettend gaaf om organisaties fitter te zien worden. HALT helpt ${submission.company} graag verder"
                      </p>
                    </div>
                    
                    <p style="margin: 20px 0 0 0; color: #374151; font-size: 14px;">
                      Voor vragen kunt u contact opnemen via onderstaande gegevens.
                    </p>
                  </td>
                </tr>
                
                <!-- Contact Section -->
                <tr>
                  <td style="padding: 20px 30px; border-top: 1px solid #e2e8f0; background-color: #f8fafc;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-right: 15px; vertical-align: top;">
                          <img src="https://7f1b052b-e2ee-419a-aec0-e4591c9e4afe.lovableproject.com/lovable-uploads/dea9200c-b881-4007-bd3b-c07db498ca17.png" 
                               alt="Bas Ter Haar Romenij" 
                               style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; display: block;">
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-weight: 600; color: #1e293b; font-size: 14px;">
                            Bas Ter Haar Romenij
                          </p>
                          <p style="margin: 2px 0; color: #64748b; font-size: 13px;">
                            HALT Academy
                          </p>
                          <p style="margin: 5px 0 0 0; font-size: 13px;">
                            <a href="mailto:bas@haltacademy.nl" style="color: #2563eb; text-decoration: none;">bas@haltacademy.nl</a>
                            <span style="color: #64748b;"> | </span>
                            <a href="tel:+31623453477" style="color: #2563eb; text-decoration: none;">06 23453477</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Simple Footer -->
                <tr>
                  <td style="padding: 15px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                    HALT Academy - ${new Date().getFullYear()}
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Improved notification email for Bas
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nieuwe Calculator Aanvraag</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #f8f9fa;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px;">
                
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px;">Nieuwe Calculator Besparing Aanvraag</h2>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Contactgegevens:</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Naam:</strong> ${submission.name}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>E-mail:</strong> ${submission.email}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Telefoon:</strong> ${submission.phone || 'Niet opgegeven'}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Functie:</strong> ${submission.functie}</td></tr>
                      <tr><td style="padding: 5px 0;"><strong>Bedrijf:</strong> ${submission.company}</td></tr>
                    </table>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Bedrijfsgegevens:</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Aantal medewerkers:</strong> ${submission.employees}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Gem. werkgeverskosten per jaar:</strong> €${submission.avgEmployeeCosts.toLocaleString('nl-NL')}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Huidig verzuimpercentage:</strong> ${submission.currentAbsenteeism}%</td></tr>
                      <tr><td style="padding: 5px 0;"><strong>Huidig verlooppercentage:</strong> ${submission.currentTurnover}%</td></tr>
                    </table>
                    
                    <h3 style="margin: 20px 0 10px 0; color: #374151; font-size: 16px;">Berekende Resultaten:</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Verzuimbesparing:</strong> €${submission.calculationResults.verzuimBesparing?.toLocaleString('nl-NL') || 0}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Retentiebesparing:</strong> €${submission.calculationResults.retentieBesparing?.toLocaleString('nl-NL') || 0}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Totale besparing:</strong> €${submission.calculationResults.totalSaving?.toLocaleString('nl-NL') || 0}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Bruto besparing:</strong> €${submission.calculationResults.grossSaving?.toLocaleString('nl-NL') || 0}</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>ROI:</strong> ${submission.calculationResults.roi || 0}%</td></tr>
                      <tr><td style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;"><strong>Aantal groepen benodigd:</strong> ${submission.calculationResults.numberOfGroups || 0}</td></tr>
                      <tr><td style="padding: 5px 0;"><strong>Totale investering:</strong> €${submission.calculationResults.investment?.toLocaleString('nl-NL') || 0}</td></tr>
                    </table>
                    
                    <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="padding-right: 15px; vertical-align: top;">
                            <img src="https://7f1b052b-e2ee-419a-aec0-e4591c9e4afe.lovableproject.com/lovable-uploads/dea9200c-b881-4007-bd3b-c07db498ca17.png" 
                                 alt="Bas Ter Haar Romenij" 
                                 style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; display: block;">
                          </td>
                          <td style="vertical-align: top;">
                            <p style="margin: 0; font-weight: 600; color: #333333;">Bas Ter Haar Romenij</p>
                            <p style="margin: 5px 0 0 0; color: #666666; font-size: 14px;">Oprichter HALT Academy</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px;">
                      <em>Ingediend op: ${new Date().toLocaleString('nl-NL')}</em>
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send both emails with improved headers for inbox placement
    try {
      // Send confirmation email to lead with transactional headers
      const confirmationResponse = await resend.emails.send({
        from: "Bas Ter Haar Romenij <bas@haltacademy.nl>",
        to: [submission.email],
        subject: `Uw kostenbesparingsberekening voor ${submission.company}`,
        html: confirmationEmailHtml,
        headers: {
          'X-Entity-Ref-ID': Math.random().toString(36).substring(7),
          'List-Unsubscribe': '<mailto:bas@haltacademy.nl?subject=unsubscribe>',
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          'Precedence': 'bulk',
          'X-Auto-Response-Suppress': 'OOF, DR, RN, NRN, AutoReply',
        },
        tags: [
          { name: 'category', value: 'transactional' },
          { name: 'type', value: 'calculation-results' }
        ],
      });

      console.log("Confirmation email sent successfully:", confirmationResponse);

      // Send notification email to Bas
      const notificationResponse = await resend.emails.send({
        from: "HALT Academy Calculator <bas@haltacademy.nl>",
        to: ["bas@haltacademy.nl"],
        subject: `Nieuwe Calculator Aanvraag - ${submission.company}`,
        html: notificationEmailHtml,
        headers: {
          'X-Entity-Ref-ID': Math.random().toString(36).substring(7),
        },
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
