export function FocusSelection() {
    return (
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
            {/* Focus Selection */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">
                    O que vamos praticar?
                </h3>
                <div className="flex flex-col gap-3">
                    {/* Option 1: Treino Livre */}
                    <label className="relative flex items-center p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors has-[:checked]:border-student-primary has-[:checked]:bg-student-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-student-primary">
                        <input
                            defaultChecked
                            className="peer sr-only"
                            name="focus"
                            type="radio"
                        />
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-student-primary mr-4">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                                Treino Livre
                            </h4>
                            <p className="text-sm text-slate-500">
                                Prática geral de direção
                            </p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-slate-300 peer-checked:border-student-primary peer-checked:bg-student-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">
                                check
                            </span>
                        </div>
                    </label>
                    {/* Option 2: Baliza */}
                    <label className="relative flex items-center p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors has-[:checked]:border-student-primary has-[:checked]:bg-student-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-student-primary">
                        <input
                            className="peer sr-only"
                            name="focus"
                            type="radio"
                        />
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mr-4">
                            <span className="material-symbols-outlined">local_parking</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                                Baliza
                            </h4>
                            <p className="text-sm text-slate-500">Foco em estacionamento</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-slate-300 peer-checked:border-student-primary peer-checked:bg-student-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">
                                check
                            </span>
                        </div>
                    </label>
                    {/* Option 3: Simulado (Upsell) */}
                    <label className="relative flex items-center p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10 cursor-pointer hover:bg-amber-100/50 transition-colors has-[:checked]:border-amber-500 has-[:checked]:bg-amber-100/30 has-[:checked]:ring-1 has-[:checked]:ring-amber-500">
                        <input
                            className="peer sr-only"
                            name="focus"
                            type="radio"
                        />
                        <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                + R$ 50,00
                            </span>
                        </div>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 mr-4">
                            <span className="material-symbols-outlined">star</span>
                        </div>
                        <div className="flex-1 pr-12">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                                Simulado Prático
                            </h4>
                            <p className="text-sm text-slate-500">
                                Avaliação completa tipo DETRAN
                            </p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-slate-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">
                                check
                            </span>
                        </div>
                    </label>
                </div>
            </div>
            {/* Sticky Bottom for Mobile / Normal for Desktop */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <p className="text-sm text-slate-500">Resumo</p>
                        <p className="font-bold text-lg text-slate-900 dark:text-white">
                            Terça, 13 às 08:00
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Instrutor</p>
                        <p className="font-medium text-slate-900 dark:text-white">
                            Carlos M.
                        </p>
                    </div>
                </div>
                <button className="w-full bg-student-primary hover:bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-student-primary/30 transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer">
                    <span>Confirmar Agendamento</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className="text-center text-xs text-slate-400">
                    Ao confirmar, uma aula será debitada do seu pacote.
                    <br />
                    Cancelamento grátis até 24h antes.
                </p>
            </div>
        </div>
    );
}
