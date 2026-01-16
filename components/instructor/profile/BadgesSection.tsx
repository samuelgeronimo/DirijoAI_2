export function BadgesSection() {
    return (
        <section className="flex flex-col gap-4 pb-24">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary">
                        verified
                    </span>
                    Seus Superpoderes
                </h2>
                <span className="text-xs text-slate-400 border border-slate-700 rounded px-2 py-0.5">
                    +5% saúde
                </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-[#92c9a4] -mt-2">
                Selecione até 4 características que definem sua aula.
            </p>
            <div className="flex flex-wrap gap-3">
                {/* Active Badge */}
                <button className="px-4 py-2 rounded-full border border-instructor-primary bg-instructor-primary/20 text-instructor-primary text-sm font-semibold flex items-center gap-2 transition-all hover:bg-instructor-primary/30 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">psychology</span>
                    Psicólogo
                </button>
                {/* Active Badge */}
                <button className="px-4 py-2 rounded-full border border-instructor-primary bg-instructor-primary/20 text-instructor-primary text-sm font-semibold flex items-center gap-2 transition-all hover:bg-instructor-primary/30 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    Paciência Infinita
                </button>
                {/* Inactive Badges */}
                <button className="px-4 py-2 rounded-full border border-slate-600 bg-transparent text-slate-400 text-sm font-medium flex items-center gap-2 hover:border-slate-400 hover:text-white transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">
                        local_parking
                    </span>
                    Rei da Baliza
                </button>
                <button className="px-4 py-2 rounded-full border border-slate-600 bg-transparent text-slate-400 text-sm font-medium flex items-center gap-2 hover:border-slate-400 hover:text-white transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">
                        sentiment_very_satisfied
                    </span>
                    Divertido
                </button>
                <button className="px-4 py-2 rounded-full border border-slate-600 bg-transparent text-slate-400 text-sm font-medium flex items-center gap-2 hover:border-slate-400 hover:text-white transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    Intensivão
                </button>
                <button className="px-4 py-2 rounded-full border border-slate-600 bg-transparent text-slate-400 text-sm font-medium flex items-center gap-2 hover:border-slate-400 hover:text-white transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">map</span>
                    Conhece Tudo
                </button>
                <button className="px-4 py-2 rounded-full border border-slate-600 bg-transparent text-slate-400 text-sm font-medium flex items-center gap-2 hover:border-slate-400 hover:text-white transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">school</span>
                    Teórico Forte
                </button>
            </div>
        </section>
    );
}
