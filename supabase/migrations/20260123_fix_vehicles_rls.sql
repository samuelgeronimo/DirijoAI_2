-- Allow public read access to vehicles so students can see instructor cars
CREATE POLICY "Public view vehicles" ON public.vehicles FOR SELECT USING (true);
