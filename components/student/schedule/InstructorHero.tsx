interface InstructorHeroProps {
    instructorName: string;
    instructorAvatar: string;
    vehicleInitial: string; // e.g., "HB20 Branco • Placa ABC-1234"
    balance: number;
    totalPackage: number;
}

export function InstructorHero({ instructorName, instructorAvatar, vehicleInitial, balance, totalPackage }: InstructorHeroProps) {
    const progress = Math.min(100, Math.round(((totalPackage - balance) / totalPackage) * 100));

    return (
        <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-6 items-center md:items-start relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-student-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="relative shrink-0">
                <div className="h-28 w-28 md:h-32 md:w-32 rounded-full ring-4 ring-white dark:ring-slate-900 shadow-lg overflow-hidden">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("${instructorAvatar || 'https://via.placeholder.com/150'}")`,
                        }}
                    ></div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-md border border-slate-100 dark:border-slate-700">
                    <span className="material-symbols-outlined text-student-primary text-xl">
                        verified
                    </span>
                </div>
            </div>
            <div className="flex-1 text-center md:text-left z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        Agenda de {instructorName}
                    </h2>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg self-center md:self-auto border border-slate-100 dark:border-slate-700">
                        <span className="material-symbols-outlined text-slate-500">
                            directions_car
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            {vehicleInitial}
                        </span>
                    </div>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    Vamos continuar seu progresso? Você tem{" "}
                    <span className="font-bold text-student-primary">
                        {balance} aulas restantes
                    </span>{" "}
                    com este instrutor.
                </p>
                {/* Progress Bar visual */}
                <div className="w-full max-w-md mx-auto md:mx-0 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-2">
                    <div
                        className="bg-student-primary h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {progress}% do pacote concluído
                </p>
            </div>
        </section>
    );
}
