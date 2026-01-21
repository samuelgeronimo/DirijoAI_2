interface WallOfFameProps {
    successStories: any[];
    instructorId: string;
}

export function WallOfFame({ successStories = [], instructorId }: WallOfFameProps) {
    const getBadgeInfo = (badgeCode: string) => {
        const badges: Record<string, { label: string, icon: string, color: string }> = {
            'first_try': { label: 'Passou de 1ª', icon: 'check_circle', color: 'bg-green-500' },
            'perfect_parking': { label: 'Baliza Perfeita', icon: 'local_parking', color: 'bg-blue-500' },
            'fear_lost': { label: 'Perdeu o Medo', icon: 'psychology', color: 'bg-purple-500' },
            '20_lessons': { label: '20 Aulas', icon: 'timer', color: 'bg-orange-500' }
        };
        return badges[badgeCode] || badges['first_try'];
    };

    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary">
                        photo_library
                    </span>
                    Mural da Fama
                </h2>
                <span className="text-xs text-slate-400 border border-slate-700 rounded px-2 py-0.5">
                    +10% saúde
                </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-[#92c9a4] -mt-2">
                Fotos de alunos aprovados com a CNH geram confiança imediata.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {successStories.map((story) => {
                    const badge = getBadgeInfo(story.badge);
                    return (
                        <div key={story.id} className="flex flex-col gap-2">
                            <div
                                className="aspect-square rounded-lg bg-cover bg-center relative group overflow-hidden"
                                style={{
                                    backgroundImage: `url('${story.photo_url}')`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                <button className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                                {story.badge && (
                                    <div className={`absolute bottom-2 left-2 ${badge.color} text-white text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1`}>
                                        <span className="material-symbols-outlined text-[10px]">{badge.icon}</span>
                                        {badge.label}
                                    </div>
                                )}
                            </div>
                            <input
                                className="bg-transparent border-b border-slate-700 text-xs py-1 focus:outline-none focus:border-instructor-primary w-full text-slate-300 placeholder-slate-600"
                                type="text"
                                defaultValue={story.student_name}
                                placeholder="Nome do Aluno"
                            />
                        </div>
                    );
                })}

                {/* Add Button */}
                <button className="aspect-square rounded-lg border border-dashed border-slate-600 flex flex-col items-center justify-center gap-2 hover:bg-[#1a3324] hover:border-instructor-primary transition-all text-slate-400 hover:text-instructor-primary cursor-pointer">
                    <span className="material-symbols-outlined text-3xl">add_circle</span>
                    <span className="text-xs font-medium">Adicionar</span>
                </button>
            </div>
        </section>
    );
}
