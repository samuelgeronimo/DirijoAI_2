-- 1. Fix RLS: Allow instructors to create their own record
-- Without this, the frontend 'upsert' fails locally
DROP POLICY IF EXISTS "Instructors insert own data" ON public.instructors;
CREATE POLICY "Instructors insert own data" ON public.instructors FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Backfill missing instructors
-- Find profiles with role 'instructor' that DO NOT have a corresponding row in 'instructors' table
-- and insert them with default values.
INSERT INTO public.instructors (id, status, current_onboarding_step, balance_cents)
SELECT id, 'pending_docs', 2, 0
FROM public.profiles
WHERE role = 'instructor'
AND NOT EXISTS (SELECT 1 FROM public.instructors WHERE instructors.id = profiles.id);
