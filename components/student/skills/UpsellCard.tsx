export function UpsellCard() {
    return (
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
            {/* Upsell Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl border border-blue-100 dark:border-slate-700 p-6 shadow-md transition-transform hover:scale-[1.01] duration-300">
                {/* Background decoration */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-student-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-student-primary">
                        <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
                            <span className="material-symbols-outlined text-2xl">
                                lightbulb
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                            Dificuldade na Baliza?
                        </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        A maioria reprova aqui. O{" "}
                        <span className="font-semibold text-student-primary">
                            Manual Anti-Reprovação
                        </span>{" "}
                        ensina o truque infalível dos 3 pontos para você nunca mais errar.
                    </p>
                    <button className="w-full bg-student-primary hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                        <span>Baixar Guia por R$ 19,90</span>
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </button>
                    <div className="flex items-center justify-center gap-1.5 opacity-70">
                        <span className="material-symbols-outlined text-xs text-slate-500">
                            verified_user
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                            Compra segura e acesso imediato
                        </span>
                    </div>
                </div>
            </div>
            {/* Secondary Action Box */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 flex flex-col gap-4 items-center text-center">
                <div className="bg-slate-200 dark:bg-slate-700 w-12 h-12 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold">
                        Precisa de prática real?
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Nossos instrutores podem focar exatamente onde você tem mais
                        dificuldade.
                    </p>
                </div>
                <button className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer">
                    Agendar aula focada
                </button>
            </div>
        </div>
    );
}
