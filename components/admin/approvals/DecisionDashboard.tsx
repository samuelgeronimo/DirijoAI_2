"use client";

export function DecisionDashboard() {
    return (
        <aside className="w-[420px] bg-white dark:bg-[#111a22] border-l border-gray-200 dark:border-[#233648] flex flex-col shrink-0 overflow-y-auto">
            {/* Context Header */}
            <div className="p-6 border-b border-gray-200 dark:border-[#233648]">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3">
                        <div
                            className="size-12 rounded-full bg-cover bg-center ring-2 ring-[#137fec]/50"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2cDkQXd5C4Nz2_NAX8vV6TFOCswI02w10fg8IRMpw8n5OFXMs7Mq570Hkj8cYr8ikhoyLY_99MR2QAsaW8pGDF_n92OCDis8MaRi7PuJzuss6Ym62EwFgrVbBI2oCW_wxhKwIp24hXWJXIBn0qWX2uA6_VYNaT9HeFoW_Oo4-0WqBZbZNkvHEHW090tLqvwnT6chk-0cRiP1zFOitmhyC-W7vZQbae8lZTvSI1M4QtUkVd9lBd3DjUp1iRwaqluEKKl-P1Q-woGUa')",
                            }}
                        ></div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                Carlos Silva
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                ID: #94201 • São Paulo, SP
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10">
                            Novo Cadastro
                        </span>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 dark:text-gray-300">
                            Documento 2 de 4
                        </span>
                        <span className="text-[#137fec]">50% Completo</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-[#233648] rounded-full overflow-hidden">
                        <div className="h-full bg-[#137fec] w-1/2 rounded-full transition-all duration-500"></div>
                    </div>
                    <div className="flex gap-1 pt-1">
                        <div
                            className="h-1 flex-1 bg-green-500 rounded-full"
                            title="Selfie - Aprovado"
                        ></div>
                        <div
                            className="h-1 flex-1 bg-[#137fec] rounded-full animate-pulse"
                            title="CNH - Em Análise"
                        ></div>
                        <div
                            className="h-1 flex-1 bg-gray-200 dark:bg-[#233648] rounded-full"
                            title="CRLV - Pendente"
                        ></div>
                        <div
                            className="h-1 flex-1 bg-gray-200 dark:bg-[#233648] rounded-full"
                            title="Comp. Residência - Pendente"
                        ></div>
                    </div>
                </div>
            </div>

            {/* Data Validation Form */}
            <div className="flex-1 p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Dados Extraídos (OCR)
                    </h3>
                    <span className="text-xs text-[#137fec] bg-[#137fec]/10 px-2 py-0.5 rounded border border-[#137fec]/20 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">bolt</span>{" "}
                        IA Confidence: 98%
                    </span>
                </div>
                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                            Nome Completo
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-gray-50 dark:bg-[#1e2936] ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-[#137fec] sm:text-sm sm:leading-6 font-mono tracking-tight"
                                readOnly
                                type="text"
                                defaultValue="CARLOS ALBERTO DA SILVA"
                            />
                            <span className="absolute right-3 top-2.5 text-green-500 material-symbols-outlined text-[20px]">
                                check_circle
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                CPF
                            </label>
                            <input
                                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-gray-50 dark:bg-[#1e2936] ring-1 ring-inset ring-gray-300 dark:ring-gray-700 sm:text-sm sm:leading-6 font-mono"
                                readOnly
                                type="text"
                                defaultValue="123.456.789-00"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                Registro CNH
                            </label>
                            <input
                                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-gray-50 dark:bg-[#1e2936] ring-1 ring-inset ring-gray-300 dark:ring-gray-700 sm:text-sm sm:leading-6 font-mono"
                                readOnly
                                type="text"
                                defaultValue="09876543210"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                Categoria
                            </label>
                            <input
                                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-gray-50 dark:bg-[#1e2936] ring-1 ring-inset ring-gray-300 dark:ring-gray-700 sm:text-sm sm:leading-6 font-mono"
                                readOnly
                                type="text"
                                defaultValue="AB"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                Validade
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-green-50 dark:bg-green-900/10 ring-1 ring-inset ring-green-500/50 sm:text-sm sm:leading-6 font-mono"
                                    readOnly
                                    type="text"
                                    defaultValue="15/06/2026"
                                />
                                <span className="absolute right-3 top-3 block size-2 rounded-full bg-green-500"></span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-md">
                            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-[20px] shrink-0">
                                warning
                            </span>
                            <p className="text-xs text-yellow-800 dark:text-yellow-400 leading-relaxed">
                                <strong>Atenção:</strong> A data de validade está a menos de 1
                                ano do vencimento. O sistema irá programar um alerta automático.
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            {/* Action Footer */}
            <div className="p-6 bg-gray-50 dark:bg-[#0f151b] border-t border-gray-200 dark:border-[#233648]">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Reject Button Group */}
                    <div className="relative group/reject w-full">
                        <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-[#1e2936] border border-gray-300 dark:border-gray-600 px-4 py-3.5 text-sm font-semibold text-[#ef4444] shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 transition-all cursor-pointer">
                            <span className="material-symbols-outlined">thumb_down</span>
                            REJEITAR
                        </button>
                        {/* Rejection Menu (Hover/Focus Simulation) */}
                        <div className="hidden group-hover/reject:block absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-[#1e2936] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Selecione o motivo:
                                </span>
                            </div>
                            <div className="p-1">
                                {[
                                    "Foto Ilegível / Borrada",
                                    "Documento Vencido",
                                    "Dados Divergentes",
                                ].map((reason, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center justify-between cursor-pointer"
                                    >
                                        {reason}
                                        <span className="text-[10px] text-gray-400 font-mono">
                                            key: {idx + 1}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Approve Button */}
                    <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#10b981] hover:bg-green-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">thumb_up</span>
                        APROVAR
                    </button>
                </div>
                {/* Automation Feedback */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 justify-center">
                    <span className="material-symbols-outlined text-[16px] text-[#137fec]">
                        mark_chat_read
                    </span>
                    <span>Feedback automático via WhatsApp habilitado</span>
                </div>
                {/* Keyboard Shortcuts Hint */}
                <div className="mt-4 flex justify-center gap-4 opacity-50">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-widest">
                        <kbd className="px-1.5 py-0.5 rounded border border-gray-600 bg-gray-800 font-mono text-white">
                            R
                        </kbd>
                        <span>Rejeitar</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-widest">
                        <kbd className="px-1.5 py-0.5 rounded border border-gray-600 bg-gray-800 font-mono text-white">
                            A
                        </kbd>
                        <span>Aprovar</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
