-- Allow students to insert their own lessons (for booking flow)
CREATE POLICY "Students create lessons" ON public.lessons FOR INSERT WITH CHECK (auth.uid() = student_id);
-- Allow students to update their own lessons (for rescheduling/cancellation if needed later)
CREATE POLICY "Students update own lessons" ON public.lessons FOR UPDATE USING (auth.uid() = student_id);
