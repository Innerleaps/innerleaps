-- Add language column to stress_questionnaire_submissions table
ALTER TABLE public.stress_questionnaire_submissions
ADD COLUMN language TEXT DEFAULT 'nl';

-- Add comment for documentation
COMMENT ON COLUMN public.stress_questionnaire_submissions.language IS 'Language of the questionnaire submission (nl or en)';