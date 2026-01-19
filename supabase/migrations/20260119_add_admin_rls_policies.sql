-- Allow Admins to view ALL Instructors (including pending/suspended)
CREATE POLICY "Admins view all instructors" ON public.instructors
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Allow Admins to update Instructors (e.g. approve/suspend)
CREATE POLICY "Admins update all instructors" ON public.instructors
FOR UPDATE USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Allow Admins to view ALL Documents
CREATE POLICY "Admins view all documents" ON public.documents
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Allow Admins to update (reject/verify) Documents
CREATE POLICY "Admins update all documents" ON public.documents
FOR UPDATE USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Allow Admins to view ALL Vehicles
CREATE POLICY "Admins view all vehicles" ON public.vehicles
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Allow Admins to view ALL Profiles (already public read, but ensuring for update if needed)
CREATE POLICY "Admins update all profiles" ON public.profiles
FOR UPDATE USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
