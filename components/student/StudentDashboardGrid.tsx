import Link from "next/link";

export function StudentDashboardGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column (Main Hero Card) */}
            <div className="md:col-span-8 flex flex-col gap-6">
                {/* Hero Card: Next Lesson */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-100 dark:border-slate-700 group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-48 md:h-64 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <div
                            className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-YHAtPtLjrJTXAVF3SUysCs7WOYN1dOqapf9xksv9AzvNg0w9V-GFFKtLo7OEyy8na8PWITuP3rCSgsLgeE65aOLFSKqQ6sWD4AEYtIdC8rXTc9ECo1ejmC11iI52qVWGlXcIysDi0ZR50eJRzsPl2EF1LjHi4cOheQo2Har5zUNjKjViHK4GrUjxaYdlq2NraS6WBC-0l1hCpf918s6lX1paMFsMLrfpW-6pXThUylu0Rlsjo63wP51rzB4VZ7dBUCqSES46kMLr")',
                            }}
                        ></div>
                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-student-primary text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                                Próxima Aula
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight mb-1">
                                    Amanhã às 14:00
                                </h2>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-lg">
                                        person
                                    </span>
                                    <span>Instrutor Carlos</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mx-1"></span>
                                    <span>Chevrolet Onix Branco</span>
                                </div>
                            </div>
                            {/* Instructor Avatar overlap (Optional visual flair) */}
                            <div className="hidden md:block">
                                <div
                                    className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-700 shadow-sm bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3gv33xKm5eKsDeievL_DR86pdgTuJP6AD61qiAwnvepS2xu_2300pBRttATqjHBuGOCM8eXLCWNs36sAo_KaEembHsp30QVjedCKNHMeQzNyHgv4Gt2jLGV_dwa3Z5Qa9cuvnLhk6kdGvn1fORTzdBDGLYcij_cMBwpBerr6VgccybSb1TnUSZmOVJx6mqcP-dHJ3Lie_RRK03RKTKXlS66lQgaZIbSQGr1STA0J6BEBONJHUklosSFud2p2R9nWaeXMv5U1TDsm_")',
                                    }}
                                ></div>
                            </div>
                        </div>
                        <hr className="border-slate-100 dark:border-slate-700 my-4" />
                        <div className="flex gap-3">
                            <button className="flex-1 bg-student-primary hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]">
                                    chat
                                </span>
                                Chat
                            </button>
                            <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-[20px] text-student-primary">
                                    map
                                </span>
                                Ver Local
                            </button>
                        </div>
                    </div>
                </div>
                {/* Quick Shortcuts Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Link
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-student-primary/50 hover:shadow-md transition-all group"
                        href="#"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-student-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">history</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Histórico
                        </span>
                    </Link>
                    <Link
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-student-primary/50 hover:shadow-md transition-all group"
                        href="#"
                    >
                        <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Pagamentos
                        </span>
                    </Link>
                    <Link
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-student-primary/50 hover:shadow-md transition-all group col-span-2 sm:col-span-1"
                        href="#"
                    >
                        <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">support_agent</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Suporte
                        </span>
                    </Link>
                </div>
            </div>
            {/* Right Column (Stats & Wallet) */}
            <div className="md:col-span-4 flex flex-col gap-6">
                {/* Wallet Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                    {/* Decorative background circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-2 mb-6 opacity-80">
                        <span className="material-symbols-outlined">
                            account_balance_wallet
                        </span>
                        <span className="text-sm font-medium uppercase tracking-wider">
                            Saldo de Aulas
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 mb-6">
                        <span className="text-4xl font-bold tracking-tight">4 Aulas</span>
                        <span className="text-sm text-slate-400">
                            Disponíveis para agendar
                        </span>
                    </div>
                    <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">
                            add_circle
                        </span>
                        Recarregar
                    </button>
                </div>
                {/* Mini Stats / Motivation */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                    <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-500">
                            emoji_events
                        </span>
                        Conquistas Recentes
                    </h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-3 items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Baliza Perfeita
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Completou em menos de 3 min
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-student-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-sm">
                                    auto_stories
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Teoria em Dia
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Módulo de Legislação concluído
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <Link
                            className="text-sm text-student-primary font-medium hover:underline"
                            href="#"
                        >
                            Ver todas as conquistas
                        </Link>
                    </div>
                </div>
                {/* Map Preview (Location Context) */}
                <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 h-full min-h-[200px] relative group">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuByg78dJnwusrri4uGBX5_j5568NGeJlI4K8Sz8TM29zwoEMqFp633eSNq9uv-BWKHaAU892IET-QVd0ABsKjX1x8Fcw4gzJI86R5QU8Pxqiwa7mF9ZDErXsfZIXR3GjquUVeuQZHnp3mvmZSVKASnarMFiUN0JBZyYu5iSM2LBdLmP1fqoqhlmJ9yCD5nDqDd66PYSzOJ21-UH_1xXR8jvxT32Sh-oHQyfN2YwiDrv_F8l6errCyWJXB3UX0zoRUh5B_eHRo2C9YNo")',
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-xs font-medium uppercase text-slate-300 mb-1">
                            Local da prova
                        </p>
                        <p className="font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">
                                location_on
                            </span>
                            DETRAN - Unidade Vila Mariana
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
