-- SEED DATA for Dirijo.ai
-- This script populates the database with the "Live" data seen in the prototypes.

-- 1. PROFILES (Admin, Roberto, Lucas, Mariana)
-- Note: In a real seed, we need valid UUIDs. We'll use static UUIDs for consistency.

-- Admin
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
('00000000-0000-0000-0000-000000000001', 'admin@dirijo.ai', '{"full_name": "Admin Suporte"}')
ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, email, role, full_name, avatar_url) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@dirijo.ai', 'admin', 'Admin Suporte', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKe6c_JpyyMKrEYaKTVEylKsWmnavNFBJGFgCnvXjo6Y2QqTTyDXGtzAoci9t6AzTXTjUnNg8m_UwEn-Bb8JcF7ZdUVXBFfsVRtCaTtUox683WeXs-ZMK0WDEobLib-Qk_tP_hC6PPojzfRctiX7t73g3PW2ypUdC0JkCTvtE7Pa3lgxgnnQNAhRQ5g5RTwh8NzpCnp_WPiofI-T0OhIWqnU_abJEd8-WGRXZxWbs3VgUV5KKCS9bseKH0VVoaDw_YPLzgyLKapj2n')
ON CONFLICT DO NOTHING;

-- Instructor: Roberto Alves
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
('00000000-0000-0000-0000-000000000002', 'roberto@dirijo.ai', '{"full_name": "Roberto Alves"}')
ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, email, role, full_name, avatar_url, reputation_score) VALUES
('00000000-0000-0000-0000-000000000002', 'roberto@dirijo.ai', 'instructor', 'Roberto Alves', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhveIWxQIb5Hyv62x3fu07zqsMkw3Mka1-K7A6fRhWvqOP6dmUEuus3eauD9SJyqcMu3vxDF7NedEKW4qBP7dz6HNe0_GGG5HKsZ9X3aXn7mHsf44t9aOFPqwA9xsPFKTmpccBG56Xukz5tmwzT0QANjRkZxIRluJPI_X694Mjry2IU0VY91yUdcJiHR__1B14bj9WuSZkvRVfuGDuSDLLixGWFvje5mtWJRvHK88CEdWff80peaDJPxSmOfHw369E41S1wYTAeRog', 100)
ON CONFLICT DO NOTHING;

INSERT INTO public.instructors (id, balance_cents, status, rating, bio, city, state, neighborhood) VALUES
('00000000-0000-0000-0000-000000000002', 1450230, 'active', 4.9, 'Instrutor experiente com foco em direção defensiva.', 'São Paulo', 'SP', 'Vila Madalena')
ON CONFLICT DO NOTHING;

-- Student: Lucas F.
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
('00000000-0000-0000-0000-000000000003', 'lucas@gmail.com', '{"full_name": "Lucas F."}')
ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, email, role, full_name, avatar_url) VALUES
('00000000-0000-0000-0000-000000000003', 'lucas@gmail.com', 'student', 'Lucas F.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKEFq8q7-p4Sp5lGFh3X7cgUOPr72pHkggse-zXs405ZtnVOR_vloiCbqFA_dV_71nUiyV31_JoqBStntglWCqDXwXBnAgobDHqToGxxrnjOKTbh4kR6YTTCS4QasZF4L0gcZEIJoZ6sC9QWWSIutP7nLu0JXcYtN0zttnM-tdH_OhYtWMpw4QNiqn0z7GnRjzxSEgJsXMy6cZISrbwlgZO8mOwg_OgDJVMBd0u29Yik2GO-kWASBezY0g_dwuFPA_FBOr2-LV8Zf2')
ON CONFLICT DO NOTHING;


