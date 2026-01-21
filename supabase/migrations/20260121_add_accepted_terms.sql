-- Add accepted_terms column to instructors table
ALTER TABLE public.instructors 
ADD COLUMN IF NOT EXISTS accepted_terms BOOLEAN DEFAULT FALSE;
