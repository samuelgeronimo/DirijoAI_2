"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { validateFullName, validateEmail, validatePassword, formatPhone } from "@/utils/validators";

export default function InstructorLandingPage() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        service_city: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;

        if (name === 'phone') {
            value = formatPhone(value);
        }

        setFormData({ ...formData, [name]: value });

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!validateFullName(formData.fullName)) {
            newErrors.fullName = "Digite seu nome completo (mínimo 2 nomes).";
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = "E-mail inválido.";
        }

        if (formData.phone.length < 14) { // (11) 99999-9999 is 15 chars, (11) 9999-9999 is 14.
            newErrors.phone = "Telefone inválido.";
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = "Mínimo 8 caracteres, 1 maiúscula e 1 caractere especial.";
        }

        if (!termsAccepted) {
            newErrors.terms = "Você deve aceitar os termos.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const supabase = createClient();

        // 1. Sign Up
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.fullName,
                    role: 'instructor'
                }
            }
        });

        if (authError) {
            if (authError.message.includes("User already registered") || authError.status === 422) {
                setErrors(prev => ({
                    ...prev,
                    email: "E-mail já cadastrado. " // We'll render the link in the UI
                }));
            } else {
                alert("Erro ao criar conta: " + authError.message);
            }
            setLoading(false);
            return;
        }

        if (authData.user) {
            // Check if session was created. If not, it could be email verification OR user already exists.
            // We try to sign in automatically to cover the "User already exists" case or "Auto Confirm" case.
            if (!authData.session) {
                const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });

                if (signInData.session) {
                    // Success! Proceed as if signup worked immediately.
                } else {
                    // Finally, if we still have no session, it's likely Pending Email Verification.
                    alert("Conta criada! Se você não for redirecionado, por favor verifique seu e-mail para confirmar o cadastro.");
                    setLoading(false);
                    return;
                }
            }

            // 2. Ensure Profile Exists (Self-healing before Instructor creation)
            if (authData.user) {
                const { data: profile } = await supabase.from('profiles').select('id').eq('id', authData.user.id).single();
                if (!profile) {
                    // Manually create profile if trigger failed
                    await supabase.from('profiles').insert({
                        id: authData.user.id,
                        email: formData.email,
                        role: 'instructor',
                        full_name: formData.fullName,
                        avatar_url: authData.user.user_metadata?.avatar_url
                    });
                }
            }

            // 3. Create Instructor Record (Step 1 Data)
            const { error: profileError } = await supabase
                .from('instructors')
                .upsert({
                    id: authData.user?.id || (await supabase.auth.getUser()).data.user?.id!, // Safe fallback
                    phone: formData.phone,
                    service_city: formData.service_city,
                    status: 'pending_docs',
                    balance_cents: 0,
                    current_onboarding_step: 2,
                    accepted_terms: true
                });

            if (profileError) {
                console.error("Error creating instructor profile:", profileError);
            }

            // 4. Redirect to Step 2 (Address)
            router.push('/instructor/onboarding/address');
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-50 font-display transition-colors duration-200">
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
                <div className="px-4 md:px-10 py-3 mx-auto max-w-[1280px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-8 text-[#137fec] flex items-center justify-center rounded-lg bg-[#137fec]/10">
                                <span className="material-symbols-outlined text-[24px]">directions_car</span>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Instrutor Pro</h2>
                        </div>
                        <div className="flex items-center gap-4 md:gap-8">
                            <div className="hidden md:flex items-center gap-6">
                                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Como funciona</a>
                                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Ajuda</a>
                            </div>
                            <Link href="/instructor/login">
                                <button className="flex h-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex flex-col items-center">
                <section className="w-full px-4 py-12 md:px-10 md:py-16 lg:py-24 max-w-[1280px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold text-[#137fec]">
                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                    <span>Credenciamento Oficial</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                    Fature <span className="text-[#137fec]">R$ 2.400/semana</span> com seu Carro
                                    <span className="block text-2xl md:text-3xl mt-4 font-bold text-slate-600 dark:text-slate-300">
                                        (Mesmo que você nunca tenha captado um aluno sozinho).
                                    </span>
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium border-l-4 border-[#137fec] pl-4 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg">
                                    <span className="font-bold text-[#137fec]">GARANTIA DE RISCO ZERO:</span> Nós garantimos que você terá seu primeiro aluno pago em 7 dias ou nós pagamos R$ 100 pelo seu tempo de cadastro.
                                </p>
                            </div>
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl md:max-w-md bg-black group cursor-pointer border-4 border-white dark:border-slate-800">
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="w-20 h-20 bg-[#137fec] rounded-full flex items-center justify-center pl-1 shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-[40px] text-white">play_arrow</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10"></div>
                                <Image
                                    alt="Thumbnail do vídeo explicativo"
                                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
                                    fill
                                    className="object-cover opacity-60"
                                    sizes="(max-width: 768px) 100vw, 448px"
                                />
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <p className="text-white font-bold text-sm bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                                        🎬 Veja como o Ricardo triplicou a renda dele
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-md mx-auto lg:ml-auto">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/20 p-6 md:p-8 border border-slate-100 dark:border-slate-700">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Crie sua conta e comece a faturar hoje</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-bold text-red-500">(Vagas Limitadas por Região)</p>
                                </div>
                                <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nome Completo</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">person</span>
                                            </div>
                                            <input
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-[#137fec]'} focus:ring-1 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white`}
                                                placeholder="Ex: João da Silva"
                                                type="text"
                                            // removed required to use manual validation
                                            />
                                            {errors.fullName && <span className="text-xs text-red-500 font-bold mt-1 block">{errors.fullName}</span>}
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">E-mail</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">mail</span>
                                            </div>
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-[#137fec]'} focus:ring-1 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white`}
                                                placeholder="seu@email.com"
                                                type="email"
                                            />
                                            {errors.email && (
                                                <span className="text-xs text-red-500 font-bold mt-1 block">
                                                    {errors.email}
                                                    {errors.email.includes("Login") || errors.email.includes("cadastrado") ? (
                                                        <Link href="/instructor/login" className="underline hover:text-red-700 ml-1">
                                                            Faça login
                                                        </Link>
                                                    ) : null}
                                                </span>
                                            )}
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Celular / WhatsApp</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">call</span>
                                            </div>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-[#137fec]'} focus:ring-1 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white`}
                                                placeholder="(00) 00000-0000"
                                                type="tel"
                                                maxLength={15}
                                            />
                                            {errors.phone && <span className="text-xs text-red-500 font-bold mt-1 block">{errors.phone}</span>}
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cidade de Atuação</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                                            </div>
                                            <input
                                                name="service_city"
                                                value={formData.service_city}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                placeholder="Ex: São Paulo"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">lock</span>
                                            </div>
                                            <input
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-12 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-[#137fec]'} focus:ring-1 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white`}
                                                placeholder="••••••••"
                                                type="password"
                                            />
                                            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer" type="button">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </div>
                                        {errors.password && <span className="text-xs text-red-500 font-bold mt-1 block">{errors.password}</span>}
                                    </label>
                                    <label className="flex items-start gap-2 mt-2 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                className={`peer h-4 w-4 cursor-pointer appearance-none rounded border shadow transition-all checked:border-[#137fec] checked:bg-[#137fec] hover:shadow-md dark:bg-slate-800 ${errors.terms ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                                                type="checkbox"
                                                checked={termsAccepted}
                                                onChange={(e) => {
                                                    setTermsAccepted(e.target.checked);
                                                    if (e.target.checked && errors.terms) {
                                                        setErrors(prev => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.terms;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            />
                                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                                                Concordo com os <a className="text-[#137fec] hover:underline" href="#">Termos de Uso</a> e <a className="text-[#137fec] hover:underline" href="#">Política de Privacidade</a>.
                                            </span>
                                            {errors.terms && <span className="text-xs text-red-500 font-bold mt-1">{errors.terms}</span>}
                                        </div>
                                    </label>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wide text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                                                <span>Criando Conta...</span>
                                            </>
                                        ) : (
                                            <span>QUERO MINHA LIBERDADE FINANCEIRA AGORA &gt;&gt;</span>
                                        )}
                                    </button>
                                    <div className="mt-3 text-center">
                                        <Link href="/instructor/login" className="text-sm font-medium text-slate-500 hover:text-[#137fec] transition-colors underline decoration-slate-300 hover:decoration-[#137fec]">
                                            Continuar meu cadastro
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                    <div className="px-4 py-16 md:px-10 max-w-[1280px] mx-auto">

                        {/* Como Funciona (Donald Miller Plan) */}
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                                    Sua carreira está no banco do passageiro? <br />
                                    <span className="text-[#137fec]">Assuma a direção em 3 passos.</span>
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                                    Elimine a confusão. Veja exatamente como você vai sair do zero para a sua primeira venda.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                                {/* Connector Line (Desktop) */}
                                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

                                {/* Step 1 */}
                                <div className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#137fec] transition-all duration-300 relative">
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#137fec] text-white flex items-center justify-center font-bold border-4 border-white dark:border-slate-900">1</div>
                                        <span className="text-4xl">📝</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">O Cadastro (Sem Compromisso)</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                                        Preencha seu perfil em 2 minutos. Não pedimos cartão de crédito nem fidelidade.
                                    </p>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#137fec] transition-all duration-300 relative">
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#137fec] text-white flex items-center justify-center font-bold border-4 border-white dark:border-slate-900">2</div>
                                        <span className="text-4xl">🛡️</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">A Validação (Autoridade)</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                                        Nossa equipe valida suas credenciais (CFC/DETRAN) para garantir que você é um profissional de elite.
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#137fec] transition-all duration-300 relative">
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#137fec] text-white flex items-center justify-center font-bold border-4 border-white dark:border-slate-900">3</div>
                                        <span className="text-4xl">💰</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">A Liberdade (Sucesso)</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                                        Abra sua agenda, defina seu preço e receba notificações de alunos prontos para pagar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof / Prints Section (GaryVee/Sabri Style) */}
                        <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
                            <div className="text-center mb-12">
                                <span className="inline-block py-1 px-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
                                    Resultados Reais
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Não acredite em nós. <br />
                                    <span className="text-slate-500 dark:text-slate-400">Acredite no PIX caindo na conta deles.</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Print 1 */}
                                <div className="bg-[#e5ddd5] dark:bg-[#0b141a] p-4 rounded-xl relative border-[6px] border-slate-900 dark:border-slate-700 shadow-2xl">
                                    {/* Mockup notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 dark:bg-slate-700 rounded-b-xl z-10"></div>
                                    <div className="bg-white dark:bg-[#111b21] rounded-lg h-full overflow-hidden flex flex-col">
                                        {/* Header */}
                                        <div className="bg-[#008069] p-3 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
                                            <p className="text-white font-bold text-sm">Instrutor Carlos</p>
                                        </div>
                                        {/* Body */}
                                        <div className="flex-1 p-4 flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10">
                                            <div className="self-start bg-white dark:bg-[#202c33] p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                                                <p className="text-xs text-slate-800 dark:text-slate-100">Cara, o app tá bombando! Só hoje peguei 3 alunos novos.</p>
                                                <span className="text-[10px] text-slate-400 block text-right">10:42</span>
                                            </div>
                                            <div className="self-end bg-[#d9fdd3] dark:bg-[#005c4b] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[85%]">
                                                <p className="text-xs text-slate-800 dark:text-slate-100">Boa demais Carlos! 🚀 Quanto deu a semana?</p>
                                                <span className="text-[10px] text-slate-500 dark:text-slate-300 block text-right">10:45</span>
                                            </div>
                                            <div className="self-start bg-white dark:bg-[#202c33] p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                                                <p className="text-xs text-slate-800 dark:text-slate-100">Fechei R$ 2.850 limpo. Nunca tirei isso na autoescola em 1 mês!</p>
                                                <span className="text-[10px] text-slate-400 block text-right">10:46</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Print 2 */}
                                <div className="bg-[#e5ddd5] dark:bg-[#0b141a] p-4 rounded-xl relative border-[6px] border-slate-900 dark:border-slate-700 shadow-2xl hidden md:block">
                                    {/* Mockup notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 dark:bg-slate-700 rounded-b-xl z-10"></div>
                                    <div className="bg-white dark:bg-[#111b21] rounded-lg h-full overflow-hidden flex flex-col">
                                        {/* Header */}
                                        <div className="bg-[#008069] p-3 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
                                            <p className="text-white font-bold text-sm">Mariana Instrutora</p>
                                        </div>
                                        {/* Body */}
                                        <div className="flex-1 p-4 flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10">
                                            <div className="self-start bg-white dark:bg-[#202c33] p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                                                <p className="text-xs text-slate-800 dark:text-slate-100">Oi equipe! Só pra avisar que liberei mais horários na agenda.</p>
                                                <span className="text-[10px] text-slate-400 block text-right">14:20</span>
                                            </div>
                                            <div className="self-start bg-white dark:bg-[#202c33] p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                                                <p className="text-xs text-slate-800 dark:text-slate-100">A procura tá gigante aqui na Zona Sul. Vocês fazem algum tráfego específico?</p>
                                                <span className="text-[10px] text-slate-400 block text-right">14:21</span>
                                            </div>
                                            <div className="self-end bg-[#d9fdd3] dark:bg-[#005c4b] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[85%]">
                                                <p className="text-xs text-slate-800 dark:text-slate-100">Mariana, é o algoritmo! A gente conecta alunos vizinhos a você. 😉</p>
                                                <span className="text-[10px] text-slate-500 dark:text-slate-300 block text-right">14:25</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Print 3 */}
                                <div className="bg-[#e5ddd5] dark:bg-[#0b141a] p-4 rounded-xl relative border-[6px] border-slate-900 dark:border-slate-700 shadow-2xl hidden lg:block">
                                    {/* Mockup notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 dark:bg-slate-700 rounded-b-xl z-10"></div>
                                    <div className="bg-white dark:bg-[#111b21] rounded-lg h-full overflow-hidden flex flex-col">
                                        {/* Header */}
                                        <div className="bg-[#008069] p-3 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
                                            <p className="text-white font-bold text-sm">Grupo VIP Instrutores</p>
                                        </div>
                                        {/* Body */}
                                        <div className="flex-1 p-4 flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10">
                                            <div className="self-start bg-white dark:bg-[#202c33] p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                                                <span className="text-[10px] text-orange-500 font-bold mb-1 block">Roberto</span>
                                                <p className="text-xs text-slate-800 dark:text-slate-100">Alguém aí já usou o recurso de antecipação de recebíveis?</p>
                                                <span className="text-[10px] text-slate-400 block text-right">09:12</span>
                                            </div>
                                            <div className="self-start bg-white dark:bg-[#202c33] p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                                                <span className="text-[10px] text-blue-500 font-bold mb-1 block">Paulo Instrutor</span>
                                                <p className="text-xs text-slate-800 dark:text-slate-100">Usei semana passada pra consertar o ar condicionado do carro. Salvou minha vida, caiu na hora.</p>
                                                <span className="text-[10px] text-slate-400 block text-right">09:15</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-24 mb-12 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">A Máfia das Autoescolas está ficando com o seu dinheiro. Chega de ser explorado.</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">Oferecemos a tecnologia que você precisa para focar no que importa: ensinar.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-[#137fec]/50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-[#137fec] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[28px]">schedule</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Domine sua Agenda (Valor: Inestimável)</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Você é seu próprio chefe. Defina seus horários, dias de trabalho e as regiões onde deseja atender alunos.
                                </p>
                            </div>
                            <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-[#137fec]/50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[28px]">payments</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Lucro Líquido Superior (Receba 90% do valor da aula)</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Sem taxas escondidas. Receba pagamentos semanais diretamente na sua conta e acompanhe seus ganhos em tempo real.
                                </p>
                            </div>
                            <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-[#137fec]/50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[28px]">dashboard</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Secretária Digital 24h (Grátis para parceiros)</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Esqueça o papel e caneta. Nossa plataforma organiza sua agenda, histórico de alunos e lembretes de aulas automaticamente.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="w-full py-8 text-center text-slate-500 dark:text-slate-500 text-sm">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[20px]">directions_car</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">Instrutor Pro</span>
                    </div>
                    <p>© 2024 Instrutor Pro. Todos os direitos reservados.</p>
                </footer>
            </main>
        </div>
    );
}
