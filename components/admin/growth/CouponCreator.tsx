"use client";

export function CouponCreator() {
    return (
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#1e293b] border border-[#233648] rounded-xl p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#233648]">
                    <span className="material-symbols-outlined text-[#137fec] text-2xl">
                        confirmation_number
                    </span>
                    <h3 className="text-lg font-bold text-white">Criador de Cupons</h3>
                </div>
                <form className="flex flex-col gap-5">
                    {/* Code Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#92adc9]">
                            Código do Cupom
                        </label>
                        <div className="relative">
                            <input
                                className="w-full bg-[#111a22] border border-[#233648] text-white text-lg font-bold tracking-wider rounded-lg focus:ring-[#137fec] focus:border-[#137fec] block p-3 uppercase placeholder-gray-600"
                                placeholder="EX: VEMDIRIGIR"
                                type="text"
                            />
                            <div className="absolute right-3 top-3 text-[#0bda5b]">
                                <span
                                    className="material-symbols-outlined"
                                    title="Código Disponível"
                                >
                                    check_circle
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Type Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#92adc9]">
                            Tipo de Desconto
                        </label>
                        <div className="flex bg-[#111a22] p-1 rounded-lg border border-[#233648]">
                            <button
                                className="flex-1 py-2 px-4 rounded-md bg-[#137fec] text-white font-bold text-sm shadow-md transition-all"
                                type="button"
                            >
                                Porcentagem (%)
                            </button>
                            <button
                                className="flex-1 py-2 px-4 rounded-md text-[#92adc9] hover:text-white font-medium text-sm transition-all"
                                type="button"
                            >
                                Valor Fixo (R$)
                            </button>
                        </div>
                    </div>
                    {/* Value Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#92adc9]">
                            Valor do Desconto
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white font-bold pointer-events-none">
                                %
                            </span>
                            <input
                                className="w-full bg-[#111a22] border border-[#233648] text-white text-sm rounded-lg focus:ring-[#137fec] focus:border-[#137fec] block pl-8 p-2.5"
                                placeholder="10"
                                type="number"
                            />
                        </div>
                    </div>
                    {/* Triggers Checklist */}
                    <div className="flex flex-col gap-3 mt-2">
                        <label className="text-sm font-medium text-[#92adc9]">
                            Regras de Gatilho
                        </label>
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#233648] bg-[#111a22]/50 hover:bg-[#111a22] cursor-pointer transition-colors">
                            <input
                                className="w-4 h-4 mt-1 text-[#137fec] bg-[#111a22] border-gray-600 rounded focus:ring-[#137fec] focus:ring-2"
                                type="checkbox"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">
                                    Apenas 1ª Compra
                                </span>
                                <span className="text-xs text-[#92adc9]">
                                    Válido para novos alunos
                                </span>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#233648] bg-[#111a22]/50 hover:bg-[#111a22] cursor-pointer transition-colors">
                            <input
                                defaultChecked
                                className="w-4 h-4 mt-1 text-[#137fec] bg-[#111a22] border-gray-600 rounded focus:ring-[#137fec] focus:ring-2"
                                type="checkbox"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">
                                    Pacotes &gt; 10 Aulas
                                </span>
                                <span className="text-xs text-[#92adc9]">
                                    Incentivo de ticket médio
                                </span>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#233648] bg-[#111a22]/50 hover:bg-[#111a22] cursor-pointer transition-colors">
                            <input
                                className="w-4 h-4 mt-1 text-[#137fec] bg-[#111a22] border-gray-600 rounded focus:ring-[#137fec] focus:ring-2"
                                type="checkbox"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">
                                    Data de Expiração
                                </span>
                                <span className="text-xs text-[#92adc9]">
                                    Criar urgência (24h)
                                </span>
                            </div>
                        </label>
                    </div>
                    <button
                        className="mt-4 w-full bg-white hover:bg-gray-100 text-[#111a22] font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        type="button"
                    >
                        <span className="material-symbols-outlined">auto_awesome</span>
                        Gerar Cupom
                    </button>
                </form>
            </div>
        </div>
    );
}
