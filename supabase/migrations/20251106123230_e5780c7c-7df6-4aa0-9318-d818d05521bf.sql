-- Create program_registrations table
CREATE TABLE IF NOT EXISTS public.program_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Persoonlijke informatie
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_date DATE NOT NULL,
  
  -- Registratie type en gerelateerde info
  registration_type TEXT NOT NULL CHECK (registration_type IN ('particulier', 'zakelijk')),
  address TEXT NOT NULL,
  company_name TEXT,
  department_cost_center TEXT,
  additional_info TEXT,
  
  -- Programma details
  selected_timeslot TEXT NOT NULL,
  program_type TEXT NOT NULL CHECK (program_type IN ('prestatie', 'stress-management')),
  
  -- Voorwaarden
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.program_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public registration)
CREATE POLICY "Allow anonymous inserts" 
ON public.program_registrations 
FOR INSERT 
TO anon
WITH CHECK (true);

-- No public read access (only service role)
CREATE POLICY "No public read access" 
ON public.program_registrations 
FOR SELECT 
TO anon
USING (false);

-- No updates allowed
CREATE POLICY "No updates allowed" 
ON public.program_registrations 
FOR UPDATE 
TO anon
USING (false);

-- No deletes allowed
CREATE POLICY "No deletes allowed" 
ON public.program_registrations 
FOR DELETE 
TO anon
USING (false);

-- Index voor email lookups
CREATE INDEX idx_program_registrations_email ON public.program_registrations(email);
CREATE INDEX idx_program_registrations_created_at ON public.program_registrations(created_at DESC);