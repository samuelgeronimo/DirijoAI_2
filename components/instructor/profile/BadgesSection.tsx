interface BadgesSectionProps {
    superpowers: string[];
    instructorId: string;
}

const AVAILABLE_SUPERPOWERS = [
    { label: 'Psicólogo', icon: 'psychology', aliases: ['🧠 Psicólogo'] },
    { label: 'Paciência Infinita', icon: 'timer', aliases: ['🛡️ Paciente'] },
    { label: 'Rei da Baliza', icon: 'local_parking', aliases: ['🎯 Rei da Baliza'] },
    { label: 'Divertido', icon: 'sentiment_very_satisfied', aliases: [] },
    { label: 'Intensivão', icon: 'bolt', aliases: ['⚡ Intensivão'] },
    { label: 'Conhece Tudo', icon: 'map', aliases: ['🛣️ Rodovia'] },
    { label: 'Teórico Forte', icon: 'school', aliases: [] }
];

export function BadgesSection({ superpowers = [], instructorId }: BadgesSectionProps) {
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
                {AVAILABLE_SUPERPOWERS.map((badge) => {
                    const isActive = superpowers.some(s => s === badge.label || badge.aliases.includes(s));
                    return (
                        <button
                            key={badge.label}
                            className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${isActive
                                ? 'border-instructor-primary bg-instructor-primary/20 text-instructor-primary hover:bg-instructor-primary/30 font-semibold'
                                : 'border-slate-600 bg-transparent text-slate-400 hover:border-slate-400 hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined text-sm">{badge.icon}</span>
                            {badge.label}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
