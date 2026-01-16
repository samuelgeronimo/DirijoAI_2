export function CalendarGrid() {
    return (
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                    Selecione um horário
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-student-primary"></span>{" "}
                        Livre
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>{" "}
                        Ocupado
                    </span>
                </div>
            </div>
            {/* Desktop Week Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {/* Day Column: Seg */}
                <div className="flex flex-col gap-3">
                    <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 font-medium uppercase">Seg</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            12
                        </p>
                    </div>
                    {/* Slot: Occupied */}
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed group relative overflow-hidden"
                        disabled
                    >
                        <span className="text-sm font-medium line-through decoration-slate-400">
                            08:00
                        </span>
                    </button>
                    {/* Slot: Available */}
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 group cursor-pointer">
                        <span className="text-sm font-bold">09:00</span>
                    </button>
                    {/* Slot: Occupied */}
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">10:00</span>
                    </button>
                    {/* Slot: Available */}
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 group cursor-pointer">
                        <span className="text-sm font-bold">11:00</span>
                    </button>
                </div>
                {/* Day Column: Ter */}
                <div className="flex flex-col gap-3">
                    <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 font-medium uppercase">Ter</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            13
                        </p>
                    </div>
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary text-white border border-student-primary shadow-md shadow-student-primary/20 ring-2 ring-student-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-800 transform scale-[1.02] cursor-pointer">
                        <span className="text-sm font-bold">08:00</span>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                    </button>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">09:00</span>
                    </button>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">10:00</span>
                    </button>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">11:00</span>
                    </button>
                </div>
                {/* Day Column: Qua */}
                <div className="flex flex-col gap-3">
                    <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 font-medium uppercase">Qua</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            14
                        </p>
                    </div>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">08:00</span>
                    </button>
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 cursor-pointer">
                        <span className="text-sm font-bold">09:00</span>
                    </button>
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 cursor-pointer">
                        <span className="text-sm font-bold">10:00</span>
                    </button>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">11:00</span>
                    </button>
                </div>
                {/* Day Column: Qui */}
                <div className="flex flex-col gap-3">
                    <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 font-medium uppercase">Qui</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            15
                        </p>
                    </div>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">08:00</span>
                    </button>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">09:00</span>
                    </button>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">10:00</span>
                    </button>
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 cursor-pointer">
                        <span className="text-sm font-bold">11:00</span>
                    </button>
                </div>
                {/* Day Column: Sex */}
                <div className="flex flex-col gap-3">
                    <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 font-medium uppercase">Sex</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            16
                        </p>
                    </div>
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 cursor-pointer">
                        <span className="text-sm font-bold">08:00</span>
                    </button>
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 cursor-pointer">
                        <span className="text-sm font-bold">09:00</span>
                    </button>
                    <button className="w-full py-3 px-2 rounded-lg bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border border-student-primary/20 hover:border-student-primary transition-all duration-200 cursor-pointer">
                        <span className="text-sm font-bold">10:00</span>
                    </button>
                    <button
                        className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                        disabled
                    >
                        <span className="text-sm font-medium line-through">11:00</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
