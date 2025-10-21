-- Create stress questionnaire submissions table
CREATE TABLE public.stress_questionnaire_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  naam text NOT NULL,
  email text NOT NULL,
  organisatie text NOT NULL,
  q1 integer NOT NULL CHECK (q1 >= 0 AND q1 <= 3),
  q2 integer NOT NULL CHECK (q2 >= 0 AND q2 <= 3),
  q3 integer NOT NULL CHECK (q3 >= 0 AND q3 <= 3),
  q4 integer NOT NULL CHECK (q4 >= 0 AND q4 <= 3),
  q5 integer NOT NULL CHECK (q5 >= 0 AND q5 <= 3),
  q6 integer NOT NULL CHECK (q6 >= 0 AND q6 <= 3),
  q7 integer NOT NULL CHECK (q7 >= 0 AND q7 <= 3),
  q8 integer NOT NULL CHECK (q8 >= 0 AND q8 <= 3),
  q9 integer NOT NULL CHECK (q9 >= 0 AND q9 <= 3),
  q10 integer NOT NULL CHECK (q10 >= 0 AND q10 <= 3),
  total_score integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stress_questionnaire_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: No public read access
CREATE POLICY "No public read access to stress questionnaire" 
ON public.stress_questionnaire_submissions
FOR SELECT
USING (false);

-- RLS Policy: Allow anonymous inserts only
CREATE POLICY "Allow anonymous inserts" 
ON public.stress_questionnaire_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- RLS Policy: No updates allowed
CREATE POLICY "No updates allowed" 
ON public.stress_questionnaire_submissions
FOR UPDATE
USING (false);

-- RLS Policy: No deletes allowed
CREATE POLICY "No deletes allowed" 
ON public.stress_questionnaire_submissions
FOR DELETE
USING (false);