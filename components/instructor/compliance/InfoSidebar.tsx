export function InfoSidebar() {
    return (
        <div className="w-full xl:w-80 shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
                {/* Warning Box */}
                <div className="rounded-xl bg-instructor-surface-dark border border-instructor-surface-dark-2 p-6">
                    <div className="mb-4 flex items-center gap-2 text-white">
                        <span className="material-symbols-outlined text-amber-400">
                            info
                        </span>
                        <h3 className="font-bold">Por que isso importa?</h3>
                    </div>
                    <p className="mb-6 text-sm text-[#92a4c9]">
                        O sistema da Dirijo.ai está conectado diretamente ao DETRAN. A falta
                        de documentação gera bloqueios automáticos.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-500">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 16 }}
                                >
                                    block
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Bloqueio de Saques
                                </p>
                                <p className="text-xs text-[#92a4c9]">
                                    Documentos vencidos congelam sua carteira imediatamente.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 16 }}
                                >
                                    visibility_off
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Invisibilidade
                                </p>
                                <p className="text-xs text-[#92a4c9]">
                                    Seu perfil deixa de aparecer nas buscas de alunos.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-instructor-primary/20 text-instructor-primary">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 16 }}
                                >
                                    traffic
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Semáforo DETRAN
                                </p>
                                <p className="text-xs text-[#92a4c9]">
                                    Multas graves podem suspender sua licença de instrutor.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Helper Link */}
                <div className="rounded-xl bg-gradient-to-br from-instructor-primary/20 to-instructor-surface-dark border border-instructor-primary/20 p-5">
                    <h4 className="mb-2 font-bold text-white">
                        Precisa de ajuda com o DETRAN?
                    </h4>
                    <p className="mb-4 text-xs text-[#92a4c9]">
                        Temos parceiros despachantes com desconto para instrutores
                        parceiros.
                    </p>
                    <button className="text-sm font-medium text-instructor-primary hover:text-instructor-primary-hover hover:underline cursor-pointer">
                        Ver lista de parceiros →
                    </button>
                </div>
            </div>
        </div>
    );
}
