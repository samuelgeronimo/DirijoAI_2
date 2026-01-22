-- Relax uniqueness on vehicles.plate to allow different instructors to share a plate (e.g., family car, or system error prevention)
-- But enforce (instructor_id, plate) uniqueness so an instructor doesn't duplicate their own car.

-- 1. Drop existing global unique constraint on plate
ALTER TABLE public.vehicles DROP CONSTRAINT IF EXISTS vehicles_plate_key;

-- 2. Add composite unique constraint
ALTER TABLE public.vehicles ADD CONSTRAINT vehicles_instructor_id_plate_key UNIQUE (instructor_id, plate);
