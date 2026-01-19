-- Add superpowers to instructors
ALTER TABLE public.instructors 
ADD COLUMN IF NOT EXISTS superpowers TEXT[];

-- Add features to vehicles
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS features TEXT[];
