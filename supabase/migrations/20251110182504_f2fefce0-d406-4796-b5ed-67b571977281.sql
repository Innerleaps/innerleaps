-- Create table for scientific report requests
CREATE TABLE IF NOT EXISTS public.scientific_report_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text NOT NULL,
  functie text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scientific_report_requests_email 
ON public.scientific_report_requests(email);

CREATE INDEX IF NOT EXISTS idx_scientific_report_requests_created_at 
ON public.scientific_report_requests(created_at DESC);

-- Enable RLS
ALTER TABLE public.scientific_report_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (no authentication required)
CREATE POLICY "Allow anonymous inserts" 
ON public.scientific_report_requests 
FOR INSERT 
TO anon
WITH CHECK (true);

-- No public read access (only admins can view)
CREATE POLICY "No public read access" 
ON public.scientific_report_requests 
FOR SELECT 
TO anon
USING (false);

-- No updates allowed
CREATE POLICY "No updates allowed" 
ON public.scientific_report_requests 
FOR UPDATE 
TO anon
USING (false);

-- No deletes allowed
CREATE POLICY "No deletes allowed" 
ON public.scientific_report_requests 
FOR DELETE 
TO anon
USING (false);