"use client";

interface Message {
    created_at: string;
    content: string;
    sender_id: string;
    evidence_url?: string | null;
    is_system_message: boolean;
    sender: {
        full_name: string | null;
        avatar_url: string | null;
    } | null;
}

interface EvidenceChatProps {
    messages?: Message[];
}

export function EvidenceChat({ messages = [] }: EvidenceChatProps) {
    const sortedMessages = [...messages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    return (
        <div className="xl:col-span-6 bg-[#111a22] rounded-xl border border-[#324d67] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#324d67] bg-[#1a2632]/50 flex justify-between items-center">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#92adc9]">
                        forum
                    </span>
                    Chat de Evidências
                </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0d141b]/50 h-[400px]">
                {sortedMessages.length === 0 && (
                    <div className="flex items-center justify-center h-full text-[#5a718a] text-sm italic">
                        Nenhuma mensagem ou evidência ainda.
                    </div>
                )}

                {sortedMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.is_system_message ? 'justify-center' : 'justify-start'}`}>
                        {msg.is_system_message ? (
                            <span className="text-[11px] text-[#92adc9] italic flex items-center gap-1 my-2">
                                <span className="material-symbols-outlined text-[12px]">info</span>
                                {msg.content}
                            </span>
                        ) : (
                            <>
                                <div
                                    className="size-8 rounded-full bg-cover bg-center shrink-0"
                                    style={{
                                        backgroundImage: `url("${msg.sender?.avatar_url || 'https://via.placeholder.com/150'}")`,
                                    }}
                                ></div>
                                <div className="flex flex-col items-start max-w-[80%]">
                                    <div className="bg-[#1e293b] border border-[#324d67] text-white rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                                        {msg.content}
                                    </div>
                                    {msg.evidence_url && (
                                        <div className="mt-2 rounded-lg overflow-hidden border border-[#324d67] w-[200px] relative group cursor-pointer">
                                            <a href={msg.evidence_url} target="_blank" rel="noopener noreferrer">
                                                {/* Simple placeholder for now, ideally an image tag if we knew it was an image */}
                                                <div className="bg-slate-700 h-[120px] w-full flex items-center justify-center text-[#5a718a]">
                                                    <span className="material-symbols-outlined">image</span>
                                                </div>
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-white">
                                                        visibility
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                    <span className="text-[10px] text-[#5a718a] mt-1 ml-1">
                                        {msg.sender?.full_name} • {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-[#324d67] bg-[#1a2632]">
                <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                    <input
                        className="w-full bg-[#111a22] border border-[#324d67] rounded-lg px-3 py-2 text-sm text-[#92adc9] italic"
                        disabled
                        type="text"
                        value="Chat apenas para leitura (histórico)"
                    />
                </div>
            </div>
        </div>
    );
}
