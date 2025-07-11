
-- Add email column to calculator_submissions table
ALTER TABLE public.calculator_submissions 
ADD COLUMN email TEXT NOT NULL DEFAULT '';

-- Update the column to remove the default after adding it
ALTER TABLE public.calculator_submissions 
ALTER COLUMN email DROP DEFAULT;
