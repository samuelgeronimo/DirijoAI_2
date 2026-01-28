"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthModal from '../auth/AuthModal';
import { createClient } from '@/utils/supabase/client';

export default function LandingHeader() {
    const router = useRouter();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState<unknown>(null);

    useEffect(() => {
        const supabase = createClient();
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();
    }, []);

    return (
        <>
            <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-cta text-white p-1 rounded-lg">
                            <span className="material-symbols-outlined text-3xl">local_taxi</span>
                        </div>
                        <h2 className="text-brand-dark text-2xl font-black tracking-tighter uppercase italic">
                            Dirijo<span className="text-brand-cta">.ai</span>
                        </h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#como-funciona" className="text-sm font-bold text-slate-600 hover:text-brand-cta uppercase tracking-wide transition-colors">
                            Como Funciona
                        </a>
                        <a href="#depoimentos" className="text-sm font-bold text-slate-600 hover:text-brand-cta uppercase tracking-wide transition-colors">
                            Depoimentos
                        </a>
                        <div className="flex gap-3 ml-4">
                            <Link href="/instructor" className="text-sm font-bold text-slate-700 hover:text-brand-dark px-4 py-2">
                                Sou Instrutor
                            </Link>
                            {user ? (
                                <Link
                                    href="/student/dashboard"
                                    className="bg-brand-dark text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">person</span>
                                    Meu Perfil
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="bg-brand-dark text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-slate-800 transition-all shadow-lg"
                                >
                                    Entrar
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
}
