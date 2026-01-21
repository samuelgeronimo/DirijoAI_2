"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function InstructorLandingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        service_city: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
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
            alert("Erro ao criar conta: " + authError.message);
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

            // 2. Create Instructor Record (if not created by trigger)
            const { error: profileError } = await supabase
                .from('instructors')
                .upsert({
                    id: authData.user?.id || (await supabase.auth.getUser()).data.user?.id!, // Safe fallback
                    phone: formData.phone,
                    service_city: formData.service_city,
                    status: 'pending_docs',
                    balance_cents: 0,
                    current_onboarding_step: 2
                });

            if (profileError) {
                console.error("Error creating instructor profile:", profileError);
            }

            // 3. Redirect to Step 2 (Address)
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
                                    Transforme seu carro em uma máquina de <br />
                                    <span className="text-[#137fec]">liberdade e lucro.</span>
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                                    Pare de ser refém das taxas das autoescolas. O guia que você precisava para gerenciar sua carreira chegou.
                                </p>
                            </div>
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl md:max-w-md bg-slate-200 dark:bg-slate-800 group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex flex-col justify-end p-6">
                                    <p className="text-white font-bold text-lg">Ricardo Silva</p>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                                        <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                                        <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                                        <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                                        <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                                        <span className="text-white text-sm ml-1">5.0 (120+ alunos)</span>
                                    </div>
                                </div>
                                <img alt="Driving instructor smiling in a car with a student during a lesson" className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105" data-alt="Driving instructor smiling in a car with a student during a lesson" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk28NCRzQAT345YE-o1Ypo2i7eS8Y4Zq4KGt7FMSuv2wDEHLHqT2QnqP7JmN3gCDB6IDRZAIcMm2VzvjE0iE3GfFCTC_34_WBdnA-34a1RGz0DM2QnRK940TvYOcGxPjjrXl1aATO5M5-UQUj6DlXuJjrlgbqqU0-Ey4mo6DhJokIGANNl5ll2j40ebyk_wXckr4BE_U55X8UjN-w_PrQ9dJRyVM_YAvqvqj83Bqql82sESViDj3gtahPRfv2QntXE4NjndTeF0lTo" />
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
                                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                placeholder="Ex: João da Silva"
                                                type="text"
                                                required
                                            />
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
                                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                placeholder="seu@email.com"
                                                type="email"
                                                required
                                            />
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
                                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                placeholder="(00) 00000-0000"
                                                type="tel"
                                                required
                                            />
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
                                                className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                placeholder="••••••••"
                                                type="password"
                                                required
                                            />
                                            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer" type="button">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-2 mt-2 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all checked:border-[#137fec] checked:bg-[#137fec] hover:shadow-md dark:border-slate-600 dark:bg-slate-800" type="checkbox" required />
                                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                                            Concordo com os <a className="text-[#137fec] hover:underline" href="#">Termos de Uso</a> e <a className="text-[#137fec] hover:underline" href="#">Política de Privacidade</a>.
                                        </span>
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
                        <div className="mb-12 text-center md:text-left">
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
