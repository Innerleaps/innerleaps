
-- Create table to store calculator submissions
CREATE TABLE public.calculator_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  functie TEXT NOT NULL,
  company TEXT NOT NULL,
  employees INTEGER NOT NULL,
  avg_employee_costs INTEGER NOT NULL,
  current_absenteeism DECIMAL NOT NULL,
  current_turnover DECIMAL NOT NULL,
  calculation_results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.calculator_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (since this is a public form)
CREATE POLICY "Anyone can submit calculator data" 
  ON public.calculator_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading submissions (for potential admin access later)
CREATE POLICY "Anyone can view calculator submissions" 
  ON public.calculator_submissions 
  FOR SELECT 
  USING (true);
