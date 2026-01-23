-- Add transmission column to vehicles table
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS transmission text DEFAULT 'manual';

-- Comment on column
COMMENT ON COLUMN public.vehicles.transmission IS 'manual or automatic';
