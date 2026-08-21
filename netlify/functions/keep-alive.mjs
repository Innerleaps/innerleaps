/**
 * Houdt het gratis Supabase-project wakker.
 *
 * Waarom dit hier staat en niet in Supabase zelf:
 * er stond een pg_cron-job in de database die precies dit deed. Die werkte
 * niet. In cron.job_run_details was te zien dat hij van 6 april tot 16 mei
 * 2026 netjes draaide en daarna 97 dagen niets deed. Reden: toen het project
 * pauzeerde stopte pg_cron ook, en dan kan die job zichzelf nooit meer wekken.
 * De wekker stond in het gebouw dat hij wakker moest maken.
 *
 * Deze functie draait bij Netlify, dus buiten Supabase. Pauzeert het project
 * toch een keer, dan blijft deze gewoon kloppen en zie je dat in de logs.
 *
 * Let op: een ping voorkomt de pauze, maar heft hem niet op. Staat een project
 * eenmaal uit, dan moet je het handmatig herstellen in het Supabase-dashboard.
 */

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://bvvzmprtuzdvvosaenbs.supabase.co";

// De anon key is een publieke sleutel. Hij staat ook in de browserbundel.
// Zet SUPABASE_ANON_KEY in de Netlify-omgevingsvariabelen als je hem ooit
// vervangt, dan hoeft deze code niet mee te veranderen.
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dnptcHJ0dXpkdnZvc2FlbmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjQ1NzUsImV4cCI6MjA2Njk0MDU3NX0.rj9abnsDxw4HbNGiL3gpSyJrQI1h-5GLiikrVW_1t0w";

const TIMEOUT_MS = 20000;

export default async () => {
  const url = `${SUPABASE_URL}/functions/v1/keep-alive`;
  const startedAt = Date.now();

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: "{}",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    // Netwerkfout of timeout. Vaak betekent dit dat het project al slaapt.
    console.error("keep-alive MISLUKT: Supabase niet bereikbaar.", error);
    return new Response(`Supabase niet bereikbaar: ${error.message}`, {
      status: 500,
    });
  }

  const body = await response.text();
  const duration = Date.now() - startedAt;

  if (!response.ok) {
    console.error(
      `keep-alive MISLUKT: Supabase gaf status ${response.status} na ${duration}ms.`,
      body,
    );
    return new Response(`Supabase gaf status ${response.status}`, {
      status: 500,
    });
  }

  console.log(`keep-alive gelukt in ${duration}ms.`, body);
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// Elke dag om 06:00 UTC. Supabase pauzeert na 7 dagen stilte, dus dit geeft
// zes dagen speling in plaats van de ene dag die de oude cron had.
export const config = {
  schedule: "0 6 * * *",
};
