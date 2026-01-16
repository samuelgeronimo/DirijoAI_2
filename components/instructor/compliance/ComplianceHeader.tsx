export function ComplianceHeader() {
    return (
        <div className="mb-8 flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Sua Central de Segurança
                    </h1>
                    <p className="mt-2 text-base text-[#92a4c9]">
                        Mantenha seus documentos em dia para garantir seus saques e
                        visibilidade.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 rounded-lg bg-instructor-surface-dark-2 px-4 py-2 text-sm font-medium text-white hover:bg-instructor-surface-dark-2/80 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">history</span>
                        Histórico
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-instructor-primary px-4 py-2 text-sm font-medium text-[#102216] hover:bg-instructor-primary-hover transition-colors shadow-lg shadow-instructor-primary/20 cursor-pointer">
                        <span className="material-symbols-outlined text-lg">
                            support_agent
                        </span>
                        Suporte
                    </button>
                </div>
            </div>
        </div>
    );
}
