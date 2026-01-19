-- Substitua 'SEU_EMAIL_AQUI' pelo email do usuário que você quer tornar admin
-- Ou substitua o ID se souber o UUID específico

UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@dirijo.com.br'; -- Exemplo

-- Para verificar quem é admin:
-- SELECT * FROM public.profiles WHERE role = 'admin';
