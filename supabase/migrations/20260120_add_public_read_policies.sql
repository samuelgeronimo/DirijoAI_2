-- Enable public read access for instructor interactions
-- This is necessary for the public search and profile pages to work correctly for unauthenticated users

-- 1. Public Read for Instructors (if not already strictly enabled, usually safe for public profiles)
CREATE POLICY "Public read access for instructors" 
ON public.instructors FOR SELECT 
USING (true);

-- 2. Public Read for Vehicles
CREATE POLICY "Public read access for vehicles" 
ON public.vehicles FOR SELECT 
USING (true);

-- 3. Public Read for Instructor Availability
CREATE POLICY "Public read access for availability" 
ON public.instructor_availability FOR SELECT 
USING (true);

-- 4. Public Read for Profiles (Names/Avatars)
-- Often profiles table has strict RLS. We ensure public can read basic info.
CREATE POLICY "Public read access for profiles" 
ON public.profiles FOR SELECT 
USING (true);
