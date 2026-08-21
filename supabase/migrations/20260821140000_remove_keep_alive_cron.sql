-- Haalt de keep-alive uit Supabase weg. Hij draait nu bij Netlify,
-- in netlify/functions/keep-alive.mjs.
--
-- Waarom weg: de cron draaide binnen de database die hij wakker moest
-- houden. In cron.job_run_details was te zien dat hij van 6 april tot
-- 16 mei 2026 netjes liep en daarna 97 dagen stilstond. Zodra het
-- project pauzeerde stopte pg_cron mee, en dan wekt niemand hem meer.
--
-- De tabel keep_alive_logs blijft staan. Daar schrijft de Netlify-functie
-- nog steeds naartoe, via dezelfde edge function.

-- 1. De geplande job weghalen.
select cron.unschedule('keep-alive-daily');

-- 2. pg_cron weg. Niets anders in dit project gebruikt het.
--    Let op: hiermee verdwijnt ook de draaihistorie in cron.job_run_details.
drop extension if exists pg_cron;

-- 3. pg_net laten we met opzet staan.
--
--    Supabase gebruikt pg_net ook voor Database Webhooks, en die worden in
--    het dashboard aangemaakt en niet in migraties. Ze zijn hier dus niet
--    te zien. Weghalen zonder te kijken kan stilletjes iets slopen.
--
--    Controleer eerst of er webhooks bestaan:
--
--      select event_object_table, trigger_name
--      from information_schema.triggers
--      where action_statement ilike '%supabase_functions%'
--         or action_statement ilike '%net.http%';
--
--    Komt daar niets uit, dan mag dit erbij:
--
--      drop extension if exists pg_net;
