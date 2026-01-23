"use client";

import React from 'react';

interface Sale {
    id: string;
    plan_name: string;
    amount_cents: number;
    status: string;
    created_at: string;
    student?: {
        full_name: string;
        avatar_url: string;
    };
    metadata: any;
}

interface SalesListProps {
    sales: Sale[];
}

export function SalesList({ sales }: SalesListProps) {
    const fmtMoney = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
    const fmtDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('pt-BR');

    if (sales.length === 0) {
        return (
            <div className="bg-instructor-surface-dark p-6 rounded-xl border border-white/5 text-center col-span-1 xl:col-span-3">
                <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">sentiment_dissatisfied</span>
                <h3 className="text-white font-bold text-lg mb-1">Nenhuma venda encontrada</h3>
                <p className="text-gray-400 text-sm">Ainda não recebemos pedidos para você.</p>
            </div>
        );
    }

    return (
        <div className="bg-instructor-surface-dark p-6 rounded-xl border border-white/5 col-span-1 xl:col-span-3">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-instructor-primary">attach_money</span>
                Últimas Vendas
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">Data</th>
                            <th className="px-4 py-3">Aluno</th>
                            <th className="px-4 py-3">Pacote</th>
                            <th className="px-4 py-3">Valor</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 rounded-r-lg text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {sales.map((sale) => (
                            <tr key={sale.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="px-4 py-4 font-medium">{fmtDate(sale.created_at)}</td>
                                <td className="px-4 py-4 flex items-center gap-2">
                                    <div className="size-6 rounded-full bg-gray-700" style={{ backgroundImage: `url(${sale.student?.avatar_url})`, backgroundSize: 'cover' }}></div>
                                    <span>{sale.student?.full_name || 'Aluno'}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className="font-bold text-white block">{sale.plan_name}</span>
                                    {sale.metadata?.manual_included && (
                                        <span className="text-[10px] bg-yellow-900/30 text-yellow-400 px-1.5 py-0.5 rounded font-bold">+ Manual</span>
                                    )}
                                </td>
                                <td className="px-4 py-4 font-bold text-instructor-primary">{fmtMoney(sale.amount_cents)}</td>
                                <td className="px-4 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${sale.status === 'paid' ? 'bg-green-900/30 text-green-400' :
                                            sale.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                                                'bg-red-900/30 text-red-500'
                                        }`}>
                                        {sale.status === 'paid' ? 'Aprovado' : sale.status === 'pending' ? 'Pendente' : 'Cancelado'}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <button className="text-instructor-primary hover:text-white transition-colors font-bold text-xs">Ver Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
