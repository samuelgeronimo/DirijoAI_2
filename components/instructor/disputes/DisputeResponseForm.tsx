"use client";

import { useState } from "react";
import { replyToDispute } from "@/app/instructor/actions";
import { formatDateTime } from "@/utils/instructorMetrics";

interface Message {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    sender: {
        full_name: string | null;
    } | null;
}

interface DisputeResponseFormProps {
    disputeId: string;
    reason: string;
    messages: Message[];
    currentUserId: string;
}

export function DisputeResponseForm({ disputeId, reason, messages, currentUserId }: DisputeResponseFormProps) {
    const [defense, setDefense] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter messages to show the student's initial report (usually the first one or ones from student)
    // For simplicity, we show the chat history or just the first description?
    // User requested "motivo e a descrição digitada pelo aluno".
    // Usually the description is the first message.
    const studentMessages = messages.filter(m => m.sender_id !== currentUserId); // Rough approximation
    const description = messages[0]?.content || "Sem descrição disponível.";

    return (
        <div className="flex flex-col gap-6">
            {/* Case Details */}
            <div className="bg-[#1a2632] p-4 rounded-lg border border-[#324d67]">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-500">warning</span>
                    Detalhes da Disputa
                </h3>

                <div className="mb-4">
                    <span className="text-xs uppercase text-[#92adc9] font-bold block mb-1">Motivo Alegado</span>
                    <span className="text-white bg-[#0d141b] px-3 py-1 rounded border border-[#324d67] inline-block">
                        {reason}
                    </span>
                </div>

                <div>
                    <span className="text-xs uppercase text-[#92adc9] font-bold block mb-1">Descrição do Aluno</span>
                    <div className="bg-[#0d141b] p-3 rounded border border-[#324d67] text-gray-300 text-sm whitespace-pre-wrap">
                        {description}
                    </div>
                </div>
            </div>

            {/* Previous Messages / Context (Optional, but good for context) */}
            {messages.length > 1 && (
                <div className="bg-[#1a2632] p-4 rounded-lg border border-[#324d67] max-h-60 overflow-y-auto custom-scrollbar">
                    <h4 className="text-xs uppercase text-[#92adc9] font-bold mb-3">Histórico</h4>
                    <div className="space-y-3">
                        {messages.slice(1).map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender_id === currentUserId ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.sender_id === currentUserId
                                        ? 'bg-instructor-primary/20 text-white border border-instructor-primary/30 rounded-tr-none'
                                        : 'bg-[#0d141b] text-gray-300 border border-[#324d67] rounded-tl-none'
                                    }`}>
                                    <p>{msg.content}</p>
                                </div>
                                <span className="text-[10px] text-gray-500 mt-1">
                                    {msg.sender?.full_name || 'Usuário'} • {formatDateTime(new Date(msg.created_at))}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Defense Form */}
            <form action={replyToDispute} onSubmit={() => setIsSubmitting(true)} className="flex flex-col gap-4">
                <input type="hidden" name="disputeId" value={disputeId} />

                <div>
                    <label className="block text-xs font-bold text-[#92adc9] uppercase mb-2">
                        Sua Justificativa / Defesa
                    </label>
                    <textarea
                        name="content"
                        value={defense}
                        onChange={(e) => setDefense(e.target.value)}
                        className="w-full h-32 bg-[#0d141b] border border-[#324d67] rounded-lg p-3 text-white placeholder-[#5a718a] focus:border-instructor-primary outline-none resize-none"
                        placeholder="Explique sua versão dos fatos..."
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-instructor-primary hover:bg-instructor-primary/90 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {isSubmitting ? (
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                        <>
                            <span className="material-symbols-outlined">send</span>
                            Enviar Resposta
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
