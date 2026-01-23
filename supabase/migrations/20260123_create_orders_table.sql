-- Create Orders Table
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'canceled', 'refunded');

CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    instructor_id UUID REFERENCES public.instructors(id) NOT NULL,
    plan_name TEXT NOT NULL,
    lessons_count INT NOT NULL,
    amount_cents BIGINT NOT NULL,
    status order_status DEFAULT 'pending',
    metadata JSONB DEFAULT '{}'::jsonb, -- Store details like manual included, manual price, etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Students can view their own orders and create them
CREATE POLICY "Students view own orders" ON public.orders FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Instructors can view orders assigned to them
CREATE POLICY "Instructors view assigned orders" ON public.orders FOR SELECT USING (auth.uid() = instructor_id);

-- Admins can view all orders (assuming admin check uses public.profiles.role or similar function not shown here, 
-- but traditionally admins have bypass or we add a policy using is_admin() function if exist)
-- Adding a generic policy for now if we rely on service_role for admin dashboard, 
-- otherwise we need to check the 'admin' role in profiles.
CREATE POLICY "Admins view all orders" ON public.orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
