-- Enable Phone Auth support for public.profiles

-- 1. Add phone column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Make email nullable (since phone users might not have email)
ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

-- 3. Update handle_new_user to handle phone number and null email
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, email, phone, full_name, avatar_url, role)
    VALUES (
      NEW.id, 
      NEW.email, 
      NEW.phone,
      NEW.raw_user_meta_data->>'full_name', 
      NEW.raw_user_meta_data->>'avatar_url',
      COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
    );
  EXCEPTION WHEN OTHERS THEN
    -- Log the error detail to Postgres logs (visible in Supabase Dashboard)
    RAISE LOG 'Error in handle_new_user: %. User Data: %', SQLERRM, NEW;
    -- Re-raise the error so the auth transaction still fails (or return NEW to allow auth but skip profile)
    RAISE EXCEPTION 'Database error saving new user: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
