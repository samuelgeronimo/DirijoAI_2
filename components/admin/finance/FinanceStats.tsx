interface FinanceStatsProps {
    stats: {
        floatTotal: number;
        pendingWithdrawals: number;
        netProfit: number;
    };
}

export function FinanceStats({ stats }: FinanceStatsProps) {

    const formatCurrency = (cents: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(cents / 100);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Float Total */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#111a22] rounded-xl p-6 border border-[#324d67] relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-8xl text-[#137fec]">
                        savings
                    </span>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                    <p className="text-[#92adc9] text-sm font-medium uppercase tracking-wider">
                        Float Total (Custódia)
                    </p>
                    <div className="flex items-end gap-3">
                        <h3 className="text-white text-3xl font-bold font-display tracking-tight">
                            {formatCurrency(stats.floatTotal)}
                        </h3>
                        <span className="flex items-center text-[#0bda5b] text-sm font-medium bg-[#0bda5b]/10 px-2 py-0.5 rounded mb-1">
                            <span className="material-symbols-outlined text-sm mr-1">
                                trending_up
                            </span>
                            +2.5%
                        </span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">
                        Atualizado em tempo real
                    </p>
                </div>
            </div>
            {/* Saques Pendentes */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#111a22] rounded-xl p-6 border border-[#324d67] relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-8xl text-orange-500">
                        pending_actions
                    </span>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                    <p className="text-[#92adc9] text-sm font-medium uppercase tracking-wider">
                        Total de Saques Pendentes
                    </p>
                    <div className="flex items-end gap-3">
                        <h3 className="text-white text-3xl font-bold font-display tracking-tight">
                            {formatCurrency(stats.pendingWithdrawals)}
                        </h3>
                        <span className="flex items-center text-orange-400 text-sm font-medium bg-orange-500/10 px-2 py-0.5 rounded mb-1">
                            Atenção Requerida
                        </span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">
                        Requerem atenção imediata
                    </p>
                </div>
            </div>
        </div>
    );
}
