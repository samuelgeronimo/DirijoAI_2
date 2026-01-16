export function AddressList() {
    return (
        <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Endereços Favoritos
                    </h2>
                    <button className="text-student-primary hover:bg-student-primary/10 p-2 rounded-full transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    {/* Address Item 1 */}
                    <div className="group flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-student-primary/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-slate-700 p-2 rounded-full text-student-primary shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">
                                    home
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white text-sm">
                                    Casa
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                                    Rua das Flores, 123
                                </p>
                            </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button className="text-slate-500 hover:text-student-primary p-1 cursor-pointer">
                                <span className="material-symbols-outlined text-[18px]">
                                    edit
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Address Item 2 */}
                    <div className="group flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-student-primary/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-slate-700 p-2 rounded-full text-student-primary shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">
                                    work
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white text-sm">
                                    Trabalho
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                                    Av. Paulista, 1000
                                </p>
                            </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button className="text-slate-500 hover:text-student-primary p-1 cursor-pointer">
                                <span className="material-symbols-outlined text-[18px]">
                                    edit
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Address Item 3 */}
                    <div className="group flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-student-primary/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-slate-700 p-2 rounded-full text-student-primary shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">
                                    school
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white text-sm">
                                    Faculdade
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                                    Universidade Est...
                                </p>
                            </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button className="text-slate-500 hover:text-student-primary p-1 cursor-pointer">
                                <span className="material-symbols-outlined text-[18px]">
                                    edit
                                </span>
                            </button>
                        </div>
                    </div>
                    <button className="mt-2 w-full py-2 border border-dashed border-student-primary/40 text-student-primary text-sm font-medium rounded-lg hover:bg-student-primary/5 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">
                            add_location_alt
                        </span>
                        Adicionar novo endereço
                    </button>
                </div>
            </div>
        </div>
    );
}
