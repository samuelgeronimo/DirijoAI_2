export function KPIStats() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative overflow-hidden rounded-xl border border-instructor-surface-dark bg-instructor-surface-dark-2 p-5">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#92a4c9]">
                        Taxa de Ocupação
                    </p>
                    <span className="material-symbols-outlined text-instructor-primary">
                        pie_chart
                    </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">78%</p>
                    <span className="text-xs font-medium text-green-500 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">
                            trending_up
                        </span>{" "}
                        +5%
                    </span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-instructor-primary w-[78%]"></div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-instructor-surface-dark bg-instructor-surface-dark-2 p-5">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#92a4c9]">Horas Vendidas</p>
                    <span className="material-symbols-outlined text-purple-400">
                        schedule
                    </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">32h</p>
                    <span className="text-xs font-medium text-green-500 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">
                            trending_up
                        </span>{" "}
                        +12%
                    </span>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-instructor-surface-dark bg-instructor-surface-dark-2 p-5">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#92a4c9]">Faturamento</p>
                    <span className="material-symbols-outlined text-green-400">
                        attach_money
                    </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">R$ 2.450</p>
                    <span className="text-xs font-medium text-green-500 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">
                            trending_up
                        </span>{" "}
                        +8%
                    </span>
                </div>
            </div>
            {/* Promotion Status Card */}
            <div className="relative overflow-hidden rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent p-5 group cursor-pointer hover:bg-yellow-500/5 transition-colors">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-yellow-500">Flash Offer</p>
                    <span className="material-symbols-outlined text-yellow-500 animate-pulse">
                        bolt
                    </span>
                </div>
                <div className="mt-2">
                    <p className="text-lg font-bold text-white leading-tight">
                        Ativo agora
                    </p>
                    <p className="text-xs text-[#92a4c9]">
                        Preenchendo vagas de quarta-feira
                    </p>
                </div>
            </div>
        </div>
    );
}
