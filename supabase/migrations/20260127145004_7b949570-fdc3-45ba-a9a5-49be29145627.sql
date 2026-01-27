-- Create table for keep-alive activity logs
CREATE TABLE public.keep_alive_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'alive'
);

-- Enable RLS
ALTER TABLE public.keep_alive_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert (edge function uses service role)
CREATE POLICY "Service role can insert keep-alive logs"
ON public.keep_alive_logs
FOR INSERT
WITH CHECK (true);

-- Allow service role to delete old logs (cleanup)
CREATE POLICY "Service role can delete old logs"
ON public.keep_alive_logs
FOR DELETE
USING (created_at < now() - interval '30 days');

-- No public read access
CREATE POLICY "No public read access"
ON public.keep_alive_logs
FOR SELECT
USING (false);