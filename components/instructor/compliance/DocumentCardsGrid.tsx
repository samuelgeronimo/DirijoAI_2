import { DocumentCard } from "./DocumentCard";

export function DocumentCardsGrid() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: Critical - Curso de Instrutor */}
            <DocumentCard
                status="critical"
                title="Curso de Instrutor"
                subtitle="VENCIDO"
                icon="lock"
            >
                <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-rose-100/80">
                        <span className="font-semibold text-rose-200">Atenção:</span> Seu
                        perfil está invisível para novos alunos e os saques estão
                        temporariamente bloqueados.
                    </p>
                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-900/20 transition-all hover:bg-rose-500 active:scale-95 cursor-pointer">
                            <span className="material-symbols-outlined">upload_file</span>
                            Enviar Novo Documento
                        </button>
                        <button
                            className="flex items-center justify-center rounded-lg border border-rose-500/30 bg-transparent px-3 py-2.5 text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Capturar com camera"
                        >
                            <span className="material-symbols-outlined">photo_camera</span>
                        </button>
                    </div>
                </div>
            </DocumentCard>

            {/* Card 2: Warning - CRLV */}
            <DocumentCard
                status="warning"
                title="CRLV (Veículo)"
                subtitle="Vence em 15 dias"
                icon="warning"
            >
                <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg bg-amber-950/30 border border-amber-900/50 p-3">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded w-12 h-12 shrink-0"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_rRwo-DZlxngeeUHfo3P6CVNZVoEeZ-WAuA0MFGtiquCK3N_OKbrNHD1VFUd7MMImCuIgFA_kniS9fFUYphWHcBty-fMWSmcr4iu7eN9tw-kV4OAZVAydFT-aDnpZpS02cNjH2tWi--zkmtSrIEuA3zVRMRKjeaFR-c4cB-DPEvKAezTqbmcV6kq1l_Y2myl3xb3xZ8LDHzj8YFDti2xBgWrU_ElG4FhgeOMhJzwAFCw3G-7XErD_LvzhElEbGd4z1O-5f-5zU1Kk')",
                            }}
                        ></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-amber-200/70">Placa</span>
                            <span className="text-sm font-medium text-white">ABC-1234</span>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-400 active:scale-95 cursor-pointer">
                            Atualizar Agora
                        </button>
                        <button
                            className="flex items-center justify-center rounded-lg border border-amber-500/30 bg-transparent px-3 py-2.5 text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
                            title="Capturar com camera"
                        >
                            <span className="material-symbols-outlined">photo_camera</span>
                        </button>
                    </div>
                </div>
            </DocumentCard>

            {/* Card 3: Success - CNH */}
            <DocumentCard
                status="success"
                title="CNH Profissional"
                subtitle="Válido até 2026"
                icon="check_circle"
            >
                <div className="mt-2 flex items-center justify-between rounded-lg bg-instructor-bg-dark p-3">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#92a4c9]">
                            badge
                        </span>
                        <div className="flex flex-col">
                            <span className="text-xs text-[#92a4c9]">Categoria</span>
                            <span className="text-sm font-medium text-white">AB (EAR)</span>
                        </div>
                    </div>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-500">
                        <span className="material-symbols-outlined text-[16px]">check</span>
                    </span>
                </div>
            </DocumentCard>

            {/* Card 4: Success - Antecedentes */}
            <DocumentCard
                status="success"
                title="Antecedentes Criminais"
                subtitle="Regularizado"
                icon="shield_person"
            >
                <div className="mt-2">
                    <div className="flex w-full items-center gap-2 rounded-lg border border-dashed border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-200/70">
                        <span className="material-symbols-outlined text-emerald-500">
                            update
                        </span>
                        <span>Próxima verificação automática em 30 dias.</span>
                    </div>
                </div>
            </DocumentCard>
        </div>
    );
}
