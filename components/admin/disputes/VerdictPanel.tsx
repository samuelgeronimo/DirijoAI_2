"use client";

export function VerdictPanel() {
    return (
        <div className="xl:col-span-3 flex flex-col gap-4">
            <div className="bg-[#111a22] rounded-xl border border-[#324d67] p-4 flex flex-col gap-2 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-yellow-500">
                        balance
                    </span>
                    <h3 className="text-white font-bold text-lg">Painel de Veredito</h3>
                </div>
                <p className="text-xs text-[#92adc9] mb-4">
                    Selecione uma ação irrevogável para encerrar esta disputa.
                </p>
                <button className="group relative overflow-hidden rounded-lg bg-[#1e293b] border border-[#324d67] hover:border-[#137fec] p-4 text-left transition-all hover:shadow-[0_0_20px_rgba(19,127,236,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#137fec]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <h4 className="text-[#137fec] font-bold text-sm mb-1 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">
                                person_off
                            </span>
                            Culpa do Aluno (No-Show)
                        </h4>
                        <p className="text-xs text-slate-400">
                            Transfere pagamento integral ao instrutor.
                        </p>
                    </div>
                </button>
                <button className="group relative overflow-hidden rounded-lg bg-[#1e293b] border border-[#324d67] hover:border-red-500 p-4 text-left transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <h4 className="text-red-400 font-bold text-sm mb-1 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">
                                person_cancel
                            </span>
                            Culpa do Instrutor
                        </h4>
                        <p className="text-xs text-slate-400">
                            Estorna crédito + Cupom de R$ 20 para o aluno.
                        </p>
                    </div>
                </button>
                <button className="group relative overflow-hidden rounded-lg bg-[#1e293b] border border-[#324d67] hover:border-slate-400 p-4 text-left transition-all hover:shadow-[0_0_20px_rgba(148,163,184,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <h4 className="text-slate-300 font-bold text-sm mb-1 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">
                                thunderstorm
                            </span>
                            Força Maior (Neutro)
                        </h4>
                        <p className="text-xs text-slate-400">
                            Devolve crédito ao aluno sem penalizar instrutor.
                        </p>
                    </div>
                </button>
            </div>
            <div className="bg-[#111a22] rounded-xl border border-[#324d67] p-4 flex-1">
                <label className="text-xs font-bold text-[#92adc9] uppercase mb-2 block">
                    Notas Privadas
                </label>
                <textarea
                    className="w-full h-24 bg-[#0d141b] border border-[#324d67] rounded-lg p-3 text-sm text-white placeholder-[#5a718a] focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] resize-none"
                    placeholder="Adicionar observação interna..."
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button className="text-xs text-white bg-[#324d67] hover:bg-[#4b6a88] px-3 py-1.5 rounded transition-colors">
                        Salvar Nota
                    </button>
                </div>
            </div>
        </div>
    );
}
