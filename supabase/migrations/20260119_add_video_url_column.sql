
-- Add video_url column to instructors table to store presentation video
ALTER TABLE public.instructors 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Optional: Add column for video upload status if we want async processing later
-- ADD COLUMN IF NOT EXISTS video_status TEXT DEFAULT 'uploaded'; 
