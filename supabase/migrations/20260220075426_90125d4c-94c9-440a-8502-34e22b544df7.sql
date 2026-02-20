SELECT cron.schedule(
  'keep-alive-weekly',
  '0 12 */5 * *',
  $$
  SELECT net.http_post(
    url := 'https://bvvzmprtuzdvvosaenbs.supabase.co/functions/v1/keep-alive',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dnptcHJ0dXpkdnZvc2FlbmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjQ1NzUsImV4cCI6MjA2Njk0MDU3NX0.rj9abnsDxw4HbNGiL3gpSyJrQI1h-5GLiikrVW_1t0w"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);