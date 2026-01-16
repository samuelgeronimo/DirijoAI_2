export function SkillsList() {
    return (
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            {/* Skill Item: Embreagem (Green) */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-500">
                            check_circle
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Controle de Embreagem
                        </p>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded">
                        Excelente
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500 w-[90%] shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        90%
                    </p>
                </div>
            </div>
            {/* Skill Item: Noção de Espaço (Green) */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-500">
                            check_circle
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Noção de Espaço
                        </p>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded">
                        Muito Bom
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500 w-[85%] shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        85%
                    </p>
                </div>
            </div>
            {/* Skill Item: Regras de Trânsito (Yellow) */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-amber-500">
                            warning
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Regras de Trânsito
                        </p>
                    </div>
                    <span className="text-amber-600 dark:text-amber-400 font-bold text-sm bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded">
                        Atenção
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400 w-[60%] shadow-[0_0_10px_rgba(251,191,36,0.4)]"></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        60%
                    </p>
                </div>
            </div>
            {/* Skill Item: Baliza (Red - Critical) */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border-2 border-rose-100 dark:border-rose-900/50 flex flex-col gap-3 relative overflow-hidden group">
                {/* Visual indicator stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500"></div>
                <div className="flex justify-between items-center pl-2">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-rose-500 animate-pulse">
                            error
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Baliza
                        </p>
                    </div>
                    <span className="text-rose-600 dark:text-rose-400 font-bold text-sm bg-rose-50 dark:bg-rose-900/30 px-2 py-1 rounded">
                        Crítico
                    </span>
                </div>
                <div className="flex items-center gap-4 pl-2">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className="h-full rounded-full bg-rose-500 w-[30%] shadow-[0_0_10px_rgba(244,63,94,0.4)]"></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        30%
                    </p>
                </div>
            </div>
            {/* Skill Item: Ladeira (Yellow) */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-amber-500">
                            warning
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Ladeira
                        </p>
                    </div>
                    <span className="text-amber-600 dark:text-amber-400 font-bold text-sm bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded">
                        Praticar mais
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400 w-[55%] shadow-[0_0_10px_rgba(251,191,36,0.4)]"></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        55%
                    </p>
                </div>
            </div>
        </div>
    );
}
