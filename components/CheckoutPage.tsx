"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface Instructor {
    id: string;
    rating: number;
    bio: string;
    service_city: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
    instructor_availability: {
        hourly_rate_cents: number;
    }[];
}

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const instructorId = searchParams.get('instructorId');
    const [instructor, setInstructor] = useState<Instructor | null>(null);
    const [loading, setLoading] = useState(true);
    const [basePrice, setBasePrice] = useState(70); // Default fallback

    useEffect(() => {
        async function fetchInstructor() {
            if (!instructorId) {
                setLoading(false);
                return;
            }

            const supabase = createClient();
            const { data, error } = await supabase
                .from('instructors')
                .select(`
                    id,
                    rating,
                    bio,
                    service_city,
                    profiles!instructors_id_fkey(full_name, avatar_url),
                    instructor_availability(hourly_rate_cents)
                `)
                .eq('id', instructorId)
                .single();

            if (data) {
                // @ts-expect-error - Supabase type mapping might be slightly off for the join, trusting the query
                setInstructor(data);

                // Determine base price (take the highest rate found or default)
                if (data.instructor_availability && data.instructor_availability.length > 0) {
                    const rates = data.instructor_availability.map((a: { hourly_rate_cents: number }) => a.hourly_rate_cents);
                    const maxRate = Math.max(...rates);
                    setBasePrice(maxRate / 100); // Convert cents to Real
                }
            } else if (error) {
                console.error('Error fetching instructor:', error);
            }
            setLoading(false);
        }

        fetchInstructor();
    }, [instructorId]);

    // Derived prices
    const price10Class = basePrice * 10 - 100; // Mock discount logic: 10 classes - R$100 discount
    const price20Class = basePrice * 20 - 300; // Mock discount logic: 20 classes - R$300 discount

    // Formatting helper
    const fmtMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f8fafc] dark:bg-[#101922]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#137fec]"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8fafc] dark:bg-[#101922] text-[#0d141b] dark:text-white font-display antialiased relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <header className="bg-white dark:bg-[#1a2632] border-b border-[#e7edf3] dark:border-[#2a3845] sticky top-0 z-50">
                <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto w-full">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-[#137fec]">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">DireçãoCerta</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            <span>Ambiente 100% Seguro</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-8">
                <div className="mb-8 w-full max-w-4xl mx-auto text-center">
                    <h1 className="text-[#0d141b] dark:text-white text-2xl md:text-3xl font-black leading-tight tracking-tight mb-3">
                        Quase lá! Falta pouco para sua <span className="text-[#137fec] underline decoration-4 decoration-yellow-400">liberdade</span>.
                    </h1>
                    <div className="relative w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 w-[90%] rounded-full flex items-center justify-end pr-2 animate-pulse">
                            <span className="text-[10px] font-bold text-white leading-none">90%</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-2 font-medium">Complete seus dados abaixo para garantir seu instrutor.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-[#e7edf3] dark:border-[#2a3845] overflow-hidden">
                            <div className="p-5 border-b border-[#e7edf3] dark:border-[#2a3845] bg-slate-50 dark:bg-[#151f29]">
                                <h3 className="text-base uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">Seu Instrutor</h3>
                                <div className="flex gap-4 items-center">
                                    <div
                                        className="bg-center bg-no-repeat bg-cover rounded-full size-16 shrink-0 border-2 border-white shadow-md bg-gray-200"
                                        style={{ backgroundImage: `url("${instructor?.profiles.avatar_url || 'https://via.placeholder.com/150'}")` }}
                                    ></div>
                                    <div>
                                        <p className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight">
                                            {instructor?.profiles.full_name || 'Instrutor'}
                                        </p>
                                        <div className="flex items-center gap-1 text-[#4c739a] dark:text-slate-400 text-sm mt-1">
                                            <span className="material-symbols-outlined text-[16px] text-yellow-500 fill-current">star</span>
                                            <span className="font-bold text-[#0d141b] dark:text-slate-200">{instructor?.rating || 5.0}</span>
                                        </div>
                                        <p className="text-[#137fec] font-medium text-xs mt-1">Credenciado Detran-SP</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[#137fec] text-[20px]">calendar_today</span>
                                    </div>
                                    <div>
                                        <p className="text-[#4c739a] dark:text-slate-400 text-xs uppercase font-bold">Data Reservada</p>
                                        <p className="text-[#0d141b] dark:text-white font-medium">
                                            {searchParams.get('date') && searchParams.get('time')
                                                ? (() => {
                                                    const dateParts = searchParams.get('date')!.split('-');
                                                    const year = dateParts[0];
                                                    const month = dateParts[1];
                                                    const day = dateParts[2];
                                                    // Display as DD/MM/YYYY locally
                                                    return `${day}/${month}/${year} às ${searchParams.get('time')}`;
                                                })()
                                                : 'A combinar'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[#137fec] text-[20px]">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[#4c739a] dark:text-slate-400 text-xs uppercase font-bold">Região de Atendimento</p>
                                        <p className="text-[#0d141b] dark:text-white font-medium">{instructor?.service_city || 'São Paulo'}</p>
                                    </div>
                                </div>
                                <div className="w-full h-24 rounded-lg bg-slate-100 dark:bg-slate-800 bg-cover bg-center overflow-hidden relative border border-slate-200 dark:border-slate-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8LimDaTTX-xOBPmAGJmGKHuhTTxVYj_xckPezkro2pUOnFiaCooAufKJdgku_oEP_38TM1piWbbYeY85r62_tT6U_oBoSV-cwihZ-GJsafyBPVqKZv_W74MITUFXz75YbbZRG1TVC8OtiYQE7riNcKO62vcQDq2bqrhVv1D9DeOS5WV9xYpCa-DDH30Ed-3JrxU6jnPluAKgSY7ZEGpkjsTLai4PHNjJuAUIKFLfiK_vcNtWdnAEVjG2-GADgW3fYtNBGUK5NCIHH")' }}>
                                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-red-500 text-3xl drop-shadow-md">location_on</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-[#1a2632] dark:to-[#151f29] rounded-xl p-5 border border-slate-200 dark:border-[#2a3845] shadow-sm relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 bg-slate-100 dark:bg-slate-800 rounded-full size-24 opacity-50 group-hover:scale-110 transition-transform"></div>
                            <div className="flex gap-4 relative z-10">
                                <div className="shrink-0 text-green-600 dark:text-green-500">
                                    <span className="material-symbols-outlined text-5xl">verified_user</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-[#0d141b] dark:text-white text-lg leading-tight mb-1">Garantia Instrutor Compatível</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
                                        Não se adaptou à didática? Devolvemos <strong>100% do seu dinheiro</strong> após a primeira aula. Sem burocracia, sem perguntas.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 opacity-70">
                            <div className="flex items-center gap-2 justify-center py-2 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-500">
                                <span className="material-symbols-outlined text-[16px]">lock</span> SSL Seguro
                            </div>
                            <div className="flex items-center gap-2 justify-center py-2 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-500">
                                <span className="material-symbols-outlined text-[16px]">support_agent</span> Suporte 24h
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 bg-white dark:bg-[#1a2632] rounded-xl shadow-lg border border-[#e7edf3] dark:border-[#2a3845] p-5 md:p-8 order-1 lg:order-2">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-4 flex items-center gap-2">
                                <span className="bg-slate-900 text-white size-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Escolha o melhor plano para você
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className="cursor-pointer group relative">
                                    <input className="peer sr-only" name="package" type="radio" />
                                    <div className="h-full rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4 transition-all hover:border-slate-300 peer-checked:border-slate-900 peer-checked:bg-slate-50 dark:peer-checked:bg-[#1f2e3d]">
                                        <div className="flex flex-col h-full justify-between">
                                            <div>
                                                <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Básico</div>
                                                <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">3 Aulas</div>
                                                <p className="text-xs text-slate-500 mb-4">Pacote mínimo para iníciar.</p>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-2xl font-black text-slate-900 dark:text-white">{fmtMoney(basePrice * 3)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label className="cursor-pointer group relative">
                                    <input defaultChecked className="peer sr-only" name="package" type="radio" />
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ring-2 ring-white dark:ring-[#1a2632]">
                                        Mais Vendido
                                    </div>
                                    <div className="h-full rounded-xl border-2 border-[#137fec] bg-blue-50/20 dark:bg-[#137fec]/5 p-4 relative overflow-hidden transition-all shadow-glow ring-1 ring-[#137fec]/30">
                                        <div className="flex flex-col h-full justify-between relative z-10">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="text-[#137fec] text-sm font-bold uppercase tracking-wider">Recomendado</div>
                                                </div>
                                                <div className="text-lg font-bold text-[#137fec] mb-1">Pacote 10 Aulas</div>
                                                <div className="inline-block bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded mb-3">
                                                    Economia de R$ 100
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Perfeito para quem quer evoluir rápido.</p>
                                            </div>
                                            <div className="mt-2">
                                                <div className="text-sm text-slate-400 line-through font-medium">{fmtMoney(basePrice * 10)}</div>
                                                <span className="text-3xl font-black text-[#137fec]">{fmtMoney(price10Class)}</span>
                                                <span className="text-xs text-slate-500 block">{fmtMoney(price10Class / 10)}/aula</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label className="cursor-pointer group relative">
                                    <input className="peer sr-only" name="package" type="radio" />
                                    <div className="h-full rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4 transition-all hover:border-slate-300 peer-checked:border-slate-900 peer-checked:bg-slate-50 dark:peer-checked:bg-[#1f2e3d]">
                                        <div className="flex flex-col h-full justify-between">
                                            <div>
                                                <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Completo</div>
                                                <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">20 Aulas</div>
                                                <p className="text-xs text-slate-500 mb-4">Do zero à habilitação.</p>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-2xl font-black text-slate-900 dark:text-white">{fmtMoney(price20Class)}</span>
                                                <span className="text-xs text-slate-500 block">{fmtMoney(price20Class / 20)}/aula</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="mb-8 p-4 rounded-xl border-2 border-dashed border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 flex items-start gap-3 md:gap-4 hover:bg-yellow-100/50 transition-colors">
                            <div className="pt-1">
                                <input className="size-5 md:size-6 rounded border-yellow-500 text-[#137fec] focus:ring-offset-0 focus:ring-0 cursor-pointer" type="checkbox" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base leading-tight">
                                    <span className="text-red-600 font-black animate-pulse">NÃO ESPERE!</span> Adicionar o "Manual Anti-Reprovação"
                                </p>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                    Descubra os 7 erros fatais que reprovam 80% dos alunos e como evitá-los. Oferta única nesta página por apenas <span className="font-bold text-slate-900 dark:text-white">R$ 19,90</span>.
                                </p>
                            </div>
                        </div>
                        <hr className="border-slate-100 dark:border-slate-800 mb-8" />
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-4 flex items-center gap-2">
                                <span className="bg-slate-900 text-white size-6 rounded-full flex items-center justify-center text-xs">2</span>
                                Pagamento Seguro
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <label className="flex-1 cursor-pointer">
                                    <input className="peer sr-only" name="payment_method" type="radio" />
                                    <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 font-bold transition-all h-14">
                                        <span className="material-symbols-outlined">qr_code_2</span>
                                        PIX (5% OFF)
                                    </div>
                                </label>
                                <label className="flex-1 cursor-pointer">
                                    <input defaultChecked className="peer sr-only" name="payment_method" type="radio" />
                                    <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 peer-checked:border-[#137fec] peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 peer-checked:text-[#137fec] font-bold transition-all h-14">
                                        <span className="material-symbols-outlined">credit_card</span>
                                        Cartão de Crédito
                                    </div>
                                </label>
                            </div>
                            <form className="flex flex-col gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 md:p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Número do Cartão</label>
                                        <div className="relative">
                                            <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 pl-11 pr-4 text-[#0d141b] dark:text-white placeholder-slate-400 focus:border-[#137fec] focus:ring-[#137fec] dark:focus:ring-[#137fec] shadow-sm" placeholder="0000 0000 0000 0000" type="text" />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                                <span className="material-symbols-outlined">credit_card</span>
                                            </div>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <div className="flex gap-1 opacity-50">
                                                    <div className="h-5 w-8 bg-slate-200 rounded"></div>
                                                    <div className="h-5 w-8 bg-slate-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Validade</label>
                                            <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 px-4 text-[#0d141b] dark:text-white placeholder-slate-400 focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" placeholder="MM/AA" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">CVV</label>
                                            <div className="relative">
                                                <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 px-4 text-[#0d141b] dark:text-white placeholder-slate-400 focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" placeholder="123" type="text" />
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                                                    <span className="material-symbols-outlined text-[18px]">help</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Nome no Cartão</label>
                                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 px-4 text-[#0d141b] dark:text-white placeholder-slate-400 focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" placeholder="Como impresso no cartão" type="text" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Link href="/confirmation" className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-5 px-6 text-center text-xl font-black text-white shadow-lg shadow-green-500/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 group">
                                        <span>GARANTIR MEU HORÁRIO AGORA</span>
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform font-bold">double_arrow</span>
                                    </Link>
                                    <p className="text-center text-xs text-slate-500 mt-3">
                                        Ao clicar, você concorda com nossos Termos de Uso. Pagamento processado com segurança bancária.
                                    </p>
                                </div>
                                <div className="flex justify-center gap-4 mt-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                    <div className="h-6 w-10 rounded bg-slate-300"></div>
                                    <div className="h-6 w-10 rounded bg-slate-300"></div>
                                    <div className="h-6 w-10 rounded bg-slate-300"></div>
                                    <div className="h-6 w-10 rounded bg-slate-300"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mt-auto border-t border-[#e7edf3] dark:border-[#2a3845] bg-white dark:bg-[#1a2632] py-8">
                <div className="px-4 md:px-10 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#4c739a] dark:text-slate-400">
                    <p>© 2023 DireçãoCerta. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-[#137fec]" href="#">Termos de Uso</a>
                        <a className="hover:text-[#137fec]" href="#">Política de Privacidade</a>
                        <a className="hover:text-[#137fec]" href="#">Ajuda</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