-- 2. OPERATIONS (Vehicles, Lessons, Reviews, Availability)
INSERT INTO public.vehicles (id, instructor_id, model, brand, year, plate, color) VALUES
('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'HB20', 'Hyundai', 2024, 'ABC-1234', 'Branco')
ON CONFLICT DO NOTHING;

INSERT INTO public.instructor_availability (instructor_id, day_of_week, start_time, end_time) VALUES
('00000000-0000-0000-0000-000000000002', 1, '08:00', '18:00'), -- Monday
('00000000-0000-0000-0000-000000000002', 2, '08:00', '18:00'), -- Tuesday
('00000000-0000-0000-0000-000000000002', 3, '08:00', '18:00'), -- Wednesday
('00000000-0000-0000-0000-000000000002', 4, '08:00', '18:00'), -- Thursday
('00000000-0000-0000-0000-000000000002', 5, '08:00', '18:00'); 
-- Note: removed "ON CONFLICT" for bulk insert or handle it better, but for seed it's fine if table is empty. 
-- Actually for multiple rows, ON CONFLICT works if the constraint is there. ID is PK. I didn't verify ID conflict here because I'm not providing IDs for availability. 
-- It's safer to just let it insert or use simple inserts.

INSERT INTO public.reviews (student_id, instructor_id, rating, comment) VALUES
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 5, 'Excelente instrutor! Muito paciente e didático.');

INSERT INTO public.lessons (id, student_id, instructor_id, vehicle_id, scheduled_at, status, price_cents, pickup_address) VALUES
('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', NOW() - INTERVAL '1 day', 'disputed', 8000, 'Rua das Flores, 123')
ON CONFLICT DO NOTHING;

-- 2.5 FINANCE (The Bank Mock Data)
-- Roberto Payout
INSERT INTO public.payouts (instructor_id, amount_cents, status, created_at) VALUES
('00000000-0000-0000-0000-000000000002', 125000, 'requested', NOW() - INTERVAL '2 hours');

-- Mariana Costa (High Risk)
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
('00000000-0000-0000-0000-000000000004', 'mariana@dirijo.ai', '{"full_name": "Mariana Costa"}')
ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, email, role, full_name, avatar_url) VALUES
('00000000-0000-0000-0000-000000000004', 'mariana@dirijo.ai', 'instructor', 'Mariana Costa', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIeFdvMq7WnuMunUEsP17hIlbzMYL_LoobHqGJMnORKBDFUMxMVGyHsd-1fFgwB-8STXa_lrsgkT-qncrVDDHw4Rmqv_S0IFtvqAfTeTRYo6aLdf5hhOeLL9Vg7I6hzf9hlsit-TVdOqNJzE2XgnJTAelYfLkwkOGL5QozPidaA_OrA8X7JpV4EvZ3pj75D031z58GXKbG8VcsXtILxURyzIx0Bn5RUfVYvfSzZOgk0VBdLxQD5l6VOOYsKIYYzQ_-oVcunCdIDAHu')
ON CONFLICT DO NOTHING;

INSERT INTO public.instructors (id, balance_cents, status, rating) VALUES
('00000000-0000-0000-0000-000000000004', 489000, 'active', 2.4)
ON CONFLICT DO NOTHING;

INSERT INTO public.payouts (instructor_id, amount_cents, status, risk_score, risk_notes, created_at) VALUES
('00000000-0000-0000-0000-000000000004', 489000, 'risk_check', 85, 'Valor Alto + Múltiplas Disputas', NOW() - INTERVAL '5 hours');

-- 3. DISPUTES (Tribunal Mock Data)
-- Roberto vs Lucas
WITH dispute_insert AS (
    INSERT INTO public.disputes (id, instructor_id, student_id, lesson_id, status, reason, created_at) VALUES
    ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000006', 'analyzing', 'No-show', NOW() - INTERVAL '1 day')
    RETURNING id
)
INSERT INTO public.dispute_messages (dispute_id, sender_id, content, created_at) VALUES
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000003', 'O instrutor não apareceu no ponto de encontro combinado. Esperei 15 minutos.', NOW() - INTERVAL '23 hours'),
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', 'Eu estava lá! Aqui está a foto do local na hora marcada.', NOW() - INTERVAL '22 hours');


-- 4. GROWTH (Coupons & Upsells)
INSERT INTO public.coupons (code, type, value, rules) VALUES
('VEMDIRIGIR', 'percentage', 10, '{"first_purchase": true}'),
('PACOTE10', 'fixed', 5000, '{"min_items": 10}');

INSERT INTO public.order_bumps (name, description, price_cents, type, conversion_rate) VALUES
('Manual Anti-Reprovação', 'E-book PDF', 2990, 'ebook', 32.4),
('Seguro VIP (Reagendamento)', 'Serviço Add-on', 4990, 'service', 18.7),
('Pacote: Aula Extra Noturna', 'Aula Avulsa', 8990, 'class_pack', 45.2);
