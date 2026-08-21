-- Keep-alive van wekelijks naar dagelijks.
--
-- De oude planning stond op '0 12 */5 * *'. Dat leest als "elke 5 dagen",
-- maar zo werkt cron niet. Het betekent: op dag 1, 6, 11, 16, 21 en 26 van
-- de maand. Aan het eind van een maand van 31 dagen zit er 6 dagen tussen
-- twee pings. Supabase pauzeert een gratis project na 7 dagen zonder
-- activiteit. Er zat dus nog maar één dag speling, en één mislukte ping
-- betekende meteen een gat van 11 dagen.
--
-- Dagelijks om 12:00 UTC geeft 6 dagen speling in plaats van 1.

select cron.unschedule('keep-alive-weekly');

select cron.schedule(
  'keep-alive-daily',
  '0 12 * * *',
  $$
  select net.http_post(
    url := 'https://bvvzmprtuzdvvosaenbs.supabase.co/functions/v1/keep-alive',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dnptcHJ0dXpkdnZvc2FlbmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjQ1NzUsImV4cCI6MjA2Njk0MDU3NX0.rj9abnsDxw4HbNGiL3gpSyJrQI1h-5GLiikrVW_1t0w"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);
