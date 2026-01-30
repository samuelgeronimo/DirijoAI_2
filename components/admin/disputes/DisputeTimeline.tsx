"use client";

interface DisputeTimelineProps {
    createdAt?: string;
}

export function DisputeTimeline({ createdAt }: DisputeTimelineProps) {
    const createdDate = createdAt ? new Date(createdAt) : new Date();

    return (
        <div className="xl:col-span-3 bg-[#111a22] rounded-xl border border-[#324d67] flex flex-col">
            <div className="p-4 border-b border-[#324d67] bg-[#1a2632]/50">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#92adc9]">
                        timeline
                    </span>
                    Linha do Tempo
                </h3>
            </div>
            <div className="p-4 relative flex-1">
                <div className="absolute top-6 bottom-6 left-[27px] w-0.5 bg-[#324d67]"></div>
                <div className="flex flex-col gap-6 relative">
                    <div className="flex gap-4">
                        <div className="relative z-10 flex items-center justify-center size-7 rounded-full bg-[#1e293b] border-2 border-[#137fec] text-[#137fec] shrink-0">
                            <span className="material-symbols-outlined text-[14px]">
                                calendar_today
                            </span>
                        </div>
                        <div className="flex flex-col pt-0.5">
                            <p className="text-slate-300 text-sm font-medium">
                                Disputa Aberta
                            </p>
                            <p className="text-[#5a718a] text-xs">
                                {createdDate.toLocaleDateString('pt-BR')} às {createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>

                    {/* Placeholder for future status updates */}
                    <div className="flex gap-4 opacity-50">
                        <div className="relative z-10 flex items-center justify-center size-7 rounded-full bg-[#1e293b] border border-[#324d67] text-[#5a718a] shrink-0">
                            <span className="material-symbols-outlined text-[14px]">
                                gavel
                            </span>
                        </div>
                        <div className="flex flex-col pt-0.5">
                            <p className="text-[#5a718a] text-sm font-medium">
                                Aguardando Veredito
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
