-- Make personal details optional in stress_questionnaire_submissions table
ALTER TABLE stress_questionnaire_submissions 
  ALTER COLUMN naam DROP NOT NULL,
  ALTER COLUMN email DROP NOT NULL,
  ALTER COLUMN organisatie DROP NOT NULL;