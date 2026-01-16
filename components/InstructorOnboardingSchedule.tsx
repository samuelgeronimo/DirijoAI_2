"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface DaySchedule {
    day: number;
    label: string;
    active: boolean;
    start: string;
    end: string;
    price: string;
}

export default function InstructorOnboardingSchedule() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [basePrice, setBasePrice] = useState("85,00");
    const [radius, setRadius] = useState(15);

    const [schedule, setSchedule] = useState<DaySchedule[]>([
        { day: 1, label: "Segunda-feira", active: true, start: "08:00", end: "18:00", price: "85,00" },
        { day: 2, label: "Terça-feira", active: true, start: "08:00", end: "18:00", price: "85,00" },
        { day: 3, label: "Quarta-feira", active: true, start: "08:00", end: "18:00", price: "85,00" },
        { day: 4, label: "Quinta-feira", active: true, start: "08:00", end: "18:00", price: "85,00" },
        { day: 5, label: "Sexta-feira", active: true, start: "08:00", end: "17:00", price: "85,00" },
        { day: 6, label: "Sábado", active: true, start: "09:00", end: "13:00", price: "110,00" },
        { day: 0, label: "Domingo", active: false, start: "09:00", end: "12:00", price: "120,00" },
    ]);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUser(data.user);
            } else {
                router.push("/");
            }
        });
    }, [router]);

    const handleToggleDay = (dayIndex: number) => {
        const newSchedule = [...schedule];
        newSchedule[dayIndex].active = !newSchedule[dayIndex].active;
        setSchedule(newSchedule);
    };

    const handleTimeChange = (dayIndex: number, field: 'start' | 'end', value: string) => {
        const newSchedule = [...schedule];
        // @ts-ignore
        newSchedule[dayIndex][field] = value;
        setSchedule(newSchedule);
    };

    const handleBasePriceChange = (value: string) => {
        setBasePrice(value);
        const newSchedule = schedule.map(day => ({
            ...day,
            price: value
        }));
        setSchedule(newSchedule);
    };

    const handlePriceChange = (dayIndex: number, value: string) => {
        const newSchedule = [...schedule];
        newSchedule[dayIndex].price = value;
        setSchedule(newSchedule);
    };

    const calculateTotalHours = () => {
        let total = 0;
        schedule.forEach(day => {
            if (day.active) {
                const start = parseInt(day.start.split(':')[0]);
                const end = parseInt(day.end.split(':')[0]);
                if (end > start) total += (end - start);
            }
        });
        return total;
    };

    const handleFinish = async () => {
        if (!user) return;
        setLoading(true);
        const supabase = createClient();

        try {
            // 1. Delete existing availability (if any, for idempotency)
            await supabase.from('instructor_availability').delete().eq('instructor_id', user.id);

            // 2. Insert new availability
            const availabilityData = schedule
                .filter(day => day.active)
                .map(day => {
                    // Parse price string "85,00" to cents Integer 8500
                    const priceString = day.price.replace('R$', '').trim();
                    const priceCents = parseInt(priceString.replace(/\./g, '').replace(',', ''));

                    return {
                        instructor_id: user.id,
                        day_of_week: day.day,
                        start_time: day.start,
                        end_time: day.end,
                        hourly_rate_cents: isNaN(priceCents) ? 8500 : priceCents
                    };
                });

            if (availabilityData.length > 0) {
                const { error: availError } = await supabase.from('instructor_availability').insert(availabilityData);
                if (availError) throw availError;
            }

            // 3. Update Instructor Metadata (Price Base) - Assuming we might have a price column later or JSONB
            // For now, let's just update the status to 'active' or 'pending_approval'
            // Also saving the radius if we had a column.
            const { error: updateError } = await supabase.from('instructors').update({
                status: 'pending_docs', // Set to pending_docs so they go to confirmation page
                current_onboarding_step: 7
            }).eq('id', user.id);

            if (updateError) throw updateError;

            router.push("/instructor/onboarding/confirmation");

        } catch (error: any) {
            console.error("Error saving availability:", error);
            alert("Erro ao salvar disponibilidade: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 font-display transition-colors duration-200">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
                    <div className="flex items-center gap-4">
                        <div className="flex size-8 items-center justify-center text-[#137fec]">
                            <span className="material-symbols-outlined text-3xl">directions_car</span>
                        </div>
                        <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Instrutor Pro</h2>
                    </div>
                </header>

                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center px-4 py-8 md:px-10 lg:px-40">
                        <div className="layout-content-container flex max-w-[960px] flex-1 flex-col gap-8">
                            {/* Progress */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-end justify-between gap-6">
                                    <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Etapa 4 de 4: Disponibilidade e Preços</p>
                                    <p className="text-[#137fec] text-sm font-bold leading-normal">100%</p>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-out" style={{ width: '100%' }}></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h1 className="text-[#0d141b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-4xl">Defina sua Agenda e Valores</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Configure horários e defina preços diferenciados para finais de semana ou picos.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <div className="flex flex-col gap-6 lg:col-span-2">
                                    {/* Calendar Table */}
                                    <div className="flex flex-col overflow-hidden rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                        <div className="flex flex-col justify-between gap-4 border-b border-[#e7edf3] dark:border-slate-800 px-6 py-4 md:flex-row md:items-center">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-[#0d141b] dark:text-white text-lg font-bold">Agenda Semanal</h3>
                                                <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2.5 py-1 text-xs font-bold text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20">
                                                    {calculateTotalHours()}h Abertas
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full min-w-[600px] border-collapse text-left">
                                                <thead>
                                                    <tr className="border-b border-[#e7edf3] bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                                        <th className="w-1/4 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Dia</th>
                                                        <th className="w-[15%] px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Início</th>
                                                        <th className="w-[15%] px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Fim</th>
                                                        <th className="w-[30%] px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Valor/Hora</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                                    {schedule.map((day, index) => (
                                                        <tr key={day.day} className={`group transition-colors ${day.active ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'opacity-60 bg-slate-50 dark:bg-slate-950/50'}`}>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <input
                                                                        checked={day.active}
                                                                        onChange={() => handleToggleDay(index)}
                                                                        className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600"
                                                                        type="checkbox"
                                                                    />
                                                                    <span className="text-[#0d141b] dark:text-white text-sm font-medium">{day.label}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <input
                                                                    disabled={!day.active}
                                                                    value={day.start}
                                                                    onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
                                                                    className="text-[#0d141b] dark:text-white block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm shadow-sm focus:border-[#137fec] focus:ring-[#137fec] disabled:opacity-50"
                                                                    type="time"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <input
                                                                    disabled={!day.active}
                                                                    value={day.end}
                                                                    onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
                                                                    className="text-[#0d141b] dark:text-white block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm shadow-sm focus:border-[#137fec] focus:ring-[#137fec] disabled:opacity-50"
                                                                    type="time"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <div className="relative">
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 dark:text-slate-400 text-xs font-bold">R$</span>
                                                                    <input
                                                                        disabled={!day.active}
                                                                        value={day.price}
                                                                        onChange={(e) => handlePriceChange(index, e.target.value)}
                                                                        className="pl-8 text-[#0d141b] dark:text-white block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm shadow-sm focus:border-[#137fec] focus:ring-[#137fec] disabled:opacity-50"
                                                                        type="text"
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-4 rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                                        <div className="flex items-center gap-2 text-[#0d141b] dark:text-white">
                                            <span className="material-symbols-outlined text-[#137fec]">payments</span>
                                            <h3 className="text-lg font-bold">Valor Base da Aula</h3>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-slate-500 dark:text-slate-400 text-sm font-medium">Preço padrão por hora (50 min)</label>
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="text-slate-500 dark:text-slate-400 text-lg font-semibold">R$</span>
                                                </div>
                                                <input
                                                    value={basePrice}
                                                    onChange={(e) => handleBasePriceChange(e.target.value)}
                                                    className="text-[#0d141b] dark:text-white block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-12 py-4 text-3xl font-bold placeholder:text-slate-300 focus:border-[#137fec] focus:ring-[#137fec]"
                                                    placeholder="0,00"
                                                    type="text"
                                                />
                                            </div>
                                            <p className="text-slate-400 mt-2 text-xs">Valor médio na sua região: R$ 80 - R$ 100</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-5 rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                                        <div className="flex items-center justify-between text-[#0d141b] dark:text-white">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[#137fec]">location_on</span>
                                                <h3 className="text-lg font-bold">Área de Atuação</h3>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-600 dark:text-slate-300 text-sm">Distância máxima</span>
                                                <span className="text-[#137fec] bg-[#137fec]/10 rounded px-2 py-1 text-sm font-bold">{radius} km</span>
                                            </div>
                                            <input
                                                className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-700"
                                                max="50"
                                                min="1"
                                                type="range"
                                                value={radius}
                                                onChange={(e) => setRadius(parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-[#e7edf3] dark:border-slate-700">
                                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZE0f-UduF05K19urh2yD88PNO2C2cBgwCyMin5NgfOhxza-GEagSj6cm9TSJAfhiMN07va-9jvxqFmQpUTJt4hYH--IVQ9-0J12Fiv-IWYHPHbNTZqRWEI6HzIpCGk08FeCBGxcBSJ9ObcmkXoPIjhKGdj-_P1AS52zH-WigVxHIosmy3U3ozRDw-swMOnCk8Ij9LgUkkcGVQSrvqmGQ8E5n2AgBaLCV0FoakkLnSwipKa_iXFk7Zabo5wi1N_TRhP9Y9ddo3SHHa")' }}>
                                            </div>
                                            <div className="absolute inset-0 bg-slate-900/10 transition-colors group-hover:bg-slate-900/20"></div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                                <span className="text-[#0d141b] dark:text-white rounded-full bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold shadow-lg">Expandir mapa</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-[#e7edf3] dark:border-slate-800 pt-4 sm:flex-row">
                                <Link href="/instructor/onboarding/profile" className="text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex w-full justify-center rounded-lg border border-slate-300 dark:border-slate-600 px-6 py-3 font-bold transition-colors sm:w-auto">
                                    Voltar
                                </Link>
                                <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                                    <span className="text-slate-500 dark:text-slate-400 hidden text-sm lg:block">Total estimado: <strong className="text-[#0d141b] dark:text-white">{calculateTotalHours()}h semanais</strong></span>
                                    <button
                                        onClick={handleFinish}
                                        disabled={loading}
                                        className="bg-[#137fec] hover:bg-blue-600 flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition-colors disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                                Finalizando...
                                            </>
                                        ) : (
                                            <>
                                                <span>Finalizar e Ativar Perfil</span>
                                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
