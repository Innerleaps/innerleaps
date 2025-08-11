-- Remove the overly permissive SELECT policy that allows anyone to view calculator submissions
DROP POLICY IF EXISTS "Anyone can view calculator submissions" ON public.calculator_submissions;

-- Create a new policy that restricts SELECT access to prevent public access to sensitive customer data
-- This removes public access to email addresses, phone numbers, names, and company information
CREATE POLICY "No public read access to calculator submissions" 
ON public.calculator_submissions 
FOR SELECT 
USING (false);

-- Keep the INSERT policy as is, since the calculator form needs to accept submissions
-- The INSERT policy "Anyone can submit calculator data" remains unchanged