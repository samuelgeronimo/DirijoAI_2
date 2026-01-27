'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Order {
    id: string;
    created_at: string;
    plan_name: string;
    amount_cents: number;
    lessons_count: number;
    status: string;
}

interface StudentHistoryModalProps {
    studentId: string | null;
    studentName: string;
    onClose: () => void;
}

export function StudentHistoryModal({ studentId, studentName, onClose }: StudentHistoryModalProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!studentId) return;

        async function fetchHistory() {
            setLoading(true);
            const supabase = createClient();

            const { data, error } = await supabase
                .from('orders')
                .select('id, created_at, plan_name, amount_cents, lessons_count, status')
                .eq('student_id', studentId!)
                .order('created_at', { ascending: false })
                .returns<Order[]>();

            if (data) {
                setOrders(data);
            } else if (error) {
                console.error("Error fetching history", error);
            }
            setLoading(false);
        }

        fetchHistory();
    }, [studentId]);

    if (!studentId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-instructor-surface-dark-2 rounded-2xl border border-instructor-surface-dark shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h2 className="text-xl font-bold text-white">Histórico de Compras</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Aluno: <span className="text-white font-medium">{studentName}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-instructor-primary"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            Nenhuma compra encontrada no histórico.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-instructor-primary/30 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white font-bold">{order.plan_name}</span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${order.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                                                order.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {order.status === 'paid' ? 'Pago' : order.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold mb-0.5">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.amount_cents / 100)}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {order.lessons_count} aulas
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors border border-white/5"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
