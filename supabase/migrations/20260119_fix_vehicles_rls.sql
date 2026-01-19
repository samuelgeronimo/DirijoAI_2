
-- Fix RLS policies for vehicles table to explicitly allow INSERTs
-- The previous 'ALL' policy might have been restrictive or ambiguous for inserts.

DROP POLICY IF EXISTS "Instructors manage vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Instructors view own vehicles" ON public.vehicles;

-- Re-create granular policies
CREATE POLICY "Instructors select own vehicles" 
ON public.vehicles FOR SELECT 
USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors insert own vehicles" 
ON public.vehicles FOR INSERT 
WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors update own vehicles" 
ON public.vehicles FOR UPDATE 
USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors delete own vehicles" 
ON public.vehicles FOR DELETE 
USING (auth.uid() = instructor_id);
