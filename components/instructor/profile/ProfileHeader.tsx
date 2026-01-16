export function ProfileHeader() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-1">
                        Editar Perfil
                    </h1>
                    <p className="text-slate-500 dark:text-[#92c9a4]">
                        Otimize seu perfil para atrair mais alunos.
                    </p>
                </div>
            </div>
            {/* Gamified Health Bar */}
            <div className="bg-white dark:bg-[#1a3324] p-5 rounded-xl border border-slate-200 dark:border-[#2f5c3e] shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-400">
                            vital_signs
                        </span>
                        <span className="font-bold">
                            Saúde do Perfil: <span className="text-instructor-primary">70%</span>
                        </span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-instructor-primary/10 text-instructor-primary rounded-full animate-pulse">
                        Quase lá!
                    </span>
                </div>
                {/* Gradient Progress Bar */}
                <div className="h-3 w-full bg-slate-100 dark:bg-[#0d1a11] rounded-full overflow-hidden mb-2">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-instructor-primary"
                        style={{ width: "70%" }}
                    ></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-instructor-primary">
                        trending_up
                    </span>
                    Adicione um vídeo para atrair{" "}
                    <b className="text-slate-900 dark:text-white">3x mais alunos!</b>
                </p>
            </div>
        </div>
    );
}
