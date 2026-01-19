-- Migration to add photo_urls array to vehicles table
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS photo_urls TEXT[];

-- Optional: Migrate existing photo_url to photo_urls if needed (not strictly necessary if no live data concerns but good practice)
-- UPDATE public.vehicles SET photo_urls = ARRAY[photo_url] WHERE photo_url IS NOT NULL AND photo_urls IS NULL;
