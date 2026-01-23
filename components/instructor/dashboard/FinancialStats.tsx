import { formatCurrency } from "@/utils/instructorMetrics";

interface FinancialStatsProps {
    availableBalance: number;
    amountToReceive: number;
}

export function FinancialStats({ availableBalance, amountToReceive }: FinancialStatsProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Available Balance */}
            <div className="bg-instructor-surface-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-instructor-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-instructor-primary/10 transition-colors duration-500"></div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-instructor-surface-dark-2 rounded-xl">
                            <span className="material-symbols-outlined text-instructor-primary">
                                attach_money
                            </span>
                        </div>
                        <span className="text-gray-400 text-sm font-medium">
                            Conta Digital
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium mb-1">Saldo Disponível</p>
                        <h3 className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(availableBalance)}
                        </h3>
                    </div>
                    <button className="w-full bg-instructor-primary hover:bg-instructor-primary-hover text-instructor-bg-dark font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(19,236,91,0.2)] hover:shadow-[0_0_30px_rgba(19,236,91,0.3)] flex items-center justify-center gap-2 cursor-pointer">
                        <span>SACAR AGORA</span>
                        <span className="material-symbols-outlined text-lg">
                            arrow_forward
                        </span>
                    </button>
                </div>
            </div>
            {/* Receivables */}
            <div className="bg-instructor-surface-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-instructor-surface-dark-2 rounded-xl">
                            <span className="material-symbols-outlined text-white">
                                pending_actions
                            </span>
                        </div>
                        <span className="text-gray-400 text-sm font-medium">Previsão</span>
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium mb-1">A Receber</p>
                        <h3 className="text-4xl font-extrabold text-gray-300 tracking-tight opacity-90">
                            {formatCurrency(amountToReceive)}
                        </h3>
                    </div>
                    <div className="w-full bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400 font-light">
                            info
                        </span>
                        <p className="text-gray-400 text-sm leading-snug">
                            Realize as aulas agendadas para liberar este valor.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
