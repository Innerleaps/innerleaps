-- Make functie column nullable for backwards compatibility
-- This allows new submissions without functie field while preserving old data
ALTER TABLE calculator_submissions 
ALTER COLUMN functie DROP NOT NULL;

-- Add comment to indicate field is deprecated
COMMENT ON COLUMN calculator_submissions.functie IS 'DEPRECATED: Field no longer collected from calculator forms since Nov 2025';