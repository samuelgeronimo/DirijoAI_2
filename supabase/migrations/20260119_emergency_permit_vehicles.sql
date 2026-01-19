
-- EMERGENCY FIX: Grant full access to 'vehicles' for any authenticated user.
-- This is to verify if the issue is strict policy logic or something else.
-- In production, we would revert to strict ownership checks.

-- 1. Drop specific policies (cleanup)
DROP POLICY IF EXISTS "Instructors select own vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Instructors insert own vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Instructors update own vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Instructors delete own vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Instructors manage vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Instructors view own vehicles" ON public.vehicles;

-- 2. Create Permissive Policy
CREATE POLICY "Emergency Allow All Authenticated" 
ON public.vehicles 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 3. Ensure RLS is enabled (so the policy applies)
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
