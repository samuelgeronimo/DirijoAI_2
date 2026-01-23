"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import SearchEmptyState from './SearchEmptyState';

// Helper to check time intersection
const hasTimeSlot = (availability: any[], period: 'morning' | 'afternoon' | 'night') => {
    if (!availability || availability.length === 0) return false;

    // Morning: 06-12, Afternoon: 12-18, Night: 18-23
    const periodRanges = {
        morning: { start: 6, end: 12 },
        afternoon: { start: 12, end: 18 },
        night: { start: 18, end: 23 }
    };

    const range = periodRanges[period];

    return availability.some(slot => {
        const start = parseInt(slot.start_time.split(':')[0]);
        const end = parseInt(slot.end_time.split(':')[0]);
        // Check overlap
        return (start < range.end && end > range.start);
    });
};

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || "";

    const [instructors, setInstructors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters State
    const [fearOfDriving, setFearOfDriving] = useState(false);
    const [selectedTime, setSelectedTime] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [minRating, setMinRating] = useState(0);
    const [serviceModeFilter, setServiceModeFilter] = useState<string[]>([]);
    const [vehicleFeaturesFilter, setVehicleFeaturesFilter] = useState<string[]>([]);

    const VEHICLE_FEATURES = ['❄️ Ar Condicionado', '💪 Direção Elétrica', '🛑 Freio Duplo', '📹 Câmera de Ré', '⚙️ Câmbio Automático', '🔌 Carregador USB', '⚡ Carregador USB-C'];

    const [user, setUser] = useState<any>(null);

    // Fetch Data
    useEffect(() => {
        const supabase = createClient();

        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        checkUser();

        async function fetchInstructors() {
            setLoading(true);

            let queryBuilder = supabase
                .from('instructors')
                .select(`
                    id,
                    rating,
                    bio,
                    city,
                    service_city,
                    service_mode,
                    state,
                    video_url,
                    superpowers,
                    profiles!instructors_id_fkey(full_name, avatar_url),
                    vehicles(model, brand, year, color, features, photo_urls, is_active),
                    instructor_availability(hourly_rate_cents, day_of_week, start_time, end_time)
                `);

            if (query && query.length > 2) {
                queryBuilder = queryBuilder.ilike('service_city', `%${query}%`);
            }

            const { data, error } = await queryBuilder;

            if (error) {
                console.error('Error fetching instructors:', error);
            } else {
                setInstructors(data || []);
            }
            setLoading(false);
        }

        fetchInstructors();
    }, [query]);

    // Filtering and Sorting
    const sortedAndFilteredInstructors = useMemo(() => {
        let result = [...instructors];

        // 1. Filters
        if (fearOfDriving) {
            result = result.filter(inst =>
                inst.superpowers?.some((p: string) =>
                    p.toLowerCase().includes('psicologia') ||
                    p.toLowerCase().includes('psicólogo')
                )
            );
        }

        if (selectedTime !== 'all') {
            result = result.filter(inst => hasTimeSlot(inst.instructor_availability, selectedTime));
        }

        if (minRating > 0) {
            result = result.filter(inst => (inst.rating || 0) >= minRating);
        }

        result = result.filter(inst => {
            const price = (inst.instructor_availability?.[0]?.hourly_rate_cents || 0) / 100;
            if (price === 0) return true; // Show if price not set or filter out? Assuming show.
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // SERVICE MODE FILTER
        if (serviceModeFilter.length > 0) {
            result = result.filter(inst => {
                // If instructor has no mode set, filter them out? or defaulting? Defaulting to exclude.
                if (!inst.service_mode) return false;
                return serviceModeFilter.some(filter =>
                    inst.service_mode === filter || inst.service_mode === 'both'
                );
            });
        }

        // VEHICLE FEATURES FILTER
        if (vehicleFeaturesFilter.length > 0) {
            result = result.filter(inst => {
                // Check if ANY of the instructor's vehicles has ALL selected features
                return inst.vehicles?.some((vehicle: any) =>
                    vehicleFeaturesFilter.every((feature) => vehicle.features?.includes(feature))
                );
            });
        }

        // 2. Sorting
        // Formula: score = (HasVideo ? 20 : 0) + (HasAvailability ? 10 : 0) + Rating
        result.sort((a, b) => {
            const getScore = (inst: any) => {
                let score = 0;
                // Has Video (+20)
                if (inst.video_url) score += 20;

                // Has Availability (+10) - Check if array not empty
                if (inst.instructor_availability?.length > 0) score += 10;

                // Rating (+Rating)
                score += (inst.rating || 0);

                return score;
            };

            return getScore(b) - getScore(a); // Descending
        });

        return result;
    }, [instructors, fearOfDriving, selectedTime, minRating, priceRange, serviceModeFilter, vehicleFeaturesFilter]);

    const hasResults = sortedAndFilteredInstructors.length > 0;

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#101922]/95 backdrop-blur-md border-b border-[#e7edf3] dark:border-slate-800 shadow-sm">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-[#137fec] text-white p-1 rounded-lg group-hover:bg-[#137fec]/90 transition-colors">
                                <span className="material-symbols-outlined text-2xl">local_taxi</span>
                            </div>
                            <h2 className="text-[#0d141b] dark:text-white text-2xl font-black tracking-tighter uppercase italic">
                                Dirijo<span className="text-[#137fec]">.ai</span>
                            </h2>
                        </Link>

                        {/* Search Input in Header */}
                        <div className="hidden md:flex relative w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-[#137fec] text-sm text-slate-900 dark:text-white placeholder-slate-500"
                                placeholder="Buscar por cidade..."
                                defaultValue={query}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600 dark:text-slate-400">
                            <Link href="/" className="hover:text-[#137fec] transition-colors">Início</Link>
                            <Link href="#" className="hover:text-[#137fec] transition-colors">Como Funciona</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <Link href="/instructor" className="hidden md:block text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#137fec] transition-colors">
                                Sou Instrutor
                            </Link>
                            {user ? (
                                <Link
                                    href="/student/dashboard"
                                    className="bg-[#137fec] hover:bg-[#137fec]/90 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">person</span>
                                    Meu Perfil
                                </Link>
                            ) : (
                                <button className="bg-[#137fec] hover:bg-[#137fec]/90 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-blue-500/20 transition-all">
                                    Entrar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {!hasResults && !loading ? (
                    <SearchEmptyState city={query} />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1200px] mx-auto px-4 py-8 flex-1">

                        {/* Filters Sidebar */}
                        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#137fec]">tune</span>
                                    Filtros
                                </h3>

                                {/* Fear Filter */}
                                <div className="mb-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={fearOfDriving}
                                                onChange={(e) => setFearOfDriving(e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#137fec]"></div>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#137fec] transition-colors leading-tight">
                                            Tenho Medo de Dirigir
                                        </span>
                                    </label>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Mostra apenas instrutores com especialização em psicologia.
                                    </p>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

                                {/* Rating Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Avaliação Mínima</h4>
                                    <div className="flex flex-col gap-2">
                                        {[0, 4, 4.5, 4.8].map((rating) => (
                                            <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="ratingFilter"
                                                    checked={minRating === rating}
                                                    onChange={() => setMinRating(rating)}
                                                    className="text-[#137fec] focus:ring-[#137fec]"
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                                                    {rating === 0 ? "Qualquer nota" : <>{rating}+ <span className="material-symbols-outlined text-amber-400 text-sm">star</span></>}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

                                {/* Time Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Horário</h4>
                                    <div className="flex flex-col gap-2">
                                        {[
                                            { id: 'all', label: 'Todos' },
                                            { id: 'morning', label: 'Manhã (06h - 12h)' },
                                            { id: 'afternoon', label: 'Tarde (12h - 18h)' },
                                            { id: 'night', label: 'Noite (18h - 23h)' }
                                        ].map((time) => (
                                            <label key={time.id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="timeFilter"
                                                    checked={selectedTime === time.id}
                                                    onChange={() => setSelectedTime(time.id as any)}
                                                    className="text-[#137fec] focus:ring-[#137fec]"
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300">{time.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

                                {/* Price Filter (Simple Range) */}
                                <div className="mb-2">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Preço / Hora</h4>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="relative flex-1">
                                            <span className="absolute left-2 top-1.5 text-xs text-slate-400">R$</span>
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-full pl-6 pr-2 py-1 text-sm border rounded dark:bg-slate-800 dark:border-slate-700"
                                            />
                                        </div>
                                        <span className="text-slate-400">-</span>
                                        <div className="relative flex-1">
                                            <span className="absolute left-2 top-1.5 text-xs text-slate-400">R$</span>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-full pl-6 pr-2 py-1 text-sm border rounded dark:bg-slate-800 dark:border-slate-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>Mín</span>
                                        <span>Máx</span>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

                                {/* Service Mode Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Modo de Atendimento</h4>
                                    <div className="flex flex-col gap-2">
                                        {[
                                            { id: 'student_home', label: 'Vou até o aluno' },
                                            { id: 'meeting_point', label: 'Ponto de Encontro' }
                                        ].map((mode) => (
                                            <label key={mode.id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={serviceModeFilter.includes(mode.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setServiceModeFilter([...serviceModeFilter, mode.id]);
                                                        } else {
                                                            setServiceModeFilter(serviceModeFilter.filter(id => id !== mode.id));
                                                        }
                                                    }}
                                                    className="rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:border-slate-700 dark:bg-slate-800"
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300">{mode.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

                                {/* Vehicle Features Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Conveniências do Veículo</h4>
                                    <div className="flex flex-col gap-2">
                                        {VEHICLE_FEATURES.map((feature) => (
                                            <label key={feature} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={vehicleFeaturesFilter.includes(feature)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setVehicleFeaturesFilter([...vehicleFeaturesFilter, feature]);
                                                        } else {
                                                            setVehicleFeaturesFilter(vehicleFeaturesFilter.filter(f => f !== feature));
                                                        }
                                                    }}
                                                    className="rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:border-slate-700 dark:bg-slate-800"
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </aside>

                        {/* Results Area */}
                        <div className="flex-1">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {sortedAndFilteredInstructors.length} instrutores encontrados
                                    {query && <span className="text-slate-500 font-normal text-base">para "{query}"</span>}
                                </h2>

                                {/* Active Filters Summary */}
                                {(fearOfDriving || selectedTime !== 'all' || minRating > 0) && (
                                    <button
                                        onClick={() => {
                                            setFearOfDriving(false);
                                            setSelectedTime('all');
                                            setMinRating(0);
                                            setPriceRange([0, 200]);
                                            setServiceModeFilter([]);
                                            setVehicleFeaturesFilter([]);
                                        }}
                                        className="text-sm text-[#137fec] font-medium hover:underline bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full"
                                    >
                                        Limpar Filtros
                                    </button>
                                )}
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="animate-pulse flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                            <div className="h-32 w-32 md:w-48 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0"></div>
                                            <div className="flex-1 space-y-3 w-full">
                                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : !hasResults ? (
                                <SearchEmptyState city={query} />
                            ) : (
                                <div className="space-y-4">
                                    {sortedAndFilteredInstructors.map((instructor) => {
                                        const priceCents = instructor.instructor_availability?.[0]?.hourly_rate_cents || 0;
                                        const priceFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceCents / 100);
                                        const vehicle = instructor.vehicles?.[0]; // Assuming first vehicle

                                        return (
                                            <Link
                                                href={`/instructor/${instructor.id}`}
                                                key={instructor.id}
                                                className="group flex flex-col md:flex-row gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#137fec] hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300"
                                            >
                                                {/* Thumbnail / Video Indicator */}
                                                <div className="relative w-full md:w-48 aspect-video md:aspect-[4/3] shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                    {/* Prefer Video thumbnail if available (mocked) or Profile/Car */}
                                                    {vehicle?.photo_urls?.[0] ? (
                                                        <img src={vehicle.photo_urls[0]} alt="Veículo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800">
                                                            <span className="material-symbols-outlined text-4xl">directions_car</span>
                                                        </div>
                                                    )}

                                                    {/* Video Tag Overlay */}
                                                    {instructor.video_url && (
                                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                                                            <span className="material-symbols-outlined text-xs fill-current">play_circle</span>
                                                            VÍDEO
                                                        </div>
                                                    )}

                                                    {/* Avatar Overlay (Bottom Left) */}
                                                    <div className="absolute bottom-2 left-2 size-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 overflow-hidden shadow-md z-10">
                                                        {instructor.profiles?.avatar_url ? (
                                                            <img src={instructor.profiles.avatar_url} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xs">
                                                                {instructor.profiles?.full_name?.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">
                                                                    {instructor.profiles.full_name}
                                                                </h3>
                                                                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm mt-0.5">
                                                                    <span>{instructor.rating || "5.0"}</span>
                                                                    <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                                                    <span className="text-slate-400 font-normal ml-1 text-xs">({Math.floor(Math.random() * 50) + 10} avaliações)</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Hora/Aula</div>
                                                                <div className="text-xl font-black text-slate-900 dark:text-white text-[#137fec]">
                                                                    {priceFormatted}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            {instructor.superpowers?.slice(0, 3).map((power: string, idx: number) => (
                                                                <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-100 dark:border-blue-900/50">
                                                                    {power}
                                                                </span>
                                                            ))}
                                                            {instructor.superpowers?.length > 3 && (
                                                                <span className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-500 text-xs border border-slate-100 dark:border-slate-700">
                                                                    +{instructor.superpowers.length - 3}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {vehicle && (
                                                            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg w-fit">
                                                                <span className="material-symbols-outlined text-[18px]">directions_car</span>
                                                                <span className="font-medium">{vehicle.model} {vehicle.year}</span>
                                                                <span className="text-slate-400">•</span>
                                                                <span>{vehicle.color}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                            <div className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-[16px] text-green-500">verified</span>
                                                                <span>Verificado</span>
                                                            </div>
                                                            {instructor.video_url && (
                                                                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                                                                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                                                                    <span>Vídeo Introdução</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#137fec] group-hover:underline">
                                                            Ver Agenda
                                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* Footer */}
            <footer className="bg-slate-900 py-12 text-slate-400 border-t border-slate-800 mt-auto">
                <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-800 text-white p-1 rounded-lg">
                            <span className="material-symbols-outlined text-2xl">local_taxi</span>
                        </div>
                        <span className="text-white font-bold text-xl tracking-tighter italic">Dirijo.ai</span>
                    </div>
                    <div className="flex gap-6 text-sm font-medium">
                        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-white transition-colors">Contato</a>
                    </div>
                    <p className="text-xs">© 2024 Dirijo Tecnologia Ltda.</p>
                </div>
            </footer>
        </div >
    );
}
