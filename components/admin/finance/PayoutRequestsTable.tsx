"use client";

interface PayoutRequestsTableProps {
    payouts: any[];
}

export function PayoutRequestsTable({ payouts = [] }: PayoutRequestsTableProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatCurrency = (cents: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(cents / 100);
    };

    return (
        <div className="flex-1 w-full bg-[#111a22] rounded-xl border border-[#324d67] flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b border-[#324d67] flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[#92adc9]">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 bg-[#233648] border-none rounded-lg text-white placeholder-[#92adc9] focus:ring-2 focus:ring-[#137fec] text-sm"
                        placeholder="Buscar por instrutor, CPF ou ID..."
                        type="text"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#324d67] text-[#92adc9] hover:text-white hover:bg-[#233648] transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-[20px]">
                            download
                        </span>
                        Exportar
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#137fec] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all text-sm font-bold">
                        <span className="material-symbols-outlined text-[20px]">
                            check_circle
                        </span>
                        Aprovar (0)
                    </button>
                </div>
            </div>
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#324d67] bg-[#1a2632]">
                            <th className="p-4 w-12">
                                <input
                                    className="rounded border-[#324d67] bg-[#233648] text-[#137fec] focus:ring-offset-[#111a22] focus:ring-[#137fec] size-4"
                                    type="checkbox"
                                />
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                                Instrutor
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider text-right">
                                Valor Solicitado
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                                Status Risk
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                                Data
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#324d67]">
                        {payouts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-[#92adc9]">
                                    Nenhuma solicitação de saque encontrada.
                                </td>
                            </tr>
                        ) : payouts.map((payout) => {
                            const instructor = payout.instructor?.profiles || {};
                            // Use instructor properties correctly - check if 'profiles' is array or object
                            // Based on 'profiles!inner' in query, it likely returns an object in Supabase single relation or array.
                            // But usually with join it returns object if 1:1. profiles is 1:1 with instructor (shared PK).
                            const instructorName = Array.isArray(instructor) ? instructor[0]?.full_name : instructor.full_name;
                            const avatarUrl = Array.isArray(instructor) ? instructor[0]?.avatar_url : instructor.avatar_url;
                            const rating = payout.instructor?.rating || 5.0;

                            const isRisk = payout.risk_score > 50 || payout.status === 'risk_check';

                            return (
                                <tr key={payout.id} className={`group transition-colors ${isRisk ? 'bg-red-900/10 hover:bg-red-900/20 border-l-2 border-l-red-500' : 'hover:bg-[#1a2632]'}`}>
                                    <td className={`p-4 ${isRisk ? 'pl-[14px]' : ''}`}>
                                        <input
                                            className={`rounded bg-[#233648] size-4 ${isRisk ? 'border-red-900/30 text-red-500' : 'border-[#324d67] text-[#137fec]'}`}
                                            type="checkbox"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`size-9 rounded-full bg-cover bg-center ${isRisk ? 'ring-2 ring-red-500/30' : ''}`}
                                                style={{
                                                    backgroundImage: `url("${avatarUrl || 'https://via.placeholder.com/150'}")`,
                                                }}
                                            ></div>
                                            <div>
                                                <p className="text-white text-sm font-medium">
                                                    {instructorName || 'Instrutor Desconhecido'}
                                                </p>
                                                <div className={`flex items-center gap-1 text-xs ${isRisk ? 'text-red-400' : 'text-[#92adc9]'}`}>
                                                    <span className="material-symbols-outlined text-[14px] text-yellow-400 fill-current">
                                                        star
                                                    </span>
                                                    {rating}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="text-white font-medium">{formatCurrency(payout.amount_cents)}</p>
                                        {isRisk && <p className="text-xs text-red-400 font-medium">Análise de Risco</p>}
                                    </td>
                                    <td className="p-4">
                                        {isRisk ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm shadow-red-900/50 animate-pulse">
                                                <span className="material-symbols-outlined text-[14px]">
                                                    warning
                                                </span>
                                                Risco ({payout.risk_score || 'N/A'})
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <span className="material-symbols-outlined text-[14px]">
                                                    verified_user
                                                </span>
                                                Seguro
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-[#92adc9] text-sm">{formatDate(payout.created_at)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-[#324d67] flex justify-between items-center">
                <span className="text-sm text-[#92adc9]">Mostrando {payouts.length} itens</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded text-white bg-[#233648] hover:bg-[#324d67] disabled:opacity-50 text-sm">
                        Anterior
                    </button>
                    <button className="px-3 py-1 rounded text-white bg-[#233648] hover:bg-[#324d67] text-sm">
                        Próximo
                    </button>
                </div>
            </div>
        </div>
    );
}
