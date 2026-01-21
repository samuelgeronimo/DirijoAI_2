"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface InstructorProfileProps {
    instructorId: string;
}

interface Vehicle {
    model: string;
    brand: string;
    year: number;
    features: string[];
    photo_urls: string[];
}

interface Availability {
    day_of_week: number;
    start_time: string;
    end_time: string;
    hourly_rate_cents: number;
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    student_name: string; // We'll need to join with students/profiles to get this
    student_avatar?: string;
}

interface Instructor {
    id: string;
    bio: string;
    rating: number;
    superpowers: string[];
    video_url: string | null;
    service_city: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
    vehicles: Vehicle[];
    instructor_availability: Availability[];
}

export default function InstructorProfile({ instructorId }: InstructorProfileProps) {
    const router = useRouter();
    const [instructor, setInstructor] = useState<Instructor | null>(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Generate next 7 days starting tomorrow (D+1)
    const next7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + 1 + i);
        return d;
    });

    // Auto-select first day
    useEffect(() => {
        if (!selectedDate && next7Days.length > 0) {
            setSelectedDate(next7Days[0]);
        }
    }, []);

    // Helper to get day name
    const getDayName = (date: Date) => {
        return date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3).toUpperCase();
    };

    const getDayNumber = (date: Date) => {
        return date.getDate();
    };

    // Filter slots for selected date
    const getSlotsForDate = (date: Date | null) => {
        if (!date || !instructor) return [];

        // 0 = Sunday, 1 = Monday... matches Supabase day_of_week (usually)
        // Adjust if your DB uses 1=Monday. JS getDay() returns 0=Sun.
        // Assuming DB matches JS for simplicity or 0-6.
        const dayOfWeek = date.getDay();

        const availability = instructor.instructor_availability.find(a => a.day_of_week === dayOfWeek);
        if (!availability) return [];

        // Generate slots from start_time to end_time
        // This is a simplified logic. Ideally, check existing bookings.
        const slots = [];
        const startHour = parseInt(availability.start_time.split(':')[0]);
        const endHour = parseInt(availability.end_time.split(':')[0]);

        for (let h = startHour; h < endHour; h++) {
            slots.push(`${h}:00`);
        }
        return slots;
    };

    const availableSlots = getSlotsForDate(selectedDate);

    async function handleBooking() {
        if (!selectedDate || !selectedTime) {
            alert("Por favor, selecione uma data e horário.");
            return;
        }

        // Use local date string YYYY-MM-DD to avoid timezone shifts
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        const params = new URLSearchParams({
            instructorId: instructorId,
            date: dateStr,
            time: selectedTime
        });

        const targetUrl = `/checkout?${params.toString()}`;

        const supabase = createClient();
        const { data } = await supabase.auth.getUser();

        if (data.user) {
            router.push(targetUrl);
        } else {
            const redirectUrl = encodeURIComponent(targetUrl);
            router.push(`/login?redirectTo=${redirectUrl}`);
        }
    }

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        setCurrentUser(null);
        router.refresh();
        alert("Você saiu.");
    }

    useEffect(() => {
        async function fetchInstructorData() {
            setLoading(true);
            const supabase = createClient();

            // Fetch current user
            const { data: userData } = await supabase.auth.getUser();
            setCurrentUser(userData.user);

            // Fetch Instructor Details
            const { data: instructorData, error: instructorError } = await supabase
                .from('instructors')
                .select(`
                    id,
                    bio,
                    rating,
                    superpowers,
                    video_url,
                    service_city,
                    profiles!instructors_id_fkey(full_name, avatar_url),
                    vehicles(model, brand, year, features, photo_urls),
                    instructor_availability(day_of_week, start_time, end_time, hourly_rate_cents)
                `)
                .eq('id', instructorId)
                .single();

            if (instructorError) {
                console.error('Error fetching instructor:', instructorError);
            } else {
                // Fix issue where profiles might be returned as an array by Supabase join
                const profilesData = Array.isArray(instructorData.profiles) ? instructorData.profiles[0] : instructorData.profiles;
                setInstructor({ ...instructorData, profiles: profilesData } as unknown as Instructor);
            }

            // Fetch Success Gallery Photos from Storage
            const { data: galleryFiles } = await supabase
                .storage
                .from('success_gallery')
                .list(instructorId, {
                    limit: 10,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            if (galleryFiles && galleryFiles.length > 0) {
                const urls = galleryFiles.map(file => {
                    const { data } = supabase.storage
                        .from('success_gallery')
                        .getPublicUrl(`${instructorId}/${file.name}`);
                    return data.publicUrl;
                });
                setGalleryPhotos(urls.filter(url => url !== null));
            } else {
                setGalleryPhotos([]);
            }

            // Fetch Reviews (Mocking real join for now as reviews table might be empty or structure varies)
            // Ideally: .from('reviews').select('*, students(profiles(full_name, avatar_url))').eq('instructor_id', instructorId)
            // For now, let's try to fetch if table exists, otherwise use empty array or mocked if needed for demo

            /* 
            const { data: reviewsData, error: reviewsError } = await supabase
                .from('reviews')
                .select('id, rating, comment, created_at, student_id') // We need to match schema for student name
                .eq('instructor_id', instructorId);
            */
            // Temporarily using empty array for reviews until we confirm structure/data 
            setReviews([]);

            setLoading(false);
        }

        if (instructorId) {
            fetchInstructorData();
        }
    }, [instructorId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#137fec]"></div>
            </div>
        );
    }

    if (!instructor) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
                <p className="text-slate-500">Instrutor não encontrado.</p>
            </div>
        );
    }

    const hourlyRate = instructor.instructor_availability?.[0]?.hourly_rate_cents
        ? (instructor.instructor_availability[0].hourly_rate_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : 'Sob Consulta';

    const vehicle = instructor.vehicles?.[0];
    const profile = instructor.profiles;

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 transition-colors duration-200 pb-24 font-sans">
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] dark:border-b-slate-700 bg-white dark:bg-[#101922] px-10 py-3 z-50">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-4 text-[#137fec] group">
                            <div className="size-6">
                                <span className="material-symbols-outlined text-3xl">directions_car</span>
                            </div>
                            <h2 className="text-[#0d141b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">DireçãoPro</h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-9">
                            <Link className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-[#137fec]" href="/search">Instrutores</Link>
                            <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-[#137fec]" href="#">Como Funciona</a>
                            <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-[#137fec]" href="#">Minhas Aulas</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-[#4c739a] flex border-none bg-[#e7edf3] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg" data-icon="MagnifyingGlass">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-[#e7edf3] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:ring-0 h-full placeholder:text-[#4c739a] px-4 rounded-r-lg text-sm" placeholder="Buscar instrutor ou cidade" defaultValue="" />
                            </div>
                        </label>
                        <Link href="/login" className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold">
                            <span>Meu Perfil</span>
                        </Link>
                        {currentUser && (
                            <button
                                onClick={handleLogout}
                                className="flex min-w-[80px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span>Sair</span>
                            </button>
                        )}
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#137fec]/20" data-alt="User profile picture placeholder" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC85I0ZNoESrVXwJUS50eM4kIhGYrt2GGsomR5zhADYKBVur4GPcEcvQOmyqpKJj2AfEQ3y-KXO6TeLjbkziBj_xKUWgA08p9wXpr0xiGNudH-k5HjfeWEphuKEFHRP4lUqMdQgtP75eZ9mjDeDAH_LNDoSdZBSz1YhdrGz9VGS01zwjhuMg3r8QKh20MgzIOqk5ztWA8DLhkc1urx4DjaF2S_pIr2zTdraVBm0OcDEAc_s4ZNcti95GcVNLzxLxegs1tIXNEh6O7y4")' }}></div>
                    </div>
                </header>
                <main className="flex flex-1 justify-center py-8">
                    <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6 md:px-10">
                        <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-full lg:w-[480px] shrink-0">
                                <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg group cursor-pointer border-4 border-white dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
                                    {instructor.video_url ? (
                                        <video
                                            src={instructor.video_url}
                                            className="w-full h-full object-cover"
                                            controls
                                            poster={profile.avatar_url || ""}
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity group-hover:opacity-75" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbuUkCPsp_x_JGjQoBGMqsHQuokGgoOG2f1EUodgUGkRJ98RfLo-41MKjh-FE4vewkZL203QWs-uc0ZtYzmuYYi-0fEm0MfgHDoJra9KexLwX4-LT_BB9EzZpv3kBn_rmDunRwhYYzEwpXKBVTYJp7ff54VjCksYftij8Iw4Zqw-lyYrw2zojSQ5SRE2rxuKsC9Jzq5ykWkoPRlLKmbLVhrzP3H4psJwXfTrLlrC7gl_n72d9jpxOwdU0_rDAo8wrfLGa8cN8yT0Ny")' }}></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="size-20 bg-[#137fec]/90 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(19,127,236,0.6)] group-hover:scale-110 transition-transform duration-300 animate-pulse">
                                                    <span className="material-symbols-outlined text-5xl ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                                <p className="text-white font-bold text-sm flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-red-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>videocam</span>
                                                    Assista: Como perdi o medo e passei de 1ª
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                                <div className="flex flex-col gap-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Disponível Hoje</span>
                                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                                            <span className="material-symbols-outlined text-sm">location_on</span> {instructor.service_city}
                                        </span>
                                    </div>
                                    <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-bold tracking-tight">{profile.full_name}</h1>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#137fec] text-xl" title="Instrutor Verificado">verified</span>
                                        <p className="text-[#137fec] font-bold text-lg">Instrutor Credenciado DETRAN - Categoria B</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 pr-4">
                                        <div className="flex text-yellow-400 text-lg">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                    {star <= (instructor.rating || 0) ? 'star' : 'star_border'}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">{instructor.rating?.toFixed(1) || 'Novo'} ({reviews.length > 0 ? reviews.length : 128} avaliações)</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-[#0d141b] dark:text-white">+500</span>
                                        <p className="text-xs text-slate-500 font-medium">Alunos Aprovados</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="flex-1 min-w-[160px] flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#137fec] text-white text-base font-bold shadow-lg shadow-[#137fec]/30 hover:bg-[#137fec]/90 transition-all hover:-translate-y-0.5">
                                        <span>Ver Horários Livres</span>
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-4 border-2 border-slate-200 dark:border-slate-700 text-[#0d141b] dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined text-lg">favorite</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[#0d141b] dark:text-white text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                    Mural da Aprovação
                                </h3>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Últimos Aprovados</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {galleryPhotos.length > 0 ? (
                                    <>
                                        {galleryPhotos.slice(0, 5).map((url, idx) => (
                                            <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md fade-in animate-in">
                                                <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `url("${url}")` }}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                {/* Mock data for these overlays since we only have the image url for now */}
                                                <div className="absolute bottom-3 left-3 right-3 text-white">
                                                    <p className="font-bold text-sm">Aluno Aprovado</p>
                                                    <div className="inline-flex items-center gap-1 bg-green-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                                        <span className="material-symbols-outlined text-[12px]">check_circle</span> Conquista
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {galleryPhotos.length > 5 && (
                                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md hidden lg:block">
                                                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                                                    <p className="text-[#137fec] font-bold text-sm">+{galleryPhotos.length - 5} outros</p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkCFfBFG99wmS4K89Crsn1KhtCkxmnXSdzcn64zXhCMSo-6eVOz6lNUNVpElbjgtSb9EAJr_oXpg6wunVB6sVhFlaB5zRGsaNk9V4mZ5uUW2QYqS5b4wLBeUK2rsJOyW9-DDcomJBHm3hlJBdvheFc6hhN5dzYEJybk2zVOuGPoQIH6_BCkcvHRJ_n9e2HaqQtXDsqsJO9I1-zxPenxKoUf0gEyzQ2zdSdLm9cSrRClYLQfwp-EJH5QA4fICfsMO4HNZH4Ruu0ccYn")', backgroundSize: 'cover' }}></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                                <p className="font-bold text-sm">Mariana C.</p>
                                                <div className="inline-flex items-center gap-1 bg-green-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                                    <span className="material-symbols-outlined text-[12px]">check_circle</span> Passou de 1ª
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMHBgV3GbjDnKMge98mdWKzzByUycM2PHETZSv2IpMNFVNDX4i6JVTxREbHNPVnTQmKe3wq_c7mvwZeXFGTt4YnM-Lq4Mg0ed9unr-A2J921Y_IeWH23cj2fY869puuOuTYUMEPUxO5aG-EHzEQF7X34nOWsSEDNSd4bIQmLoZP73kEmtfK0HIcVnoZNVEQNBXNOSzNY2U_3_4l9kEmAE1Z2Fd3c8i4N8iCwocfuUln-U8nqd7EuSr7FrGTolJszj19AbY6K_UcwgY")', backgroundSize: 'cover' }}></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                                <p className="font-bold text-sm">Rodrigo M.</p>
                                                <div className="inline-flex items-center gap-1 bg-blue-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                                    <span className="material-symbols-outlined text-[12px]">timer</span> 30 dias de aula
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md hidden md:block">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADnxtkMhcF9bzx6J-Tf-4SIGtDvMcUzeN4d5T5OjunMuDElH2KT2v8OQ4JD4AQLeSnr5kySaVg1_pbeFwuyaa3YG4l_XS7rF0_R_wrmU61TPJq6-hB1VJs15yQmDtpiEiq4__73upHRcHJl3p_DJh4LcAIuIvOz5YDsa0UH9oWmSzorWsS5mRdmUg3iqhbGNlprPzGyZhVndGPVCetVhrbOGpe4iiTy38WpPJYisyrOPNEW_Ws-iYlgOj6EY_l9ZmKaNvpccDkdWFC")', backgroundSize: 'cover' }}></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                                <p className="font-bold text-sm">Felipe S.</p>
                                                <div className="inline-flex items-center gap-1 bg-green-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                                    <span className="material-symbols-outlined text-[12px]">check_circle</span> Passou de 1ª
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md hidden md:block">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsQ9TDz5ACfe9SDTYQntSQOWUcjLrbO5gyRqM-CS9G85p3AI2gDl6HXkNDk4PXMX6ieV0qT_VZ97qoGOOVWimFNkDGqgj0Eoq5VqiZn4pb0kEAG_VIE-5-E4d9rm-aWP2T1bj_l6qYCvtR79VbFbFcih025veuKS_u4Ipb0fhyMCqmXEt3kBEhQeG3FE4v7oAM2Jva-plaMFwHiypg_Xnn6i4plkDK3JJx3HBDOl6MM87C6AyXp5TyjJ--liyCLHnTB1JXP26oIgTD")', backgroundSize: 'cover' }}></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                                <p className="font-bold text-sm">Carla B.</p>
                                                <div className="inline-flex items-center gap-1 bg-purple-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                                    <span className="material-symbols-outlined text-[12px]">psychology</span> Perdeu o medo
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md hidden lg:block">
                                            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                                                <p className="text-[#137fec] font-bold text-sm">+400 outros</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                <div className="border-b border-slate-200 dark:border-slate-800">
                                    <div className="flex gap-8">
                                        <a className="flex flex-col items-center border-b-[3px] border-[#137fec] text-[#137fec] pb-3 pt-2" href="#">
                                            <span className="text-sm font-bold tracking-wide">SOBRE</span>
                                        </a>
                                        <a className="flex flex-col items-center border-b-[3px] border-transparent text-[#4c739a] hover:text-[#137fec] pb-3 pt-2" href="#">
                                            <span className="text-sm font-bold tracking-wide">VEÍCULO</span>
                                        </a>
                                        <a className="flex flex-col items-center border-b-[3px] border-transparent text-[#4c739a] hover:text-[#137fec] pb-3 pt-2" href="#">
                                            <span className="text-sm font-bold tracking-wide">AVALIAÇÕES</span>
                                        </a>
                                    </div>
                                </div>
                                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-[#0d141b] dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#137fec]">person</span>
                                        Bio &amp; Diferenciais
                                    </h3>
                                    <div className="mb-6">
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                                            {instructor.bio || "Transformo pessoas ansiosas em motoristas confiantes em tempo recorde."}
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            {instructor.superpowers?.map((power, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                                    <span className="text-slate-700 dark:text-slate-300 text-sm capitalize"><strong>Especialista:</strong> {power}</span>
                                                </li>
                                            ))}
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                                <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Simulação de Exame:</strong> Treino prático nas rotas oficiais do DETRAN.</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border border-blue-100 dark:border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm text-[#137fec] group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-3xl">menu_book</span>
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h4 className="font-bold text-[#0d141b] dark:text-white text-base">Método Manual Anti-Reprovação</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 mb-2">Exclusivo para alunos: O guia de bolso para eliminar os 5 erros que mais reprovam na prova prática.</p>
                                                <a className="text-[#137fec] text-sm font-bold hover:underline flex items-center justify-center sm:justify-start gap-1" href="#">
                                                    Saiba mais <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                                        <div className="flex items-center gap-3 p-3 bg-[#137fec]/5 rounded-lg border border-[#137fec]/10">
                                            <span className="material-symbols-outlined text-[#137fec]">verified_user</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Credencial DETRAN 2024</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-[#137fec]/5 rounded-lg border border-[#137fec]/10">
                                            <span className="material-symbols-outlined text-[#137fec]">school</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pedagogia do Trânsito</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-[#137fec]/5 rounded-lg border border-[#137fec]/10">
                                            <span className="material-symbols-outlined text-[#137fec]">history</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">92% de Aprovação</span>
                                        </div>
                                    </div>
                                </section>
                                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-[#0d141b] dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#137fec]">directions_car</span>
                                        Galeria do Veículo
                                    </h3>
                                    {vehicle ? (
                                        <>
                                            <p className="text-[#4c739a] text-sm mb-4">{vehicle.brand} {vehicle.model} {vehicle.year} - {vehicle.features?.join(', ')}</p>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {vehicle.photo_urls?.map((url, idx) => (
                                                    <div key={idx} className="aspect-video bg-slate-200 rounded-lg overflow-hidden group cursor-pointer">
                                                        <div className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `url("${url}")` }}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-slate-500 text-sm">Nenhum veículo cadastrado.</p>
                                    )}
                                </section>
                                <section className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-[#0d141b] dark:text-white text-xl font-bold flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#137fec]">forum</span>
                                            Avaliações de Alunos
                                        </h3>
                                        <button className="text-[#137fec] text-sm font-bold hover:underline">Ver todas</button>
                                    </div>
                                    <div className="space-y-4">
                                        {/* Mock Reviews matching the prototype for visual consistency until real data is ready */}
                                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between mb-3">
                                                <div className="flex gap-3">
                                                    <div className="size-10 rounded-full bg-slate-200" data-alt="Student profile photo" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkCFfBFG99wmS4K89Crsn1KhtCkxmnXSdzcn64zXhCMSo-6eVOz6lNUNVpElbjgtSb9EAJr_oXpg6wunVB6sVhFlaB5zRGsaNk9V4mZ5uUW2QYqS5b4wLBeUK2rsJOyW9-DDcomJBHm3hlJBdvheFc6hhN5dzYEJybk2zVOuGPoQIH6_BCkcvHRJ_n9e2HaqQtXDsqsJO9I1-zxPenxKoUf0gEyzQ2zdSdLm9cSrRClYLQfwp-EJH5QA4fICfsMO4HNZH4Ruu0ccYn")', backgroundSize: 'cover' }}></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0d141b] dark:text-white">Mariana Costa</p>
                                                        <p className="text-xs text-[#4c739a]">Aprovada em Junho/2023</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                &quot;O Carlos é extremamente paciente. Eu tinha muito medo de trânsito pesado e hoje dirijo tranquilamente para o trabalho. Recomendo demais!&quot;
                                            </p>
                                        </div>
                                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between mb-3">
                                                <div className="flex gap-3">
                                                    <div className="size-10 rounded-full bg-slate-200" data-alt="Student profile photo" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMHBgV3GbjDnKMge98mdWKzzByUycM2PHETZSv2IpMNFVNDX4i6JVTxREbHNPVnTQmKe3wq_c7mvwZeXFGTt4YnM-Lq4Mg0ed9unr-A2J921Y_IeWH23cj2fY869puuOuTYUMEPUxO5aG-EHzEQF7X34nOWsSEDNSd4bIQmLoZP73kEmtfK0HIcVnoZNVEQNBXNOSzNY2U_3_4l9kEmAE1Z2Fd3c8i4N8iCwocfuUln-U8nqd7EuSr7FrGTolJszj19AbY6K_UcwgY")', backgroundSize: 'cover' }}></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0d141b] dark:text-white">Rodrigo Mendes</p>
                                                        <p className="text-xs text-[#4c739a]">Habilitado em Agosto/2023</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                &quot;Passei de primeira no exame! O foco dele na baliza foi o diferencial. Carro muito novo e fácil de dirigir.&quot;
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="relative">
                                <div className="sticky top-8 flex flex-col gap-4">
                                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800">
                                        <div className="bg-[#137fec] p-4 text-white">
                                            <p className="text-sm font-medium opacity-90 uppercase tracking-wider flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">event_available</span>
                                                Agenda Inteligente
                                            </p>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <p className="text-sm font-bold text-[#0d141b] dark:text-white">
                                                        {selectedDate ? selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Selecione'}
                                                    </p>
                                                </div>

                                                {/* Dynamic Days Grid */}
                                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
                                                    {next7Days.map((date, idx) => {
                                                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                                                        return (
                                                            <button
                                                                key={idx}
                                                                onClick={() => {
                                                                    setSelectedDate(date);
                                                                    setSelectedTime(null);
                                                                }}
                                                                className={`flex flex-col items-center justify-center min-w-[45px] h-[55px] rounded-lg border transition-all ${isSelected
                                                                    ? 'bg-[#137fec] border-[#137fec] text-white shadow-md'
                                                                    : 'bg-white dark:bg-[#1a2632] border-slate-200 dark:border-slate-800 text-slate-500 hover:border-[#137fec]/50'
                                                                    }`}
                                                            >
                                                                <span className="text-[9px] font-bold uppercase">{getDayName(date)}</span>
                                                                <span className="text-base font-black leading-none">{getDayNumber(date)}</span>
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-xs p-2.5 rounded-lg border border-amber-200 dark:border-amber-800 mb-4 flex items-start gap-2">
                                                <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">timer</span>
                                                <span className="font-medium leading-tight">D+1: Agendamento mínimo com 24h de antecedência.</span>
                                            </div>

                                            <div className="mb-2">
                                                <p className="text-xs font-bold text-[#4c739a] mb-3 uppercase tracking-wide">
                                                    {selectedDate ? `Horários para ${selectedDate.toLocaleDateString('pt-BR')}` : 'Horários'}
                                                </p>

                                                {availableSlots.length > 0 ? (
                                                    <div className="grid grid-cols-3 gap-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
                                                        {availableSlots.map((slot) => (
                                                            <button
                                                                key={slot}
                                                                onClick={() => setSelectedTime(slot)}
                                                                className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all ${selectedTime === slot
                                                                    ? 'bg-[#137fec] border-[#137fec] text-white shadow-md'
                                                                    : 'bg-white dark:bg-[#1a2632] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#137fec]'
                                                                    }`}
                                                            >
                                                                {slot}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-4 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                                                        Nenhum horário disponível nesta data.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#137fec]/5 dark:bg-slate-900 border border-[#137fec]/20 p-4 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#137fec]">savings</span>
                                            <div>
                                                <p className="text-xs font-bold text-[#137fec] mb-1">Economize no Pacote</p>
                                                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">Feche 10 aulas e pague apenas <strong>R$ 60/aula</strong>. Desconto aplicado no checkout.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-12 mb-16">
                    <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 text-[#137fec] mb-4">
                                <span className="material-symbols-outlined">directions_car</span>
                                <h2 className="text-xl font-bold">DireçãoPro</h2>
                            </div>
                            <p className="text-sm text-slate-500">Conectando futuros motoristas aos melhores instrutores do Brasil desde 2018.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Para Alunos</h4>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li><a className="hover:text-[#137fec]" href="#">Buscar Instrutores</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Minhas Aulas</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Simulado DETRAN</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Para Instrutores</h4>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li><a className="hover:text-[#137fec]" href="#">Cadastrar Perfil</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Gestão de Agenda</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Portal do Parceiro</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Suporte</h4>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li><a className="hover:text-[#137fec]" href="#">Central de Ajuda</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Termos de Uso</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Privacidade</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-[100] px-6 py-3">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Melhor preço no pacote</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm text-slate-600 dark:text-slate-300 font-bold">A partir de</span>
                            <span className="text-2xl font-bold text-[#137fec]">{hourlyRate}</span>
                            <span className="text-sm text-slate-500 font-medium">/aula</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold text-base py-3 px-8 rounded-lg shadow-lg shadow-[#137fec]/40 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <span>RESERVAR HORÁRIO</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
