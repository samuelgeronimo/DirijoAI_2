export function VSLSection() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary">
                        videocam
                    </span>
                    Vídeo de Apresentação (VSL)
                </h2>
                <span className="text-xs text-slate-400 border border-slate-700 rounded px-2 py-0.5">
                    +15% saúde
                </span>
            </div>
            {/* Empty State Card */}
            <div className="group relative flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-300 dark:border-[#2f5c3e] bg-slate-50 dark:bg-[#1a3324]/50 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1a3324] transition-all cursor-pointer gap-4 text-center">
                <div className="size-16 rounded-full bg-[#112217] flex items-center justify-center shadow-lg shadow-instructor-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-instructor-primary text-3xl">
                        add_a_photo
                    </span>
                </div>
                <div className="max-w-md">
                    <h3 className="text-lg font-bold mb-1">Grave ou envie seu vídeo</h3>
                    <p className="text-sm text-slate-500 dark:text-[#92c9a4] mb-4">
                        Vídeos curtos de 1 minuto apresentando seu método convertem muito
                        mais. Seja autêntico!
                    </p>
                    <button className="bg-instructor-primary hover:bg-instructor-primary-hover text-[#102216] px-6 py-2.5 rounded-lg font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">
                            radio_button_checked
                        </span>
                        Gravar Agora
                    </button>
                    <p className="mt-3 text-xs text-slate-400">
                        ou arraste um arquivo MP4 aqui
                    </p>
                </div>
            </div>
        </section>
    );
}
