-- Update calculator_submissions table to support ROI Calculator fields

-- Add new columns if they don't exist
ALTER TABLE calculator_submissions 
  ADD COLUMN IF NOT EXISTS number_of_employees INTEGER,
  ADD COLUMN IF NOT EXISTS avg_gross_annual_salary NUMERIC,
  ADD COLUMN IF NOT EXISTS employee_turnover NUMERIC;

-- Make old columns nullable for backward compatibility
ALTER TABLE calculator_submissions 
  ALTER COLUMN employees DROP NOT NULL,
  ALTER COLUMN avg_employee_costs DROP NOT NULL,
  ALTER COLUMN current_turnover DROP NOT NULL;

-- Add comment explaining the fields
COMMENT ON COLUMN calculator_submissions.number_of_employees IS 'Number of employees for ROI Calculator';
COMMENT ON COLUMN calculator_submissions.avg_gross_annual_salary IS 'Average gross annual salary per employee for ROI Calculator';
COMMENT ON COLUMN calculator_submissions.employee_turnover IS 'Employee turnover percentage for ROI Calculator';
COMMENT ON COLUMN calculator_submissions.employees IS 'Number of employees (legacy field for old calculators)';
COMMENT ON COLUMN calculator_submissions.avg_employee_costs IS 'Average employee costs (legacy field for old calculators)';
COMMENT ON COLUMN calculator_submissions.current_turnover IS 'Current turnover percentage (legacy field for old calculators)';