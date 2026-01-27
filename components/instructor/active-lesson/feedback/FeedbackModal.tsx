"use client";

import Link from "next/link";
import { DifficultyChips } from "./DifficultyChips";

import { useState, useTransition } from "react";
import { completeLesson } from "@/app/instructor/actions";
import { PerformanceSliders, SkillsState } from "./PerformanceSliders";

export function FeedbackModal() {
    const [isPending, startTransition] = useTransition();
    const [skills, setSkills] = useState<SkillsState>({
        clutchControl: 8,
        spatialAwareness: 7,
        lawRespect: 9
    });

    const handleComplete = () => {
        startTransition(async () => {
            // Calculate Score (Simple Average * 10 => 0-100)
            const sum = Object.values(skills).reduce((a, b) => a + b, 0);
            const avg = sum / Object.values(skills).length;
            const score = Math.round(avg * 10);

            await completeLesson({
                score,
                skills: skills as unknown as Record<string, number>
            });
        });
    };

    return (
        <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#1A2E22] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col max-h-[90vh]">
            {/* Header Section */}
            <div className="p-6 pb-2 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Como foi o desempenho do aluno?
                        </h1>
                        <p className="text-slate-500 dark:text-[#92c9a4] text-sm font-normal leading-relaxed">
                            Seu feedback ajuda na evolução e garante seu pagamento.
                        </p>
                    </div>
                    <Link
                        href="/instructor/dashboard"
                        className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </Link>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <PerformanceSliders values={skills} onChange={setSkills} />
                <DifficultyChips />

                {/* Info Note */}
                <div className="bg-slate-50 dark:bg-[#112217] rounded-lg p-4 flex gap-3 items-start border border-slate-100 dark:border-white/5">
                    <span className="material-symbols-outlined text-[#92c9a4] text-xl mt-0.5">
                        info
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Essas informações são confidenciais e usadas para gerar o{" "}
                        <span className="text-slate-800 dark:text-white font-semibold">
                            relatório de evolução
                        </span>{" "}
                        do aluno e personalizar as{" "}
                        <span className="text-slate-800 dark:text-white font-semibold">
                            sugestões de estudo
                        </span>{" "}
                        para a próxima aula.
                    </p>
                </div>
            </div>

            {/* Footer / Action Area */}
            <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#1A2E22] z-20">
                <button
                    onClick={handleComplete}
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 bg-instructor-primary hover:bg-[#0fae42] text-slate-900 font-bold text-base py-4 px-6 rounded-xl shadow-lg shadow-instructor-primary/20 transition-all transform active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <span className="material-symbols-outlined animate-spin">
                            progress_activity
                        </span>
                    ) : (
                        <span className="material-symbols-outlined">payments</span>
                    )}
                    {isPending ? "PROCESSANDO..." : "Concluir e Liberar Pagamento"}
                </button>
            </div>
        </div>
    );
}
