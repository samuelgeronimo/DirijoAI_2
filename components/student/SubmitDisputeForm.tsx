
"use client";

import { useState } from "react";
import { createDispute } from "@/app/student/actions";

export function SubmitDisputeForm({ lessonId }: { lessonId: string }) {
    const [reason, setReason] = useState("instructor_no_show");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <form
            action={createDispute}
            onSubmit={() => setIsSubmitting(true)}
            className="flex flex-col gap-4"
        >
            <input type="hidden" name="lessonId" value={lessonId} />
            <input type="hidden" name="evidenceUrls" value="[]" /> {/* TODO: Upload implementation */}

            <div>
                <label className="block text-xs font-bold text-[#92adc9] uppercase mb-2">Motivo</label>
                <select
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-[#0d141b] border border-[#324d67] rounded-lg p-3 text-white focus:border-[#137fec] outline-none"
                >
                    <option value="instructor_no_show">Instrutor não compareceu</option>
                    <option value="instructor_late">Instrutor atrasou muito</option>
                    <option value="vehicle_condition">Veículo em más condições</option>
                    <option value="harassment">Comportamento inadequado</option>
                    <option value="other">Outro</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-[#92adc9] uppercase mb-2">Descrição</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 bg-[#0d141b] border border-[#324d67] rounded-lg p-3 text-white placeholder-[#5a718a] focus:border-[#137fec] outline-none resize-none"
                    placeholder="Descreva detalhadamente o que aconteceu..."
                    required
                ></textarea>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex justify-center"
                >
                    {isSubmitting ? (
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                        "Abrir Disputa"
                    )}
                </button>
            </div>
        </form>
    );
}
