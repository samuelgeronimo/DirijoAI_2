-- Drop the trigger first to ensure clean replacement (optional but good practice if changing signature/type, though here we just replace function)
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Robust handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  valid_role user_role;
BEGIN
  -- Determine role safely without casting errors
  IF NEW.raw_user_meta_data->>'role' = 'instructor' THEN
    valid_role := 'instructor';
  ELSIF NEW.raw_user_meta_data->>'role' = 'admin' THEN
    valid_role := 'admin';
  ELSE
    valid_role := 'student';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    valid_role
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url);
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
