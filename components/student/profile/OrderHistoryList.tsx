"use client";

import React from 'react';

interface Order {
    id: string;
    plan_name: string;
    lessons_count: number;
    amount_cents: number;
    status: string;
    created_at: string;
    metadata: any;
}

interface OrderHistoryListProps {
    orders: Order[];
}

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
    const fmtMoney = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
    const fmtDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('pt-BR');

    if (orders.length === 0) {
        return (
            <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">receipt_long</span>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Nenhum pedido encontrado</h3>
                <p className="text-slate-500 text-sm">Você ainda não realizou nenhuma compra.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm col-span-1 lg:col-span-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#137fec]">shopping_bag</span>
                Histórico de Pedidos
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">Data</th>
                            <th className="px-4 py-3">Pacote</th>
                            <th className="px-4 py-3">Aulas</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 rounded-r-lg text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-300">
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-4 font-medium">{fmtDate(order.created_at)}</td>
                                <td className="px-4 py-4">
                                    <span className="font-bold text-slate-900 dark:text-white block">{order.plan_name}</span>
                                    {order.metadata?.manual_included && (
                                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold">+ Manual</span>
                                    )}
                                </td>
                                <td className="px-4 py-4">{order.lessons_count}</td>
                                <td className="px-4 py-4 font-bold text-slate-900 dark:text-white">{fmtMoney(order.amount_cents)}</td>
                                <td className="px-4 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {order.status === 'paid' ? 'Pago' : order.status === 'pending' ? 'Pendente' : 'Cancelado'}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <button className="text-[#137fec] hover:underline font-bold text-xs">Ver Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
