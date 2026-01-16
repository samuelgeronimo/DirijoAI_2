"use client";

import Link from "next/link";

export function LessonFooter() {
    return (
        <footer className="flex-none bg-[#2a1515] border-t border-white/5 p-4 md:px-8 md:py-5 relative z-10">
            <div className="max-w-7xl mx-auto flex gap-4">
                <button className="flex-1 md:flex-none md:w-48 h-14 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">pause</span>
                    PAUSAR AULA
                </button>
                <div className="flex-1"></div> {/* Spacer */}
                <Link
                    href="/instructor/active-lesson/feedback"
                    className="flex-1 md:flex-none md:w-64 h-14 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all cursor-pointer"
                >
                    <span className="material-symbols-outlined">flag</span>
                    FINALIZAR AULA
                </Link>
            </div>
        </footer>
    );
}
