"use client";

export function ActionTable() {
    return (
        <div className="rounded-xl bg-[#233648] border border-l-4 border-l-[#ef4444] border-t-[#334b63] border-r-[#334b63] border-b-[#334b63] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#334b63] flex justify-between items-center bg-[#2a1f1f]">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ef4444]">
                        local_fire_department
                    </span>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                        Incêndios (Action Required)
                    </h3>
                </div>
                <span className="bg-[#ef4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    3 Urgent
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[#92adc9]">
                    <thead className="bg-[#1c2a38] text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">ID / Descrição</th>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3">Severidade</th>
                            <th className="px-6 py-3">Tempo Decorrido</th>
                            <th className="px-6 py-3 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334b63]">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">
                                Disputa #4829
                                <div className="text-xs text-[#92adc9] font-normal mt-0.5">
                                    Aluno alega não comparecimento do instrutor
                                </div>
                            </td>
                            <td className="px-6 py-4">Reembolso</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 text-[#ef4444] font-bold text-xs bg-[#ef4444]/10 px-2 py-1 rounded">
                                    Crítico
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium">2h 15m</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-[#137fec] hover:text-white font-medium text-xs border border-[#137fec]/30 hover:bg-[#137fec] hover:border-[#137fec] px-3 py-1.5 rounded transition-all cursor-pointer">
                                    Resolver
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">
                                Solicitação de Saque (João Silva)
                                <div className="text-xs text-[#92adc9] font-normal mt-0.5">
                                    Valor acima do limite automático: R$ 4.200,00
                                </div>
                            </td>
                            <td className="px-6 py-4">Financeiro</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 text-[#eab308] font-bold text-xs bg-[#eab308]/10 px-2 py-1 rounded">
                                    Alto
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium">45m</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-[#137fec] hover:text-white font-medium text-xs border border-[#137fec]/30 hover:bg-[#137fec] hover:border-[#137fec] px-3 py-1.5 rounded transition-all cursor-pointer">
                                    Aprovar
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">
                                Documento Vencido (Maria Oliveira)
                                <div className="text-xs text-[#92adc9] font-normal mt-0.5">
                                    CNH expirou hoje. Bloqueio preventivo necessário.
                                </div>
                            </td>
                            <td className="px-6 py-4">Compliance</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 text-[#eab308] font-bold text-xs bg-[#eab308]/10 px-2 py-1 rounded">
                                    Médio
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium">1d</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-[#137fec] hover:text-white font-medium text-xs border border-[#137fec]/30 hover:bg-[#137fec] hover:border-[#137fec] px-3 py-1.5 rounded transition-all cursor-pointer">
                                    Revisar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
