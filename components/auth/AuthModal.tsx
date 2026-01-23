"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type AuthView = 'login' | 'signup' | 'forgot_password';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [view, setView] = useState<AuthView>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const supabase = createClient();
    const router = useRouter();

    if (!isOpen) return null;

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
            onClose();
            router.push('/student/dashboard'); // Assuming this is the target
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
                        role: 'student', // Explicitly setting role as requested
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-cta/10 text-brand-cta mb-4">
                            <span className="material-symbols-outlined text-2xl">
                                {view === 'login' ? 'login' : view === 'signup' ? 'person_add' : 'lock_reset'}
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {view === 'login' && 'Bem-vindo de volta!'}
                            {view === 'signup' && 'Crie sua conta grátis'}
                            {view === 'forgot_password' && 'Recuperar Senha'}
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm">
                            {view === 'login' && 'Acesse sua área do aluno para gerenciar suas aulas.'}
                            {view === 'signup' && 'Junte-se a milhares de alunos aprovados.'}
                            {view === 'forgot_password' && 'Digite seu email para receber um link de redefinição.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">error</span>
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-6 p-3 bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            {message}
                        </div>
                    )}

                    <form onSubmit={view === 'login' ? handleLogin : view === 'signup' ? handleSignUp : handleForgotPassword} className="space-y-4">

                        {view === 'signup' && (
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700 ml-1">Nome Completo</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-cta focus:border-brand-cta outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                        placeholder="Seu nome"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-cta focus:border-brand-cta outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        {view !== 'forgot_password' && (
                            <div className="space-y-1">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-bold text-slate-700">Senha</label>
                                    {view === 'login' && (
                                        <button
                                            type="button"
                                            onClick={() => setView('forgot_password')}
                                            className="text-xs font-bold text-brand-cta hover:text-green-700"
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
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-cta focus:border-brand-cta outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-brand-cta hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>
                                        {view === 'login' && 'Entrar na Plataforma'}
                                        {view === 'signup' && 'Criar Conta Grátis'}
                                        {view === 'forgot_password' && 'Enviar Link'}
                                    </span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            {view === 'login' && (
                                <>
                                    Ainda não tem conta?{' '}
                                    <button onClick={() => setView('signup')} className="text-brand-cta font-bold hover:underline">
                                        Cadastre-se
                                    </button>
                                </>
                            )}
                            {view === 'signup' && (
                                <>
                                    Já tem uma conta?{' '}
                                    <button onClick={() => setView('login')} className="text-brand-cta font-bold hover:underline">
                                        Entrar
                                    </button>
                                </>
                            )}
                            {view === 'forgot_password' && (
                                <button onClick={() => setView('login')} className="text-slate-500 font-bold hover:text-slate-800 flex items-center justify-center gap-1 mx-auto">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    Voltar para o login
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
