"use client";

import { startLesson } from "@/app/instructor/actions";
import { useTransition } from "react";

interface StartLessonButtonProps {
    lessonId: string;
}

export default function StartLessonButton({ lessonId }: StartLessonButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        startTransition(() => {
            startLesson(lessonId);
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="w-full bg-instructor-primary hover:bg-instructor-primary-hover text-instructor-bg-dark text-lg font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(19,236,91,0.2)] hover:shadow-[0_0_40px_rgba(19,236,91,0.4)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? (
                <span className="material-symbols-outlined animate-spin">
                    progress_activity
                </span>
            ) : (
                <span className="material-symbols-outlined fill-current">
                    play_circle
                </span>
            )}
            {isPending ? "INICIANDO..." : "INICIAR AULA"}
        </button>
    );
}
