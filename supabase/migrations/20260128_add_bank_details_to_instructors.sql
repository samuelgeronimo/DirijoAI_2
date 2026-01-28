-- Add bank details columns to instructors table
ALTER TABLE public.instructors 
ADD COLUMN IF NOT EXISTS bank_name TEXT,
ADD COLUMN IF NOT EXISTS account_number TEXT,
ADD COLUMN IF NOT EXISTS agency_number TEXT,
ADD COLUMN IF NOT EXISTS account_type TEXT;

-- Update RLS if needed (already set to allow instructors to update their own data)
-- CREATE POLICY "Instructors update own bank data" ON public.instructors FOR UPDATE USING (auth.uid() = id);
-- This is already covered by the existing "Instructors update own data" policy.
