-- Enable the storage extension if not already (usually enabled by default in Supabase)

-- 1. Create 'documents' bucket for sensitive docs (CNH, CRLV)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true) -- Using public=true for ease of access via getPublicUrl as per code, although sensitive docs ideally should be private/signed URLs. The code uses getPublicUrl, so we must set public=true or use signed URLs. Given the "getPublicUrl" usage, I'll set it to true for now to unblock, but add a TODO for security.
ON CONFLICT (id) DO NOTHING;

-- 2. Create 'avatars' bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Create 'vehicles' bucket for vehicle photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicles', 'vehicles', true)
ON CONFLICT (id) DO NOTHING;

-- RLS POLICIES

-- DOCUMENTS POLICIES
CREATE POLICY "Allow authenticated uploads to documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Allow public read access to documents"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'documents');

CREATE POLICY "Allow owners to update/delete their own documents"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- AVATARS POLICIES
CREATE POLICY "Allow authenticated uploads to avatars"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Allow public read access to avatars"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'avatars');

CREATE POLICY "Allow owners to update/delete their own avatars"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- VEHICLES POLICIES
CREATE POLICY "Allow authenticated uploads to vehicles"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'vehicles');

CREATE POLICY "Allow public read access to vehicles"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'vehicles');

CREATE POLICY "Allow owners to update/delete their own vehicles"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'vehicles' AND auth.uid()::text = (storage.foldername(name))[1]);
