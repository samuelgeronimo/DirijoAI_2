"use client";

import React from 'react';

interface Order {
    id: string;
    plan_name: string;
    amount_cents: number;
    status: string;
    created_at: string;
    student?: { full_name: string; email: string };
    instructor?: {
        profiles: { full_name: string }
    };
    metadata: any;
}

interface RecentOrdersTableProps {
    orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
    const fmtMoney = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
    const fmtDate = (dateStr: string) => new Date(dateStr).toLocaleString('pt-BR');

    if (orders.length === 0) {
        return (
            <div className="bg-[#233648] p-6 rounded-xl border border-[#334b63] shadow-sm text-center">
                <p className="text-[#92adc9]">Nenhum pedido recente.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-[#334b63] bg-[#233648] p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0bda5b]">shopping_cart</span>
                    Vendas Recentes
                </h3>
                <button className="text-xs text-[#137fec] hover:text-[#137fec]/80 font-bold uppercase transition-colors">
                    Ver Todos
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-[#92adc9]/60 uppercase border-b border-[#334b63]">
                        <tr>
                            <th className="px-4 py-3">Data</th>
                            <th className="px-4 py-3">Aluno</th>
                            <th className="px-4 py-3">Instrutor</th>
                            <th className="px-4 py-3">Pacote</th>
                            <th className="px-4 py-3">Valor</th>
                            <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#92adc9]">
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-[#334b63] last:border-0 hover:bg-[#334b63]/30 transition-colors">
                                <td className="px-4 py-3 font-medium text-white">{fmtDate(order.created_at)}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col">
                                        <span className="text-white">{order.student?.full_name || 'N/A'}</span>
                                        <span className="text-xs text-[#92adc9]/70">{order.student?.email}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-white">
                                    {order.instructor?.profiles?.full_name || 'N/A'}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="block text-white">{order.plan_name}</span>
                                    {order.metadata?.manual_included && (
                                        <span className="text-[10px] bg-[#eab308]/20 text-[#eab308] px-1.5 py-0.5 rounded font-bold">+ Manual</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 font-bold text-[#0bda5b]">{fmtMoney(order.amount_cents)}</td>
                                <td className="px-4 py-3 text-right">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'paid' ? 'bg-[#0bda5b]/10 text-[#0bda5b]' :
                                            order.status === 'pending' ? 'bg-[#eab308]/10 text-[#eab308]' :
                                                'bg-red-500/10 text-red-500'
                                        }`}>
                                        {order.status === 'paid' ? 'Pago' : order.status === 'pending' ? 'Pendente' : order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
