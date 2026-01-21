-- Create success_stories table for Instructor Success Wall
CREATE TABLE public.success_stories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    instructor_id UUID REFERENCES public.instructors(id) ON DELETE CASCADE NOT NULL,
    photo_url TEXT NOT NULL,
    student_name TEXT NOT NULL,
    badge TEXT NOT NULL, -- 'first_try', 'perfect_parking', 'fear_lost', '20_lessons'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Success Stories
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- Public can view success stories
CREATE POLICY "Public view success stories" ON public.success_stories FOR SELECT USING (true);

-- Instructors can manage their own success stories
CREATE POLICY "Instructors manage own stories" ON public.success_stories FOR ALL USING (auth.uid() = instructor_id);
