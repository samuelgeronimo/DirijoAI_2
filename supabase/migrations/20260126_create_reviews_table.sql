-- Create Reviews Table
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    instructor_id UUID REFERENCES public.instructors(id) NOT NULL,
    order_id UUID REFERENCES public.orders(id), -- Optional link to specific order, but good for verification
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one review per order (if order_id present)
    UNIQUE(student_id, order_id)
);

-- RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Students can insert their own reviews
CREATE POLICY "Students create own reviews" ON public.reviews 
    FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Everyone can read reviews (Public profiles)
CREATE POLICY "Public read reviews" ON public.reviews 
    FOR SELECT USING (true);

-- Instructors read reviews about themselves
CREATE POLICY "Instructors read own reviews" ON public.reviews 
    FOR SELECT USING (instructor_id = (SELECT id FROM public.instructors WHERE id = auth.uid()));
