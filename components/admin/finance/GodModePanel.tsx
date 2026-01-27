"use client";

import { updatePlatformTakeRate } from "@/app/admin/actions";
import { useState, useTransition } from "react";

interface GodModePanelProps {
    initialRate: number;
}

export function GodModePanel({ initialRate }: GodModePanelProps) {
    const [rate, setRate] = useState(initialRate);
    const [isPending, startTransition] = useTransition();

    const handleRateChange = (newRate: number) => {
        setRate(newRate);
    };

    const handleSaveRate = () => {
        startTransition(async () => {
            await updatePlatformTakeRate(rate);
            alert('Taxa atualizada com sucesso!');
        });
    };

    return (
        <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6 sticky top-6">
            {/* Platform Commission Config */}
            <div className="bg-[#111a22] rounded-xl border border-[#324d67] shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-900/40 to-blue-900/40 p-4 border-b border-[#324d67]">
                    <div className="flex items-center gap-2 text-white mb-1">
                        <span className="material-symbols-outlined text-emerald-400">
                            percent
                        </span>
                        <h3 className="font-bold text-lg">Comissão da Plataforma</h3>
                    </div>
                    <p className="text-xs text-[#92adc9]">
                        Define a porcentagem retida em cada aula.
                    </p>
                </div>
                <div className="p-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-white">Take Rate (%)</label>
                            <span className="text-emerald-400 font-bold font-mono">{rate}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="1"
                            value={rate}
                            onChange={(e) => handleRateChange(Number(e.target.value))}
                            className="w-full h-2 bg-[#233648] rounded-lg appearance-none cursor-pointer accent-[#137fec]"
                        />
                        <div className="flex justify-between text-xs text-[#5a718a]">
                            <span>0%</span>
                            <span>50%</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSaveRate}
                        disabled={isPending}
                        className="w-full bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isPending ? (
                            <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                        ) : (
                            <span className="material-symbols-outlined text-[18px]">save</span>
                        )}
                        Salvar Configuração
                    </button>
                </div>
            </div>

            <div className="bg-[#111a22] rounded-xl border border-[#324d67] shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-4 border-b border-[#324d67]">
                    <div className="flex items-center gap-2 text-white mb-1">
                        <span className="material-symbols-outlined text-purple-400">
                            bolt
                        </span>
                        <h3 className="font-bold text-lg">Modo Deus</h3>
                    </div>
                    <p className="text-xs text-[#92adc9]">
                        Ajustes manuais de saldo e correções de auditoria.
                    </p>
                </div>
                <form className="p-5 flex flex-col gap-5">
                    {/* Instructor Selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white">
                            Instrutor Alvo
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-3 text-[#92adc9] text-[20px]">
                                person_search
                            </span>
                            <input
                                className="w-full bg-[#233648] border border-[#324d67] rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-[#5a718a] focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] text-sm"
                                placeholder="Buscar por nome ou ID..."
                                type="text"
                            />
                        </div>
                    </div>
                    {/* Transaction Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white">
                            Tipo de Operação
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="cursor-pointer">
                                <input
                                    className="peer sr-only"
                                    name="tx_type"
                                    type="radio"
                                />
                                <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-[#324d67] bg-[#1a2632] peer-checked:bg-emerald-500/20 peer-checked:border-emerald-500 peer-checked:text-emerald-400 text-[#92adc9] transition-all">
                                    <span className="material-symbols-outlined text-[20px]">
                                        add_circle
                                    </span>
                                    <span className="text-sm font-medium">Crédito</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input
                                    defaultChecked
                                    className="peer sr-only"
                                    name="tx_type"
                                    type="radio"
                                />
                                <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-[#324d67] bg-[#1a2632] peer-checked:bg-red-500/20 peer-checked:border-red-500 peer-checked:text-red-400 text-[#92adc9] transition-all">
                                    <span className="material-symbols-outlined text-[20px]">
                                        remove_circle
                                    </span>
                                    <span className="text-sm font-medium">Débito</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    {/* Value */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white">Valor (R$)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-[#92adc9] text-sm font-medium">
                                R$
                            </span>
                            <input
                                className="w-full bg-[#233648] border border-[#324d67] rounded-lg py-2.5 pl-9 pr-3 text-white placeholder-[#5a718a] focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] font-mono text-lg font-bold"
                                placeholder="0,00"
                                type="number"
                            />
                        </div>
                    </div>
                    {/* Justification */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white flex justify-between">
                            Justificativa
                            <span className="text-xs text-red-400 font-normal">
                                * Obrigatório para auditoria
                            </span>
                        </label>
                        <textarea
                            className="w-full bg-[#233648] border border-[#324d67] rounded-lg p-3 text-white placeholder-[#5a718a] focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] text-sm resize-none"
                            placeholder="Descreva o motivo do ajuste manual..."
                            rows={3}
                        ></textarea>
                    </div>
                    {/* Action */}
                    <button
                        className="mt-2 w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg shadow-lg border-t border-slate-600 transition-all flex items-center justify-center gap-2"
                        type="button"
                    >
                        <span className="material-symbols-outlined">gavel</span>
                        Executar Lançamento
                    </button>
                </form>
            </div>
            {/* Audit Mini Log */}
            <div className="bg-[#111a22] rounded-xl border border-[#324d67] p-4 flex flex-col gap-3">
                <h4 className="text-white text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#92adc9] text-sm">
                        history
                    </span>
                    Últimos Ajustes
                </h4>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start text-xs border-b border-[#324d67] pb-2 last:border-0 last:pb-0">
                        <div>
                            <p className="text-slate-300">
                                <strong className="text-white">Admin</strong> debitou{" "}
                                <strong className="text-white">Lucas F.</strong>
                            </p>
                            <p className="text-[#5a718a] mt-0.5">Motivo: Estorno duplicado</p>
                        </div>
                        <span className="text-red-400 font-mono">-R$ 150</span>
                    </div>
                    <div className="flex justify-between items-start text-xs border-b border-[#324d67] pb-2 last:border-0 last:pb-0">
                        <div>
                            <p className="text-slate-300">
                                <strong className="text-white">Admin</strong> creditou{" "}
                                <strong className="text-white">Julia M.</strong>
                            </p>
                            <p className="text-[#5a718a] mt-0.5">Motivo: Bonus campanha</p>
                        </div>
                        <span className="text-emerald-400 font-mono">+R$ 500</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
