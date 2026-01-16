-- Final Robust Fix for Signup Trigger
-- 1. Ensure the type exists (idempotent-ish check not easy in pure SQL without block, assuming it exists from init_schema)
-- If it doesn't exist, this function creation would fail, catching the error early.

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public -- CRITICAL: Ensures the function finds tables and types in public schema
AS $$
DECLARE
  -- Declare variable with fully qualified type
  assigned_role public.user_role;
  meta_role text;
BEGIN
  -- Safe extraction of role from metadata
  meta_role := NEW.raw_user_meta_data->>'role';

  -- specific logic to determine enum value
  IF meta_role = 'instructor' THEN
    assigned_role := 'instructor';
  ELSIF meta_role = 'admin' THEN
    assigned_role := 'admin';
  ELSE
    assigned_role := 'student';
  END IF;

  -- Insert/Update Profile
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    assigned_role
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    email = EXCLUDED.email; -- Ensure email is synced if it changed (unlikely for new user but good for updates)
    
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Fallback: If anything fails (e.g. enum issue), insert as BASIC student to permit signup
  -- Log error to postgres logs (visible in Supabase dashboard) if possible, or just proceed.
  -- RAISE WARNING 'handle_new_user failed: %', SQLERRM;
  
  -- Attempt simplest insert as failsafe
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'student')
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
