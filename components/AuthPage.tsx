"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

type AuthView = 'login' | 'signup' | 'forgot_password';

export default function AuthPage() {
    const [view, setView] = useState<AuthView>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/student/schedule'; // Default redirect for purchase flow
    const cancelUrl = searchParams.get('cancelUrl') ? decodeURIComponent(searchParams.get('cancelUrl')!) : '/';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Successful login
            router.push(decodeURIComponent(redirectTo));
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Erro ao entrar. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        role: 'student',
                    },
                },
            });

            if (error) throw error;

            setMessage('Conta criada com sucesso! Verifique seu email para confirmar.');
            setTimeout(() => {
                setView('login');
                setMessage(null);
            }, 3000);
        } catch (err: any) {
            setError(err.message || 'Erro ao criar conta.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/student/reset-password`,
            });

            if (error) throw error;

            setMessage('Email de recuperação enviado. Verifique sua caixa de entrada.');
        } catch (err: any) {
            setError(err.message || 'Erro ao solicitar recuperação de senha.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#111921] text-[#0e141b] dark:text-gray-100 font-sans transition-colors duration-200 overflow-hidden h-screen w-screen relative">
            {/* Background elements (kept from original) */}
            <div className="absolute inset-0 flex flex-col pointer-events-none select-none opacity-40 grayscale-[0.5] scale-[0.98] origin-top">
                <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 justify-between bg-white dark:bg-[#1a2633]">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </header>
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2633] hidden md:block p-6">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                            <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#f8fafb] dark:bg-[#111921] p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-gray-100 dark:border-gray-800 h-32"></div>
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-gray-100 dark:border-gray-800 h-32"></div>
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-[#207fdf]/40 ring-2 ring-[#207fdf] h-32 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#207fdf]/5"></div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <span className="font-bold text-[#207fdf]">09:00</span>
                                    <span className="bg-[#207fdf] text-white text-xs px-2 py-0.5 rounded-full">Selecionado</span>
                                </div>
                                <div className="relative z-10 h-2 w-20 bg-[#207fdf]/20 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <Link href={cancelUrl} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/70 transition-opacity cursor-default"></Link>
                <div className="modal-content relative w-full max-w-[480px] bg-white dark:bg-[#1a232e] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-auto min-h-[500px] border border-gray-100 dark:border-gray-800 animate-fade-in-up">
                    <Link href={cancelUrl} className="absolute top-4 right-4 z-20 p-2 text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </Link>

                    <div className="p-8 md:p-10 w-full h-full flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#207fdf]/10 text-[#207fdf] mb-4">
                                <span className="material-symbols-outlined text-2xl">
                                    {view === 'login' ? 'lock' : view === 'signup' ? 'person_add' : 'lock_reset'}
                                </span>
                            </div>
                            <h2 className="text-[#0e141b] dark:text-white tracking-tight text-[26px] font-bold leading-tight px-2 pb-2">
                                {view === 'login' && 'Identifique-se para continuar'}
                                {view === 'signup' && 'Crie sua conta rapidinho'}
                                {view === 'forgot_password' && 'Recuperar Senha'}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed px-4">
                                {view === 'login' && 'Entre com seu email e senha para garantir sua reserva.'}
                                {view === 'signup' && 'Preencha seus dados para finalizarmos sua reserva.'}
                                {view === 'forgot_password' && 'Enviaremos um link para você redefinir sua senha.'}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-300 text-sm rounded-xl flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-300 text-sm rounded-xl flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                {message}
                            </div>
                        )}

                        <form onSubmit={view === 'login' ? handleLogin : view === 'signup' ? handleSignUp : handleForgotPassword} className="space-y-4 w-full max-w-sm mx-auto">

                            {view === 'signup' && (
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Nome Completo</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="w-full h-12 pl-12 pr-4 bg-[#f6f7f8] dark:bg-[#111921] border border-[#d1dbe6] dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#207fdf] focus:border-[#207fdf] outline-none transition-all font-medium text-[#0e141b] dark:text-white placeholder:text-slate-400"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Email</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full h-12 pl-12 pr-4 bg-[#f6f7f8] dark:bg-[#111921] border border-[#d1dbe6] dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#207fdf] focus:border-[#207fdf] outline-none transition-all font-medium text-[#0e141b] dark:text-white placeholder:text-slate-400"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            {view !== 'forgot_password' && (
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Senha</label>
                                        {view === 'login' && (
                                            <button
                                                type="button"
                                                onClick={() => setView('forgot_password')}
                                                className="text-xs font-bold text-[#207fdf] hover:text-blue-600"
                                            >
                                                Esqueceu?
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full h-12 pl-12 pr-4 bg-[#f6f7f8] dark:bg-[#111921] border border-[#d1dbe6] dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#207fdf] focus:border-[#207fdf] outline-none transition-all font-medium text-[#0e141b] dark:text-white placeholder:text-slate-400"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full cursor-pointer flex items-center justify-center rounded-xl h-12 px-5 bg-[#207fdf] hover:bg-blue-600 active:scale-[0.98] transition-all text-[#f8fafb] text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-[#207fdf]/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {loading ? (
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                ) : (
                                    <>
                                        <span className="mr-2">
                                            {view === 'login' && 'Entrar e Reservar'}
                                            {view === 'signup' && 'Criar Conta e Reservar'}
                                            {view === 'forgot_password' && 'Enviar Link'}
                                        </span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center w-full max-w-sm mx-auto">
                            <p className="text-sm text-slate-500 font-medium">
                                {view === 'login' && (
                                    <>
                                        Ainda não tem conta?{' '}
                                        <button onClick={() => setView('signup')} className="text-[#207fdf] font-bold hover:underline">
                                            Cadastre-se
                                        </button>
                                    </>
                                )}
                                {view === 'signup' && (
                                    <>
                                        Já tem uma conta?{' '}
                                        <button onClick={() => setView('login')} className="text-[#207fdf] font-bold hover:underline">
                                            Entrar
                                        </button>
                                    </>
                                )}
                                {view === 'forgot_password' && (
                                    <button onClick={() => setView('login')} className="text-slate-500 font-bold hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1 mx-auto">
                                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                                        Voltar para o login
                                    </button>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
