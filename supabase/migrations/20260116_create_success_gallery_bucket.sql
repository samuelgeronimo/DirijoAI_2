-- Create 'success_gallery' bucket for instructor success history photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('success_gallery', 'success_gallery', true)
ON CONFLICT (id) DO NOTHING;

-- RLS POLICIES for success_gallery

CREATE POLICY "Allow authenticated uploads to success_gallery"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'success_gallery');

CREATE POLICY "Allow public read access to success_gallery"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'success_gallery');

CREATE POLICY "Allow owners to update/delete their own success_gallery items"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'success_gallery' AND auth.uid()::text = (storage.foldername(name))[1]);
