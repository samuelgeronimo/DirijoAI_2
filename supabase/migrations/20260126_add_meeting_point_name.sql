-- Add meeting_point_name to instructors
ALTER TABLE public.instructors 
ADD COLUMN IF NOT EXISTS meeting_point_name TEXT;

COMMENT ON COLUMN public.instructors.meeting_point_name IS 'A nickname or descriptive name for the instructor''s meeting point (e.g., Posto Ipiranga, Em frente ao Metro)';
