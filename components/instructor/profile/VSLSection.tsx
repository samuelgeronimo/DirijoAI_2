interface VSLSectionProps {
    videoUrl: string | null;
    instructorId: string;
}

export function VSLSection({ videoUrl, instructorId }: VSLSectionProps) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary">
                        videocam
                    </span>
                    Vídeo de Apresentação (VSL)
                </h2>
                {!videoUrl && (
                    <span className="text-xs text-slate-400 border border-slate-700 rounded px-2 py-0.5">
                        +15% saúde
                    </span>
                )}
            </div>
            {/* Conditional Rendering based on videoUrl */}
            {videoUrl ? (
                <div className="bg-white dark:bg-[#1a3324] p-4 rounded-xl border border-slate-200 dark:border-[#2f5c3e]">
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black relative group">
                        <video src={videoUrl} controls className="w-full h-full object-cover" />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined">check_circle</span>
                            Vídeo Ativo
                        </p>
                        <button className="text-sm text-slate-500 hover:text-instructor-primary font-medium">
                            Substituir Vídeo
                        </button>
                    </div>
                </div>
            ) : (
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
            )}
        </section>
    );
}
