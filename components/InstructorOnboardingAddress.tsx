"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function InstructorOnboardingAddress() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetchingCep, setFetchingCep] = useState(false);

    const [formData, setFormData] = useState({
        zip_code: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: ""
    });

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(async ({ data }) => {
            if (!data.user) {
                router.push("/instructor/login");
                return;
            }

            // Fetch existing data
            const { data: instructor } = await supabase
                .from('instructors')
                .select('zip_code, street, number, complement, neighborhood, city, state')
                .eq('id', data.user.id)
                .single();

            if (instructor) {
                setFormData({
                    zip_code: instructor.zip_code || "",
                    street: instructor.street || "",
                    number: instructor.number || "",
                    complement: instructor.complement || "",
                    neighborhood: instructor.neighborhood || "",
                    city: instructor.city || "",
                    state: instructor.state || ""
                });
            }
        });
    }, [router]);

    const handleCepBlur = async () => {
        const cep = formData.zip_code.replace(/\D/g, '');
        if (cep.length === 8) {
            setFetchingCep(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar CEP", error);
            } finally {
                setFetchingCep(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const supabase = createClient();

        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return;

        // 1. Ensure Profile Exists (Self-healing for broken triggers)
        const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();
        if (!profile) {
            console.log("Profile missing, creating one...");
            const { error: profileError } = await supabase.from('profiles').insert({
                id: user.id,
                email: user.email,
                role: 'instructor',
                full_name: user.user_metadata?.full_name || 'Instrutor',
                avatar_url: user.user_metadata?.avatar_url
            });
            if (profileError) {
                console.error("Error creating missing profile:", profileError);
                // Continue anyway, maybe it exists but RLS hid it (unlikely for Select) or race condition
            }
        }

        const { error } = await supabase
            .from('instructors')
            .upsert({
                id: user.id,
                zip_code: formData.zip_code,
                street: formData.street,
                number: formData.number,
                complement: formData.complement,
                neighborhood: formData.neighborhood,
                city: formData.city,
                state: formData.state,
                current_onboarding_step: 3, // Moving to Docs
                status: 'pending_docs'
            }, { onConflict: 'id' });

        if (error) {
            alert("Erro ao salvar endereço: " + error.message);
            setLoading(false);
        } else {
            router.push('/instructor/onboarding/documents');
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans text-slate-900 dark:text-slate-100 flex flex-col items-center py-10">
            <div className="w-full max-w-2xl px-4">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Endereço Completo</h1>
                    <p className="text-slate-500 dark:text-slate-400">Precisamos do seu endereço para envio de correspondências e validação jurídica.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CEP</label>
                            <input
                                name="zip_code"
                                value={formData.zip_code}
                                onChange={handleChange}
                                onBlur={handleCepBlur}
                                placeholder="00000-000"
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                                required
                            />
                            {fetchingCep && <span className="text-xs text-[#137fec]">Buscando endereço...</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="md:col-span-2 flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Logradouro (Rua, Av, etc)</label>
                                <input
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Número</label>
                                <input
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Complemento <span className="text-xs font-normal text-slate-400">(Opcional)</span></label>
                                <input
                                    name="complement"
                                    value={formData.complement}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bairro</label>
                                <input
                                    name="neighborhood"
                                    value={formData.neighborhood}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="md:col-span-2 flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cidade</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Estado (UF)</label>
                                <input
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    maxLength={2}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all uppercase"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? "Salvando..." : "Salvar e Continuar"}
                                {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Steps Indicator (Optional, hardcoded for now) */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="h-1.5 w-8 rounded-full bg-[#137fec]"></div>
                    <div className="h-1.5 w-8 rounded-full bg-[#137fec]"></div>
                    <div className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>
            </div>
        </div>
    );
}
