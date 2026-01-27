interface SkillsListProps {
    skills: {
        clutchControl: number;
        spatialAwareness: number;
        lawRespect: number;
    } | null;
}

export function SkillsList({ skills }: SkillsListProps) {
    if (!skills) {
        return (
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl text-center text-slate-500">
                    Ainda não há dados suficientes para gerar o gráfico de habilidades.
                </div>
            </div>
        );
    }

    // Helper to determine status color/text
    const getStatus = (val: number) => {
        const pct = val * 10;
        if (val >= 8) return { text: "Excelente", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30", bar: "bg-emerald-500", icon: "check_circle", iconColor: "text-emerald-500" };
        if (val >= 5) return { text: "Bom", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30", bar: "bg-amber-400", icon: "warning", iconColor: "text-amber-500" };
        return { text: "Crítico", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/30", bar: "bg-rose-500", icon: "error", iconColor: "text-rose-500" };
    };

    const clutch = getStatus(skills.clutchControl);
    const space = getStatus(skills.spatialAwareness);
    const laws = getStatus(skills.lawRespect);

    return (
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            {/* Skill Item: Embreagem */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${clutch.iconColor}`}>
                            {clutch.icon}
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Controle de Embreagem
                        </p>
                    </div>
                    <span className={`${clutch.color} font-bold text-sm ${clutch.bg} px-2 py-1 rounded`}>
                        {clutch.text}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className={`h-full rounded-full ${clutch.bar}`} style={{ width: `${skills.clutchControl * 10}%` }}></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        {Math.round(skills.clutchControl * 10)}%
                    </p>
                </div>
            </div>

            {/* Skill Item: Noção de Espaço */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${space.iconColor}`}>
                            {space.icon}
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Noção de Espaço
                        </p>
                    </div>
                    <span className={`${space.color} font-bold text-sm ${space.bg} px-2 py-1 rounded`}>
                        {space.text}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className={`h-full rounded-full ${space.bar}`} style={{ width: `${skills.spatialAwareness * 10}%` }}></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        {Math.round(skills.spatialAwareness * 10)}%
                    </p>
                </div>
            </div>

            {/* Skill Item: Regras de Trânsito */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${laws.iconColor}`}>
                            {laws.icon}
                        </span>
                        <p className="text-slate-900 dark:text-white text-base font-semibold">
                            Regras de Trânsito
                        </p>
                    </div>
                    <span className={`${laws.color} font-bold text-sm ${laws.bg} px-2 py-1 rounded`}>
                        {laws.text}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                        <div className={`h-full rounded-full ${laws.bar}`} style={{ width: `${skills.lawRespect * 10}%` }}></div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold min-w-[3ch]">
                        {Math.round(skills.lawRespect * 10)}%
                    </p>
                </div>
            </div>
        </div>
    );
}
