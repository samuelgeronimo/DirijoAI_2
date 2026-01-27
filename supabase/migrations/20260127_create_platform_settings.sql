-- Create platform_settings table
-- This table stores global platform configuration

CREATE TABLE IF NOT EXISTS public.platform_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings
CREATE POLICY "Public read platform settings" ON public.platform_settings 
    FOR SELECT USING (true);

-- Only admins can modify settings
CREATE POLICY "Admins modify platform settings" ON public.platform_settings 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Insert default take rate if not exists
INSERT INTO public.platform_settings (key, value, description)
VALUES (
    'platform_take_rate',
    '{"percentage": 15}'::jsonb,
    'Porcentagem de comissão da plataforma por aula'
)
ON CONFLICT (key) DO NOTHING;

COMMENT ON TABLE public.platform_settings IS 'Global platform configuration settings';
