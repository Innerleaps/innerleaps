import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProgramRegistrationRequest {
  fullName: string;
  email: string;
  phone: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  registrationType: "particulier" | "zakelijk";
  address: string;
  companyName?: string;
  departmentCostCenter?: string;
  additionalInfo?: string;
  selectedTimeslot: string;
  programType: "prestatie" | "stress-management";
  agreedToTerms: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const data: ProgramRegistrationRequest = await req.json();

    console.log("Received registration:", { email: data.email, programType: data.programType });

    // Input validatie
    if (!data.fullName || !data.email || !data.phone || !data.birthDay || !data.birthMonth || !data.birthYear || !data.selectedTimeslot) {
      throw new Error("Verplichte velden ontbreken");
    }

    // Construct birth date
    const birthDate = new Date(
      parseInt(data.birthYear),
      parseInt(data.birthMonth) - 1,
      parseInt(data.birthDay)
    );

    if (isNaN(birthDate.getTime())) {
      throw new Error("Ongeldige geboortedatum");
    }

    if (data.registrationType === "zakelijk" && !data.companyName) {
      throw new Error("Bedrijfsnaam is verplicht bij zakelijke aanmelding");
    }

    if (!data.agreedToTerms) {
      throw new Error("Je moet akkoord gaan met de algemene voorwaarden");
    }

    // Rate limiting check - max 3 aanmeldingen per email per uur
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const { data: recentSubmissions, error: rateLimitError } = await supabase
      .from("program_registrations")
      .select("id")
      .eq("email", data.email)
      .gte("created_at", oneHourAgo.toISOString());

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      throw new Error("Er is een fout opgetreden bij het controleren van eerdere aanmeldingen");
    }

    if (recentSubmissions && recentSubmissions.length >= 3) {
      throw new Error("Je hebt te veel aanmeldingen gedaan. Probeer het later opnieuw.");
    }

    // Duplicate check - zelfde email + program_type binnen 24 uur
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const { data: duplicates, error: duplicateError } = await supabase
      .from("program_registrations")
      .select("id")
      .eq("email", data.email)
      .eq("program_type", data.programType)
      .gte("created_at", twentyFourHoursAgo.toISOString());

    if (duplicateError) {
      console.error("Duplicate check error:", duplicateError);
      throw new Error("Er is een fout opgetreden bij het controleren van dubbele aanmeldingen");
    }

    if (duplicates && duplicates.length > 0) {
      throw new Error("Je bent al aangemeld voor dit programma in de afgelopen 24 uur");
    }

    // Data opslaan in database
    const { error: insertError } = await supabase.from("program_registrations").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      birth_date: birthDate.toISOString(),
      registration_type: data.registrationType,
      address: data.address,
      company_name: data.companyName || null,
      department_cost_center: data.departmentCostCenter || null,
      additional_info: data.additionalInfo || null,
      selected_timeslot: data.selectedTimeslot,
      program_type: data.programType,
      agreed_to_terms: data.agreedToTerms,
    });

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Er is een fout opgetreden bij het opslaan van je aanmelding");
    }

    console.log("Registration saved successfully");

    // Email naar deelnemer
    const programName = data.programType === "prestatie" ? "Prestatie Programma" : "Stress-Management Programma";
    const registrationTypeText = data.registrationType === "particulier" ? "Particulier" : "Zakelijk";

    const participantEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hoi ${data.fullName},</p>
  
  <p>We hebben je aanmelding ontvangen voor het <strong>${programName}</strong>.</p>
  
  <p><strong>Jouw gegevens:</strong></p>
  <p>Naam: ${data.fullName}</p>
  <p>Email: ${data.email}</p>
  <p>Telefoon: ${data.phone}</p>
  <p>Geboortedatum: ${birthDate.toLocaleDateString("nl-NL")}</p>
  <p>Adres: ${data.address}</p>
  ${data.registrationType === "zakelijk" ? `
  <p>Bedrijf: ${data.companyName || "Niet opgegeven"}</p>
  ${data.departmentCostCenter ? `<p>Afdeling/Kostenplaats: ${data.departmentCostCenter}</p>` : ""}
  ` : ""}
  <p>Type aanmelding: ${registrationTypeText}</p>
  <p>Startdatum: ${data.selectedTimeslot}</p>
  ${data.additionalInfo ? `<p>Aanvullende informatie: ${data.additionalInfo}</p>` : ""}
  
  <p>De factuur wordt binnenkort verstuurd. Het verzoek is om binnen 14 dagen de factuur te betalen.</p>
  
  <p>Het programma vindt plaats gedurende 6 opeenvolgende weken. Op nationale feestdagen zal de cursus niet plaatsvinden. Mocht je onverhoopt een sessie missen dan zal je de opname ontvangen.</p>
  
  <p>Heb je vragen? Neem gerust contact op via <a href="mailto:bas@innerleaps.nl">bas@innerleaps.nl</a></p>
  
  <p>Met vriendelijke groet,<br>Bas ter Haar Romenij<br>InnerLeaps</p>
</body>
</html>
`;

    const { error: participantEmailError } = await resend.emails.send({
      from: "InnerLeaps <onboarding@resend.dev>",
      to: [data.email],
      subject: `Bevestiging aanmelding ${programName}`,
      html: participantEmailHtml,
    });

    if (participantEmailError) {
      console.error("Error sending participant email:", participantEmailError);
    } else {
      console.log("Participant email sent successfully");
    }

    // Email naar bas (admin) met alle details
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #1e293b;">Nieuwe Programma Aanmelding</h1>
  
  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0;">Deelnemer Informatie:</h3>
    <p><strong>Naam:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Telefoon:</strong> ${data.phone}</p>
    <p><strong>Geboortedatum:</strong> ${birthDate.toLocaleDateString("nl-NL")}</p>
    <p><strong>Adres:</strong> ${data.address}</p>
    <p><strong>Programma:</strong> ${programName}</p>
    <p><strong>Startdatum:</strong> ${data.selectedTimeslot}</p>
    <p><strong>Type aanmelding:</strong> ${registrationTypeText}</p>
    ${data.registrationType === "zakelijk" ? `
    <p><strong>Bedrijf:</strong> ${data.companyName || "Niet opgegeven"}</p>
    ${data.departmentCostCenter ? `<p><strong>Afdeling/Kostenplaats:</strong> ${data.departmentCostCenter}</p>` : ""}
    ` : ""}
    ${data.additionalInfo ? `<p><strong>Aanvullende informatie:</strong> ${data.additionalInfo}</p>` : ""}
  </div>
</body>
</html>
`;

    const { error: adminEmailError } = await resend.emails.send({
      from: "InnerLeaps Aanmeldingen <onboarding@resend.dev>",
      to: ["bas@innerleaps.nl"],
      subject: `[ADMIN] Nieuwe aanmelding: ${programName} - ${data.fullName}`,
      html: adminEmailHtml,
    });

    if (adminEmailError) {
      console.error("Error sending admin email:", adminEmailError);
    } else {
      console.log("Admin email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in submit-program-registration function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
