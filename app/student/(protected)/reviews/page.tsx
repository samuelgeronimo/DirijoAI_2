"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

// Types
interface Instructor {
    full_name: string;
    avatar_url: string;
}

interface Order {
    id: string;
    instructor_id: string;
    plan_name: string;
    lessons_count: number;
    amount_cents: number;
    instructors: {
        profiles: {
            full_name: string;
            avatar_url: string;
        };
    };
    created_at: string;
}

interface OrderWithProgress extends Order {
    completed_lessons: number;
    has_review: boolean;
}

export default function InstructorReviewsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<OrderWithProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Review Form State
    const [selectedOrder, setSelectedOrder] = useState<OrderWithProgress | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return; // Should be handled by middleware/layout
            setUser(user);

            // 1. Fetch Paid Orders
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select(`
                    id,
                    instructor_id,
                    plan_name,
                    lessons_count,
                    amount_cents,
                    created_at,
                    instructors:instructor_id (
                        profiles (full_name, avatar_url)
                    )
                `)
                .eq('student_id', user.id)
                .eq('status', 'paid')
                .order('created_at', { ascending: false });

            if (ordersError || !ordersData) {
                console.error("Error fetching orders", ordersError);
                setLoading(false);
                return;
            }

            // 2. Fetch Completed Lessons Count per Instructor (approximate for order mapping)
            // A perfect system would link lesson -> order, but here we count total completed lessons vs total purchased lessons for that instructor
            // To simplify for this MVP: We check if total completed lessons >= sum of lessons_count for all previous orders + this one.
            // Actually, simplified logic: Check if total completed lessons for this instructor >= lessons_count of this order.
            // Note: This is a loose check. Ideally, we link lessons to orders.

            const processedOrders: OrderWithProgress[] = [];

            for (const order of ordersData) {
                // Count completed lessons for this instructor
                const { count, error: lessonsError } = await supabase
                    .from('lessons')
                    .select('*', { count: 'exact', head: true })
                    .eq('student_id', user.id)
                    .eq('instructor_id', order.instructor_id)
                    .eq('status', 'completed'); // Provided status is 'completed'

                // Check if already reviewed
                const { data: reviewData } = await supabase
                    .from('reviews')
                    .select('id')
                    .eq('student_id', user.id)
                    .eq('order_id', order.id)
                    .single();

                processedOrders.push({
                    ...order,
                    // @ts-ignore
                    instructors: order.instructors,
                    completed_lessons: count || 0,
                    has_review: !!reviewData
                });
            }

            setOrders(processedOrders);
            setLoading(false);
        }

        fetchData();
    }, []);

    const submitReview = async () => {
        if (!selectedOrder || rating === 0) return;
        setSubmitting(true);

        const supabase = createClient();
        const { error } = await supabase
            .from('reviews')
            .insert({
                student_id: user?.id as string,
                instructor_id: selectedOrder.instructor_id,
                order_id: selectedOrder.id,
                rating,
                comment
            });

        if (error) {
            alert('Erro ao enviar avaliação: ' + error.message);
        } else {
            // Update local state
            setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, has_review: true } : o));
            setSelectedOrder(null); // Close modal/form
            setRating(0);
            setComment("");
            alert('Avaliação enviada com sucesso!');
        }
        setSubmitting(false);
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Carregando seus pacotes...</div>;

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500">star</span>
                Avaliar Instrutor
            </h1>

            <div className="grid gap-6">
                {orders.length === 0 ? (
                    <div className="text-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-slate-500">Você ainda não tem pacotes de aulas adquiridos.</p>
                    </div>
                ) : (
                    orders.map(order => {
                        // Logic: Is eligible if completed_lessons >= lessons_count?
                        // NOTE: This assumes sequential lesson completion. 
                        // If they have 20 lessons total from 2 orders (10 each), and 15 completed, 
                        // ideally the first order is "done" (10/10) and second is 5/10.
                        // For MVP: We assume if they have ENOUGH completed lessons to cover THIS order size, they can review. 
                        // Real logic needs ordered allocation.

                        const isEligible = order.completed_lessons >= order.lessons_count;
                        // Avoid duplicates: If they have multiple active orders, this logic might be too permissive, 
                        // but acceptable for MVP feedback collection.

                        const instructor = order.instructors?.profiles; // Adjust based on actual join shape

                        return (
                            <div key={order.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="size-16 rounded-full bg-slate-200 bg-cover bg-center shrink-0 border-2 border-white dark:border-slate-700 shadow-sm"
                                        style={{ backgroundImage: `url('${instructor?.avatar_url || ''}')` }}
                                    ></div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{instructor?.full_name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{order.plan_name}</p>
                                        <div className="flex items-center gap-2 mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">
                                            <span>Progresso:</span>
                                            <span className={`font-bold ${isEligible ? 'text-green-600' : 'text-orange-500'}`}>
                                                {Math.min(order.completed_lessons, order.lessons_count)} / {order.lessons_count} Aulas
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {order.has_review ? (
                                        <button disabled className="flex items-center gap-2 px-6 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-bold opacity-70 cursor-not-allowed">
                                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                            Avaliado
                                        </button>
                                    ) : isEligible ? (
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="flex items-center gap-2 px-6 py-3 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">stars</span>
                                            Avaliar Agora
                                        </button>
                                    ) : (
                                        <div className="flex flex-col items-end text-right">
                                            <button disabled className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg font-bold cursor-not-allowed border border-slate-200 dark:border-slate-700">
                                                Aguardando Conclusão
                                            </button>
                                            <span className="text-[10px] text-slate-400 mt-1 max-w-[150px] leading-tight">
                                                Complete o pacote para liberar a avaliação.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Review Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 animate-slide-up">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Avaliar Experiência</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-8 flex flex-col items-center">
                            <div
                                className="size-20 rounded-full bg-slate-200 bg-cover bg-center shrink-0 border-4 border-white dark:border-slate-700 shadow-md mb-4"
                                style={{ backgroundImage: `url('${selectedOrder.instructors?.profiles?.avatar_url || ''}')` }}
                            ></div>
                            <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">
                                {selectedOrder.instructors?.profiles?.full_name}
                            </h4>
                            <p className="text-slate-500 text-sm mb-6">{selectedOrder.plan_name}</p>

                            <div className="flex gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <span className={`material-symbols-outlined text-4xl ${star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <textarea
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#137fec] focus:border-transparent outline-none resize-none h-32 text-sm"
                                placeholder="Conte como foi sua experiência... (Opcional)"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <p className="text-xs text-slate-400 w-full text-right mt-1">{comment.length}/500</p>
                        </div>

                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex gap-3 bg-slate-50 dark:bg-slate-800/50">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 py-3 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={submitReview}
                                disabled={rating === 0 || submitting}
                                className="flex-1 py-3 bg-[#137fec] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                            >
                                {submitting ? 'Enviando...' : 'Enviar Avaliação'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
