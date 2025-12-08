import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod validation schema for program registration
const ProgramRegistrationSchema = z.object({
  fullName: z.string().trim().min(1, "Naam is verplicht").max(100, "Naam mag maximaal 100 tekens bevatten"),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255, "E-mail mag maximaal 255 tekens bevatten"),
  phone: z.string().trim().min(1, "Telefoonnummer is verplicht").max(20, "Telefoonnummer mag maximaal 20 tekens bevatten").regex(/^[+]?[\d\s\-()]+$/, "Ongeldig telefoonnummer formaat"),
  birthDay: z.string().regex(/^\d{1,2}$/, "Ongeldige dag"),
  birthMonth: z.string().regex(/^\d{1,2}$/, "Ongeldige maand"),
  birthYear: z.string().regex(/^\d{4}$/, "Ongeldig jaar"),
  registrationType: z.enum(["particulier", "zakelijk"], { errorMap: () => ({ message: "Ongeldig registratietype" }) }),
  address: z.string().trim().min(1, "Adres is verplicht").max(500, "Adres mag maximaal 500 tekens bevatten"),
  companyName: z.string().trim().max(200, "Bedrijfsnaam mag maximaal 200 tekens bevatten").optional().nullable(),
  departmentCostCenter: z.string().trim().max(100, "Afdeling/kostenplaats mag maximaal 100 tekens bevatten").optional().nullable(),
  additionalInfo: z.string().trim().max(1000, "Aanvullende informatie mag maximaal 1000 tekens bevatten").optional().nullable(),
  selectedTimeslot: z.string().trim().min(1, "Startdatum is verplicht").max(100, "Startdatum mag maximaal 100 tekens bevatten"),
  programType: z.enum(["prestatie", "stress-management"], { errorMap: () => ({ message: "Ongeldig programmatype" }) }),
  agreedToTerms: z.literal(true, { errorMap: () => ({ message: "Je moet akkoord gaan met de algemene voorwaarden" }) }),
});

type ProgramRegistrationRequest = z.infer<typeof ProgramRegistrationSchema>;

