-- Add service_city column
ALTER TABLE public.instructors 
ADD COLUMN service_city TEXT;

-- Backfill service_city with existing city values (assuming current data represents service city mostly)
UPDATE public.instructors
SET service_city = city;

-- Make sure RLS policies allow reading service_city (Standard SELECT includes all columns usually)
