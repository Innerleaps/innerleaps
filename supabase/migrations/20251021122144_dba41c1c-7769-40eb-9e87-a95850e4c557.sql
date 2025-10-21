-- Remove old check constraints that are causing issues
ALTER TABLE stress_questionnaire_submissions
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q1_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q2_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q3_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q4_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q5_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q6_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q7_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q8_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q9_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_q10_check,
  DROP CONSTRAINT IF EXISTS stress_questionnaire_submissions_total_score_check;

-- Add back the correct constraints
ALTER TABLE stress_questionnaire_submissions
  ADD CONSTRAINT stress_questionnaire_submissions_q1_check CHECK (q1 >= 0 AND q1 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q2_check CHECK (q2 >= 0 AND q2 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q3_check CHECK (q3 >= 0 AND q3 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q4_check CHECK (q4 >= 0 AND q4 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q5_check CHECK (q5 >= 0 AND q5 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q6_check CHECK (q6 >= 0 AND q6 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q7_check CHECK (q7 >= 0 AND q7 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q8_check CHECK (q8 >= 0 AND q8 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q9_check CHECK (q9 >= 0 AND q9 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_q10_check CHECK (q10 >= 0 AND q10 <= 4),
  ADD CONSTRAINT stress_questionnaire_submissions_total_score_check CHECK (total_score >= 0 AND total_score <= 40);