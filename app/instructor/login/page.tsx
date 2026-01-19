"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function InstructorLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        if (authData.user) {
            // 1. Check Profile Role (Admin/Student)
            const { data: profileData } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .single();

            if (profileData?.role === 'admin') {
                router.push("/admin/dashboard");
                return;
            } else if (profileData?.role === 'student') {
                router.push("/student/dashboard"); // Or home based on preference
                return;
            }

            // 2. Check Instructor Status (if not admin/student or if logic allows dual roles later)
            // Use maybeSingle() to avoid error if no row exists (though it should)
            const { data: instructorData, error: fetchError } = await supabase
                .from('instructors')
                .select('current_onboarding_step, status')
                .eq('id', authData.user.id)
                .maybeSingle();

            if (fetchError) {
                console.error("Error fetching instructor data:", fetchError);
                // Fallback to simpler redirect or show error? 
                // Let's assume dashboard if we can't read status to avoid blocking, OR Step 2 default.
                // But error implies something wrong. Let's try to proceed to dashboard or Step 2.
            }

            // Default to documents (step 2) if not found or null
            // If instructorData is null (no record), defaulting to 2 is safest entry point.
            const step = instructorData?.current_onboarding_step || 2;
            const status = instructorData?.status;

            if (status === 'active') {
                router.push("/instructor/dashboard");
            } else if (step === 7) {
                // Completed onboarding but not active yet -> Confirmation/Pending Page
                router.push("/instructor/onboarding/confirmation");
            } else if (step === 3) {
                router.push("/instructor/onboarding/profile");
            } else if (step === 4) {
                router.push("/instructor/onboarding/video");
            } else if (step === 5) {
                router.push("/instructor/onboarding/success");
            } else if (step === 6) {
                router.push("/instructor/onboarding/schedule");
            } else {
                router.push("/instructor/onboarding/documents");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f7f8] dark:bg-[#101922] p-4 text-slate-900 dark:text-slate-50 font-sans">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <div className="mb-8 text-center">
                    <div className="inline-flex size-12 text-[#137fec] items-center justify-center rounded-xl bg-[#137fec]/10 mb-4">
                        <span className="material-symbols-outlined text-3xl">directions_car</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Bem-vindo de volta</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Continue seu cadastro para se tornar um Instrutor Pro.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
                        <span className="material-symbols-outlined text-lg mt-0.5">error</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</span>
                            <a href="#" className="text-xs text-[#137fec] hover:underline font-medium">Esqueci minha senha</a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined text-[20px]">lock</span>
                            </div>
                            <input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                placeholder="••••••••"
                                type="password"
                                required
                            />
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
                                <span>Entrando...</span>
                            </>
                        ) : (
                            <span>Continuar Cadastro</span>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Não tem uma conta?{" "}
                        <Link href="/instructor" className="text-[#137fec] font-bold hover:underline">
                            Começar agora
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
