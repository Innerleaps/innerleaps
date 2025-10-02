-- Remove the permissive INSERT policy that allows anyone to insert directly
DROP POLICY IF EXISTS "Anyone can submit calculator data" ON calculator_submissions;

-- Create a restrictive policy that only allows inserts from service role
-- This ensures all submissions MUST go through the edge function with rate limiting
CREATE POLICY "Only service role can insert submissions"
ON calculator_submissions
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

-- Add policies for admin management (fixes the second security finding)
-- Only authenticated users can update (you can restrict this further to admin role later)
CREATE POLICY "Service role can update submissions"
ON calculator_submissions
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- Only authenticated users can delete (you can restrict this further to admin role later)
CREATE POLICY "Service role can delete submissions"
ON calculator_submissions
FOR DELETE
TO authenticated
USING (false);