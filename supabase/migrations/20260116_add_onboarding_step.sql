ALTER TABLE public.instructors ADD COLUMN current_onboarding_step INT DEFAULT 2;
-- Default is 2 because if the record exists (created in Step 1), they are at least ready for Step 2.
