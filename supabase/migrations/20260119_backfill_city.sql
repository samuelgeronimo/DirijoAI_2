-- Backfill City to 'São Paulo' for existing instructors where it is null
UPDATE public.instructors
SET city = 'São Paulo'
WHERE city IS NULL;
