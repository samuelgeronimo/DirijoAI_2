DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'instructors' AND column_name = 'current_onboarding_step') THEN
        ALTER TABLE public.instructors ADD COLUMN current_onboarding_step INT DEFAULT 2;
    END IF;
END $$;
-- Default is 2 because if the record exists (created in Step 1), they are at least ready for Step 2.
