
-- Forcefully remove ALL policies on vehicles table to ensure clean slate
DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'vehicles' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.vehicles', pol.policyname);
    END LOOP;
END $$;

-- Enable RLS just in case
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Re-create granular policies for Instructors
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

-- Verify policy creation (Audit Log in Console if run manually)
SELECT * FROM pg_policies WHERE tablename = 'vehicles';
