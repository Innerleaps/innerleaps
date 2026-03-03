

# Fix: Automate Keep-Alive to Prevent Database Pausing

## Problem
The `keep-alive` Edge Function exists but is never called automatically. The `pg_cron` extension is not enabled, so no scheduled job runs. The `keep_alive_logs` table has only 1 entry from a single manual test on January 27th.

## Solution

### Step 1: Enable Required Extensions
Run a database migration to enable `pg_cron` and `pg_net` extensions, which are needed for scheduling HTTP calls from within Postgres.

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
```

### Step 2: Schedule a Weekly Cron Job
Use `pg_cron` to schedule a weekly call to the `keep-alive` Edge Function. The job will run every 5 days (well within the 7-day inactivity window) to provide a safety margin.

```sql
SELECT cron.schedule(
  'keep-alive-weekly',
  '0 12 */5 * *',  -- every 5 days at noon UTC
  $$
  SELECT net.http_post(
    url := 'https://bvvzmprtuzdvvosaenbs.supabase.co/functions/v1/keep-alive',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer <anon_key>"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
```

### Step 3: No Code Changes Needed
The existing Edge Function already performs an INSERT (using the service role key, which bypasses RLS) and cleans up old logs. It just needs to be called regularly.

## Technical Details
- The cron schedule `0 12 */5 * *` means "at 12:00 UTC on every 5th day" -- this ensures at least one database write per week
- The Edge Function inserts a row into `keep_alive_logs` and deletes rows older than 30 days, so the table stays small
- `pg_net` allows making HTTP requests from within Postgres, which is how the cron job triggers the Edge Function

