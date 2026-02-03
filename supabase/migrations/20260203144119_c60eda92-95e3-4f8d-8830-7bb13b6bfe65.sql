-- Fix keep_alive_logs: Block anonymous inserts (service role bypasses RLS anyway)
DROP POLICY IF EXISTS "Service role can insert keep-alive logs" ON public.keep_alive_logs;

-- Create a policy that blocks all non-service-role inserts
-- Service role automatically bypasses RLS, so this effectively restricts to service role only
CREATE POLICY "No anonymous inserts to keep-alive logs" 
ON public.keep_alive_logs 
FOR INSERT 
WITH CHECK (false);