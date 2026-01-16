-- Redefine the function to include 'role' from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student') -- Cast to enum, default to student
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix the specific user you just created (optional but helpful if we knew the ID, but here we can update based on recent creation or logic)
-- Since we don't have the ID, we can do a general update for anyone in 'instructors' table but who is 'student' in 'profiles'
UPDATE public.profiles
SET role = 'instructor'
WHERE id IN (SELECT id FROM public.instructors) AND role = 'student';
