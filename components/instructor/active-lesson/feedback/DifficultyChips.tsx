"use client";

import { useState } from "react";

const difficulties = [
    { id: "baliza", label: "Baliza", icon: "local_parking" },
    { id: "ladeira", label: "Ladeira", icon: "landscape" },
    { id: "medo", label: "Medo/Ansiedade", icon: "sentiment_worried" },
    { id: "regras", label: "Regras", icon: "traffic" },
];

export function DifficultyChips() {
    const [selected, setSelected] = useState<string[]>(["baliza"]);

    const toggleChip = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-4 pt-2">
            <h2 className="text-slate-800 dark:text-white text-lg font-bold leading-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">
                    warning
                </span>
                Houve dificuldade crítica?
            </h2>
            <div className="flex flex-wrap gap-3">
                {difficulties.map((diff) => {
                    const isSelected = selected.includes(diff.id);
                    return (
                        <button
                            key={diff.id}
                            onClick={() => toggleChip(diff.id)}
                            className={`relative group flex items-center justify-center px-4 py-2.5 rounded-xl border font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 cursor-pointer ${isSelected
                                    ? "border-instructor-primary bg-instructor-primary/10 text-instructor-primary"
                                    : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 dark:hover:border-white/30"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px] mr-2">
                                {diff.icon}
                            </span>
                            {diff.label}
                            {isSelected && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-instructor-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-instructor-primary"></span>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
