import Link from "next/link";

export function StudentHeader() {
    return (
        <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                    Olá, João! Faltam 5 missões para sua CNH.
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal">
                    Você está indo muito bem. Acompanhe seu progresso diário.
                </p>
            </div>
            {/* Progress Bar Component */}
            <Link href="/student/performance">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:border-student-primary/30 transition-colors cursor-pointer">
                    <div className="flex flex-wrap gap-4 justify-between items-end mb-3">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-student-primary">
                                psychology
                            </span>
                            <p className="text-slate-900 dark:text-white text-base font-bold">
                                Nível de Confiança
                            </p>
                        </div>
                        <p className="text-student-primary text-xl font-bold">45%</p>
                    </div>
                    <div className="relative w-full h-4 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-student-primary to-blue-400 transition-all duration-1000 ease-out"
                            style={{ width: "45%" }}
                        ></div>
                    </div>
                    <div className="mt-2 text-right">
                        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wide">
                            Quase na metade!
                        </p>
                    </div>
                </div>
            </Link>
        </section>
    );
}
