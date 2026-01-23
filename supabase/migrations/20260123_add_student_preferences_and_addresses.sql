-- Add JSONB columns for flexible student data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS saved_addresses JSONB DEFAULT '[]'::jsonb;

-- Comment on columns for clarity
COMMENT ON COLUMN public.profiles.preferences IS 'Stores learning preferences (e.g., fear_highway, needs_silence)';
COMMENT ON COLUMN public.profiles.saved_addresses IS 'Stores list of favorite addresses (e.g., Home, Work)';