// HTML escape function to prevent XSS
function escapeHtml(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const rawData = await req.json();

    // Validate input with Zod schema
    const parseResult = ProgramRegistrationSchema.safeParse(rawData);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0];
      console.error("Validation error:", parseResult.error.errors);
      throw new Error(firstError.message || "Ongeldige invoergegevens");
    }

    const data = parseResult.data;
    console.log("Received registration:", { email: data.email, programType: data.programType });

    // Construct birth date
    const birthDate = new Date(
      parseInt(data.birthYear),
      parseInt(data.birthMonth) - 1,
      parseInt(data.birthDay)
    );

    if (isNaN(birthDate.getTime())) {
      throw new Error("Ongeldige geboortedatum");
    }

    // Additional validation: birth date should be in the past
    if (birthDate >= new Date()) {
      throw new Error("Geboortedatum moet in het verleden liggen");
    }

    // Additional validation: company name required for zakelijk
    if (data.registrationType === "zakelijk" && (!data.companyName || data.companyName.trim() === "")) {
      throw new Error("Bedrijfsnaam is verplicht bij aanmelding via werkgever");
    }

    // Rate limiting check - max 3 aanmeldingen per email per uur
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const { data: recentSubmissions, error: rateLimitError } = await supabase
      .from("program_registrations")
      .select("id")
      .eq("email", data.email.toLowerCase())
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
      .eq("email", data.email.toLowerCase())
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
      email: data.email.toLowerCase(),
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

    // Escape user data for HTML emails
    const safeFullName = escapeHtml(data.fullName);
    const safeEmail = escapeHtml(data.email);
    const safePhone = escapeHtml(data.phone);
    const safeAddress = escapeHtml(data.address);
    const safeCompanyName = escapeHtml(data.companyName);
    const safeDepartmentCostCenter = escapeHtml(data.departmentCostCenter);
    const safeAdditionalInfo = escapeHtml(data.additionalInfo);
    const safeSelectedTimeslot = escapeHtml(data.selectedTimeslot);

    // Email naar deelnemer
    const programName = data.programType === "prestatie" ? "Prestatie Programma" : "Stress-Management Programma";
    const registrationTypeText = data.registrationType === "particulier" ? "Particulier" : "Via Werkgever";

    const participantEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hoi ${safeFullName},</p>
  
  <p>We hebben je aanmelding ontvangen voor het <strong>${programName}</strong>.</p>
  
  <p><strong>Jouw gegevens:</strong></p>
  <p>Naam: ${safeFullName}</p>
  <p>Email: ${safeEmail}</p>
  <p>Telefoon: ${safePhone}</p>
  <p>Geboortedatum: ${birthDate.toLocaleDateString("nl-NL")}</p>
  <p>Adres: ${safeAddress}</p>
  ${data.registrationType === "zakelijk" ? `
  <p>Bedrijf: ${safeCompanyName || "Niet opgegeven"}</p>
  ${data.departmentCostCenter ? `<p>Afdeling/Kostenplaats: ${safeDepartmentCostCenter}</p>` : ""}
  ` : ""}
  <p>Type aanmelding: ${registrationTypeText}</p>
  <p>Startdatum: ${safeSelectedTimeslot}</p>
  ${data.additionalInfo ? `<p>Aanvullende informatie: ${safeAdditionalInfo}</p>` : ""}
  
  <p>De factuur wordt binnenkort verstuurd. Het verzoek is om binnen 14 dagen de factuur te betalen.</p>
  
  <p>Het programma vindt plaats gedurende 6 opeenvolgende weken. Op nationale feestdagen zal de cursus niet plaatsvinden. Mocht je onverhoopt een sessie missen dan zal je de opname ontvangen.</p>
  
  <p>Heb je vragen? Neem gerust contact op via <a href="mailto:bas@innerleaps.nl">bas@innerleaps.nl</a></p>
  
  <p>Met vriendelijke groet,<br>Bas ter Haar Romenij<br>InnerLeaps</p>
</body>
</html>
`;

    const { error: participantEmailError } = await resend.emails.send({
      from: "InnerLeaps <info@innerleaps.nl>",
      to: [data.email],
      subject: `Bevestiging aanmelding ${programName}`,
      html: participantEmailHtml,
      replyTo: "bas@innerleaps.nl",
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
    <p><strong>Naam:</strong> ${safeFullName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Telefoon:</strong> ${safePhone}</p>
    <p><strong>Geboortedatum:</strong> ${birthDate.toLocaleDateString("nl-NL")}</p>
    <p><strong>Adres:</strong> ${safeAddress}</p>
    <p><strong>Programma:</strong> ${programName}</p>
    <p><strong>Startdatum:</strong> ${safeSelectedTimeslot}</p>
    <p><strong>Type aanmelding:</strong> ${registrationTypeText}</p>
    ${data.registrationType === "zakelijk" ? `
    <p><strong>Bedrijf:</strong> ${safeCompanyName || "Niet opgegeven"}</p>
    ${data.departmentCostCenter ? `<p><strong>Afdeling/Kostenplaats:</strong> ${safeDepartmentCostCenter}</p>` : ""}
    ` : ""}
    ${data.additionalInfo ? `<p><strong>Aanvullende informatie:</strong> ${safeAdditionalInfo}</p>` : ""}
  </div>
</body>
</html>
`;

    const { error: adminEmailError } = await resend.emails.send({
      from: "InnerLeaps <info@innerleaps.nl>",
      to: ["bas@innerleaps.nl"],
      subject: `[ADMIN] Nieuwe aanmelding: ${programName} - ${safeFullName}`,
      html: adminEmailHtml,
      replyTo: data.email,
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
