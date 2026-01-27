-- Add hourly_rate_cents to instructor_availability
ALTER TABLE public.instructor_availability 
ADD COLUMN IF NOT EXISTS hourly_rate_cents INTEGER DEFAULT 8500; -- Default 85.00

-- Optional: Add base_hourly_rate check constraint or keeping it flexible
-- Validation to ensure non-negative
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'check_positive_rate') THEN
        ALTER TABLE public.instructor_availability ADD CONSTRAINT check_positive_rate CHECK (hourly_rate_cents >= 0);
    END IF;
END $$;
