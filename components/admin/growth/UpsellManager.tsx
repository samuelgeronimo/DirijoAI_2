"use client";

export function UpsellManager() {
    return (
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-[#1e293b] border border-[#233648] rounded-xl flex flex-col h-full min-h-[600px]">
                <div className="p-6 border-b border-[#233648] flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#137fec] text-2xl">
                            shopping_bag
                        </span>
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Gestor de Upsells (Order Bumps)
                            </h3>
                            <p className="text-sm text-[#92adc9]">
                                Produtos adicionais oferecidos no checkout.
                            </p>
                        </div>
                    </div>
                    <button className="text-[#137fec] text-sm font-bold hover:underline flex items-center gap-1">
                        Ver Relatório Completo{" "}
                        <span className="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>
                    </button>
                </div>
                {/* Table Container */}
                <div className="overflow-x-auto custom-scrollbar flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#111a22] sticky top-0 z-10">
                            <tr>
                                <th className="p-4 text-xs font-bold text-[#92adc9] uppercase tracking-wider border-b border-[#233648]">
                                    Produto Digital
                                </th>
                                <th className="p-4 text-xs font-bold text-[#92adc9] uppercase tracking-wider border-b border-[#233648] text-right">
                                    Preço
                                </th>
                                <th className="p-4 text-xs font-bold text-[#92adc9] uppercase tracking-wider border-b border-[#233648] w-1/3">
                                    Taxa de Conversão
                                </th>
                                <th className="p-4 text-xs font-bold text-[#92adc9] uppercase tracking-wider border-b border-[#233648] text-center">
                                    Status
                                </th>
                                <th className="p-4 text-xs font-bold text-[#92adc9] uppercase tracking-wider border-b border-[#233648] text-center">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#233648]">
                            {/* Row 1 */}
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <span className="material-symbols-outlined">
                                                menu_book
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">
                                                Manual Anti-Reprovação
                                            </p>
                                            <p className="text-xs text-[#92adc9]">E-book PDF</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right font-medium text-white text-sm">
                                    R$ 29,90
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-bold text-white">
                                                32.4%
                                            </span>
                                            <span className="text-[10px] text-[#0bda5b] font-medium">
                                                +2.1%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#111a22] rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#137fec] to-purple-500 h-2 rounded-full"
                                                style={{ width: "32%" }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#137fec] hover:text-[#116dc9] transition-colors">
                                        <span className="material-symbols-outlined text-3xl">
                                            toggle_on
                                        </span>
                                    </button>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="p-2 text-[#92adc9] hover:text-white transition-colors rounded hover:bg-[#111a22]">
                                        <span className="material-symbols-outlined text-lg">
                                            edit
                                        </span>
                                    </button>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <span className="material-symbols-outlined">
                                                security
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">
                                                Seguro VIP (Reagendamento)
                                            </p>
                                            <p className="text-xs text-[#92adc9]">Serviço Add-on</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right font-medium text-white text-sm">
                                    R$ 49,90
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-bold text-white">
                                                18.7%
                                            </span>
                                            <span className="text-[10px] text-red-400 font-medium">
                                                -0.5%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#111a22] rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#137fec] to-purple-500 h-2 rounded-full"
                                                style={{ width: "18%" }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#92adc9] hover:text-gray-400 transition-colors">
                                        <span className="material-symbols-outlined text-3xl">
                                            toggle_off
                                        </span>
                                    </button>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="p-2 text-[#92adc9] hover:text-white transition-colors rounded hover:bg-[#111a22]">
                                        <span className="material-symbols-outlined text-lg">
                                            edit
                                        </span>
                                    </button>
                                </td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded bg-orange-500/20 flex items-center justify-center text-orange-400">
                                            <span className="material-symbols-outlined">
                                                play_lesson
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">
                                                Pacote: Aula Extra Noturna
                                            </p>
                                            <p className="text-xs text-[#92adc9]">Aula Avulsa</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right font-medium text-white text-sm">
                                    R$ 89,90
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-bold text-white">
                                                45.2%
                                            </span>
                                            <span className="text-[10px] text-[#0bda5b] font-medium">
                                                +12%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#111a22] rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#137fec] to-purple-500 h-2 rounded-full"
                                                style={{ width: "45%" }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#137fec] hover:text-[#116dc9] transition-colors">
                                        <span className="material-symbols-outlined text-3xl">
                                            toggle_on
                                        </span>
                                    </button>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="p-2 text-[#92adc9] hover:text-white transition-colors rounded hover:bg-[#111a22]">
                                        <span className="material-symbols-outlined text-lg">
                                            edit
                                        </span>
                                    </button>
                                </td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded bg-pink-500/20 flex items-center justify-center text-pink-400">
                                            <span className="material-symbols-outlined">
                                                psychology
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">
                                                Mentoria Psicológica
                                            </p>
                                            <p className="text-xs text-[#92adc9]">Sessão Online</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right font-medium text-white text-sm">
                                    R$ 120,00
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-bold text-white">8.5%</span>
                                            <span className="text-[10px] text-[#92adc9] font-medium">
                                                0.0%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#111a22] rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#137fec] to-purple-500 h-2 rounded-full"
                                                style={{ width: "8.5%" }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#92adc9] hover:text-gray-400 transition-colors">
                                        <span className="material-symbols-outlined text-3xl">
                                            toggle_off
                                        </span>
                                    </button>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="p-2 text-[#92adc9] hover:text-white transition-colors rounded hover:bg-[#111a22]">
                                        <span className="material-symbols-outlined text-lg">
                                            edit
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
