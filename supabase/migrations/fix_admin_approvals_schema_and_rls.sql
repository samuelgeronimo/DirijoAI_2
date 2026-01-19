-- 1. Ensure column exists (Safe to run multiple times)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'instructors' AND column_name = 'current_onboarding_step') THEN
        ALTER TABLE public.instructors ADD COLUMN current_onboarding_step INT DEFAULT 2;
    END IF;
END $$;

-- 2. Ensure RLS Policies for Admin exist (Drop and Recreate to be sure)
DROP POLICY IF EXISTS "Admins view all instructors" ON public.instructors;
CREATE POLICY "Admins view all instructors" ON public.instructors
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins update all instructors" ON public.instructors;
CREATE POLICY "Admins update all instructors" ON public.instructors
FOR UPDATE USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins view all documents" ON public.documents;
CREATE POLICY "Admins view all documents" ON public.documents
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins update all documents" ON public.documents;
CREATE POLICY "Admins update all documents" ON public.documents
FOR UPDATE USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins view all vehicles" ON public.vehicles;
CREATE POLICY "Admins view all vehicles" ON public.vehicles
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins view all profiles" ON public.profiles;
CREATE POLICY "Admins view all profiles" ON public.profiles
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 3. Check if the user is actually admin
-- (Optional: You can run this SELECT separately to verify your own user)
-- SELECT email, role FROM public.profiles;
