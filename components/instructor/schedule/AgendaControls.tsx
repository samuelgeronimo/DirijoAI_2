export function AgendaControls() {
    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Sua Agenda
                    </h2>
                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500 border border-green-500/20">
                        Online
                    </span>
                </div>
                <p className="text-[#92a4c9]">
                    Gerencie ocupação e ative promoções relâmpago.
                </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
                {/* Date Navigation */}
                <div className="flex items-center rounded-lg bg-instructor-surface-dark-2 border border-instructor-surface-dark p-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 text-[#92a4c9] cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">
                            chevron_left
                        </span>
                    </button>
                    <span className="px-3 text-sm font-medium text-white min-w-[140px] text-center">
                        12 - 18 Fev, 2024
                    </span>
                    <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 text-[#92a4c9] cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">
                            chevron_right
                        </span>
                    </button>
                </div>
                {/* View Switcher */}
                <div className="flex h-10 items-center rounded-lg bg-instructor-surface-dark-2 p-1 border border-instructor-surface-dark">
                    <button className="flex h-full items-center justify-center rounded px-3 text-sm font-medium text-[#92a4c9] hover:text-white transition-colors cursor-pointer">
                        Dia
                    </button>
                    <button className="flex h-full items-center justify-center rounded bg-instructor-bg-dark px-3 text-sm font-medium text-white shadow-sm ring-1 ring-black/5 cursor-pointer">
                        Semana
                    </button>
                    <button className="flex h-full items-center justify-center rounded px-3 text-sm font-medium text-[#92a4c9] hover:text-white transition-colors cursor-pointer">
                        Mês
                    </button>
                </div>
            </div>
        </div>
    );
}
