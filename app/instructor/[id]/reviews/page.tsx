"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface Review {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
}

interface InstructorShort {
    id: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
    rating: number;
}

export default function PublicInstructorReviewsPage() {
    const params = useParams();
    const instructorId = params.id as string;

    const [reviews, setReviews] = useState<Review[]>([]);
    const [instructor, setInstructor] = useState<InstructorShort | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const supabase = createClient();

            // Fetch Instructor Basic Info
            const { data: instData } = await supabase
                .from('instructors')
                .select(`
                    id,
                    rating,
                    profiles!instructors_id_fkey(full_name, avatar_url)
                `)
                .eq('id', instructorId)
                .single();

            if (instData) {
                // @ts-ignore
                setInstructor(instData);
            }

            // Fetch All Reviews
            const { data: reviewsData } = await supabase
                .from('reviews')
                .select(`
                    id,
                    rating,
                    comment,
                    created_at,
                    profiles:student_id (full_name, avatar_url)
                `)
                .eq('instructor_id', instructorId)
                .order('created_at', { ascending: false });

            if (reviewsData) {
                // @ts-ignore
                setReviews(reviewsData);
            }

            setLoading(false);
        }

        if (instructorId) {
            fetchData();
        }
    }, [instructorId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#137fec]"></div>
            </div>
        );
    }

    if (!instructor) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
                <p className="text-slate-500">Instrutor não encontrado.</p>
                <Link href="/search" className="ml-2 text-[#137fec] hover:underline">Voltar</Link>
            </div>
        );
    }

    // @ts-ignore
    const profile = instructor.profiles;

    return (
        <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans text-[#0d141b] dark:text-slate-100">
            {/* Header */}
            <header className="border-b border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#101922] px-6 py-4 sticky top-0 z-50">
                <div className="max-w-[800px] mx-auto flex items-center gap-4">
                    <Link href={`/instructor/${instructorId}`} className="text-slate-500 hover:text-[#137fec] transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-700"
                            style={{ backgroundImage: `url('${profile?.avatar_url || ''}')` }}
                        ></div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">{profile?.full_name}</h1>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{instructor.rating?.toFixed(1)} • {reviews.length} avaliações</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[800px] mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Todas as Avaliações</h2>
                </div>

                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between mb-3 items-start">
                                <div className="flex gap-3">
                                    <div
                                        className="size-10 rounded-full bg-slate-200 bg-cover bg-center"
                                        style={{ backgroundImage: `url('${review.profiles?.avatar_url || "https://via.placeholder.com/150"}')` }}
                                    ></div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0d141b] dark:text-white">{review.profiles?.full_name}</p>
                                        <p className="text-xs text-[#4c739a]">{new Date(review.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {i < review.rating ? 'star' : 'star_border'}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {review.comment && (
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    &quot;{review.comment}&quot;
                                </p>
                            )}
                        </div>
                    ))}

                    {reviews.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">rate_review</span>
                            <p className="text-slate-500">Nenhuma avaliação encontrada.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
