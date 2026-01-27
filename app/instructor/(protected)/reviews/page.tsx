"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Review {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
    orders: {
        plan_name: string;
    };
}

export default function InstructorReviewsDashboard() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ count: 0, average: 0 });

    useEffect(() => {
        async function fetchReviews() {
            setLoading(true);
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from('reviews')
                .select(`
                    id,
                    rating,
                    comment,
                    created_at,
                    profiles:student_id (full_name, avatar_url),
                    orders:order_id (plan_name)
                `)
                .eq('instructor_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching reviews", error);
            } else if (data) {
                // @ts-ignore
                setReviews(data);

                // Calculate Stats
                const total = data.length;
                const sum = data.reduce((acc, r) => acc + r.rating, 0);
                const avg = total > 0 ? (sum / total).toFixed(1) : "0.0";

                // @ts-ignore
                setStats({ count: total, average: avg });
            }
            setLoading(false);
        }

        fetchReviews();
    }, []);

    // Helper to format date relative or absolute
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    };

    if (loading) {
        return (
            <div className="flex-1 bg-instructor-bg-dark h-[calc(100vh-theme(spacing.20))] overflow-y-auto p-4 md:p-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-instructor-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12 lg:py-10">
            {/* Page Heading */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Avaliações
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Veja o que seus alunos estão falando sobre você.
                    </p>
                </div>
            </header>

            <div className="flex flex-col gap-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-instructor-surface-dark-2 rounded-2xl p-6 border border-white/5 flex items-center gap-4">
                        <div className="bg-yellow-500/10 p-3 rounded-xl">
                            <span className="material-symbols-outlined text-yellow-500 text-3xl">star</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white leading-none">{stats.average}</p>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mt-1">Média Geral</p>
                        </div>
                    </div>
                    <div className="bg-instructor-surface-dark-2 rounded-2xl p-6 border border-white/5 flex items-center gap-4">
                        <div className="bg-blue-500/10 p-3 rounded-xl">
                            <span className="material-symbols-outlined text-blue-500 text-3xl">chat_bubble</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white leading-none">{stats.count}</p>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mt-1">Comentários</p>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="grid grid-cols-1 gap-4">
                    {reviews.length === 0 ? (
                        <div className="bg-instructor-surface-dark-2 rounded-2xl p-12 text-center border border-white/5 border-dashed">
                            <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-white/20 text-4xl">rate_review</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Nenhuma avaliação ainda</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Incentive seus alunos a avaliarem suas aulas após completarem os pacotes.
                            </p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="bg-instructor-surface-dark-2 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex items-start gap-4 shrink-0 md:w-64">
                                        <div
                                            className="w-12 h-12 rounded-full bg-cover bg-center border border-white/10"
                                            style={{ backgroundImage: `url('${review.profiles?.avatar_url || ''}')` }}
                                        ></div>
                                        <div>
                                            <h4 className="text-white font-bold">{review.profiles?.full_name || 'Aluno'}</h4>
                                            <p className="text-gray-400 text-xs mt-0.5">{review.orders?.plan_name}</p>
                                            <p className="text-gray-500 text-[10px] mt-2 font-mono uppercase tracking-widest">{formatDate(review.created_at)}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                                        <div className="flex mb-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`material-symbols-outlined text-xl ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-700'}`}
                                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                                >
                                                    star
                                                </span>
                                            ))}
                                        </div>
                                        {review.comment ? (
                                            <p className="text-gray-300 leading-relaxed text-sm">"{review.comment}"</p>
                                        ) : (
                                            <p className="text-gray-600 italic text-sm">Sem comentário por escrito.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
