-- Add CNH details to instructors table
ALTER TABLE public.instructors 
ADD COLUMN IF NOT EXISTS cnh_number TEXT,
ADD COLUMN IF NOT EXISTS cnh_category TEXT,
ADD COLUMN IF NOT EXISTS cnh_issue_state TEXT,
ADD COLUMN IF NOT EXISTS detran_registry_number TEXT; -- CFI
