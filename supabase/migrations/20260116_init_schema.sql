-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ROLES & ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'instructor', 'student');
CREATE TYPE instructor_status AS ENUM ('pending_docs', 'active', 'suspended');
CREATE TYPE doc_type AS ENUM ('cnh', 'crlv', 'background_check', 'dispute_evidence');
CREATE TYPE doc_status AS ENUM ('pending', 'valid', 'rejected');
CREATE TYPE transaction_type AS ENUM ('credit', 'debit');
CREATE TYPE payout_status AS ENUM ('requested', 'risk_check', 'approved', 'paid', 'rejected');
CREATE TYPE dispute_status AS ENUM ('open', 'analyzing', 'resolved');
CREATE TYPE dispute_verdict AS ENUM ('student_fault', 'instructor_fault', 'force_majeure');
CREATE TYPE coupon_type AS ENUM ('percentage', 'fixed');

-- 1. PROFILES (Core Identity)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'student',
    full_name TEXT,
    avatar_url TEXT,
    reputation_score INT DEFAULT 100, -- Gamification score
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. INSTRUCTORS (Operations)
CREATE TABLE public.instructors (
    id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    cpf TEXT UNIQUE,
    phone TEXT,
    bio TEXT,
    pix_key TEXT,
    balance_cents BIGINT DEFAULT 0, -- Stored in cents to avoid floating point errors
    status instructor_status DEFAULT 'pending_docs',
    rating NUMERIC(3, 2) DEFAULT 5.00,
    
    -- Address Data
    street TEXT,
    number TEXT,
    complement TEXT,
    neighborhood TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Instructors
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active instructors" ON public.instructors FOR SELECT USING (status = 'active');
CREATE POLICY "Instructors view own data" ON public.instructors FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Instructors update own data" ON public.instructors FOR UPDATE USING (auth.uid() = id);

-- 3. DOCUMENTS (Polymorphic)
CREATE TABLE public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type doc_type NOT NULL,
    url TEXT NOT NULL,
    status doc_status DEFAULT 'pending',
    metadata JSONB DEFAULT '{}'::jsonb, -- Store extra data like OCR results
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view own documents" ON public.documents FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners upload documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- 3.5 VEHICLES (Instructor Car)
CREATE TABLE public.vehicles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    instructor_id UUID REFERENCES public.instructors(id) ON DELETE CASCADE NOT NULL,
    model TEXT NOT NULL,
    brand TEXT NOT NULL,
    year INT NOT NULL,
    plate TEXT UNIQUE NOT NULL,
    color TEXT,
    photo_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Instructors view own vehicles" ON public.vehicles FOR SELECT USING (auth.uid() = instructor_id);
CREATE POLICY "Instructors manage vehicles" ON public.vehicles FOR ALL USING (auth.uid() = instructor_id);

-- 3.6 LESSONS (The Core Product)
CREATE TYPE lesson_status AS ENUM ('scheduled', 'in_progress', 'completed', 'canceled', 'no_show', 'disputed');

CREATE TABLE public.lessons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    instructor_id UUID REFERENCES public.instructors(id) NOT NULL,
    vehicle_id UUID REFERENCES public.vehicles(id),
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INT DEFAULT 50,
    status lesson_status DEFAULT 'scheduled',
    price_cents BIGINT NOT NULL,
    
    -- Location Data
    pickup_address TEXT,
    pickup_lat NUMERIC,
    pickup_lng NUMERIC,
    
    -- Metadata
    student_notes TEXT,
    instructor_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Lessons
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view their lessons" ON public.lessons FOR SELECT USING (auth.uid() = student_id OR auth.uid() = instructor_id);

-- 3.7 REVIEWS (Reputation)
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lesson_id UUID REFERENCES public.lessons(id), -- Optional, allowing reviews without explicit lesson link if needed (but prefer linked)
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    instructor_id UUID REFERENCES public.instructors(id) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Students write reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = student_id);

-- 3.8 AVAILABILITY (Schedule Slots)
CREATE TABLE public.instructor_availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    instructor_id UUID REFERENCES public.instructors(id) ON DELETE CASCADE NOT NULL,
    day_of_week INT CHECK (day_of_week >= 0 AND day_of_week <= 6) NOT NULL, -- 0 = Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Availability
ALTER TABLE public.instructor_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view availability" ON public.instructor_availability FOR SELECT USING (true);
CREATE POLICY "Instructors manage availability" ON public.instructor_availability FOR ALL USING (auth.uid() = instructor_id);

-- 4. FINANCE (Double-Entry Ledger Lite)
CREATE TABLE public.ledger_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) NOT NULL,
    amount_cents BIGINT NOT NULL, -- Positive for credit, negative for debit
    operation_type transaction_type NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'payout', 'lesson_fee', 'bonus'
    metadata JSONB DEFAULT '{}'::jsonb, -- Audit trail (who triggered it, reference IDs)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Ledger
ALTER TABLE public.ledger_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own ledger" ON public.ledger_entries FOR SELECT USING (auth.uid() = profile_id);

-- Payout Workflow
CREATE TABLE public.payouts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    instructor_id UUID REFERENCES public.instructors(id) NOT NULL,
    amount_cents BIGINT NOT NULL,
    status payout_status DEFAULT 'requested',
    risk_score INT DEFAULT 0, -- 0-100 (High score = high risk)
    risk_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- RLS: Payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Instructors view own payouts" ON public.payouts FOR SELECT USING (auth.uid() = instructor_id);
CREATE POLICY "Instructors request payouts" ON public.payouts FOR INSERT WITH CHECK (auth.uid() = instructor_id);

-- 5. DISPUTES (Tribunal)
CREATE TABLE public.disputes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    instructor_id UUID REFERENCES public.instructors(id) NOT NULL,
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id), -- Linked to the lesson table now
    status dispute_status DEFAULT 'open',
    reason TEXT NOT NULL, -- "No-show", "Harassment", "Quality"
    verdict dispute_verdict,
    admin_notes TEXT,
    sla_deadline TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat for Disputes
CREATE TABLE public.dispute_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    dispute_id UUID REFERENCES public.disputes(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) NOT NULL,
    content TEXT NOT NULL,
    evidence_url TEXT, -- Optional image/video
    is_system_message BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Disputes
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispute_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants view disputes" ON public.disputes FOR SELECT USING (auth.uid() = instructor_id OR auth.uid() = student_id);
CREATE POLICY "Participants view messages" ON public.dispute_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.disputes WHERE id = dispute_id AND (instructor_id = auth.uid() OR student_id = auth.uid()))
);

-- 6. GROWTH ENGINE
CREATE TABLE public.coupons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    type coupon_type NOT NULL,
    value NUMERIC NOT NULL, -- Percentage (10) or Amount (2000 cents)
    rules JSONB DEFAULT '{}'::jsonb, -- { "min_lessons": 5, "first_purchase": true }
    uses INT DEFAULT 0,
    max_uses INT,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.order_bumps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price_cents BIGINT NOT NULL,
    type TEXT NOT NULL, -- 'ebook', 'priority'
    conversion_rate NUMERIC(5,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE
);

-- RLS: Growth (Public read for coupons/bumps to apply them)
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_bumps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view coupons" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Public view bumps" ON public.order_bumps FOR SELECT USING (is_active = true);


-- TRIGGERS & FUNCTIONS

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_instructors_modtime BEFORE UPDATE ON public.instructors FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create Profile on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
