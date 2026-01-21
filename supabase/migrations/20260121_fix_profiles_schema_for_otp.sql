-- FIX: Profiles Schema for Phone Auth

-- Use a DO block to safely apply schema changes
DO $$ 
BEGIN 
    -- 1. Ensure 'phone' column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'phone') THEN 
        ALTER TABLE public.profiles ADD COLUMN phone TEXT; 
    END IF;

    -- 2. Ensure 'email' column is nullable (Crucial for Phone Auth)
    -- We can just execute this, it's idempotent-ish (if already nullable, it's fine)
    ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

EXCEPTION
    WHEN OTHERS THEN 
        RAISE NOTICE 'Schema update executed with potential warnings: %', SQLERRM;
END $$;

-- 3. Redefine the Trigger Function with explicit error handling
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Insert the new profile
  -- We use NULLIF/COALESCE to handle data defensively
  INSERT INTO public.profiles (id, email, phone, full_name, avatar_url, role)
  VALUES (
    NEW.id, 
    NEW.email, -- Can be NULL now
    NEW.phone, -- Can be NULL or value
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Capture and log detailed error
  RAISE LOG 'CRITICAL ERROR in handle_new_user. Error: %. Data: %', SQLERRM, NEW;
  -- Fail the transaction with a clear message including the SQL error
  RAISE EXCEPTION 'Database Error detected: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
