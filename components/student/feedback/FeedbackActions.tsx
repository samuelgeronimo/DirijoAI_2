export function FeedbackActions() {
    return (
        <div className="px-8 pb-8 pt-4 flex flex-col gap-3">
            <button className="group flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-student-primary h-12 px-5 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 dark:shadow-none">
                <span className="truncate">Solicitar Troca e Voltar para Busca</span>
                <span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                </span>
            </button>
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
                <span className="truncate">Tentar agendar novamente com ele</span>
            </button>
        </div>
    );
}
