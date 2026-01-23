-- Add updated_at column to vehicles table
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_vehicles_modtime 
BEFORE UPDATE ON public.vehicles 
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
