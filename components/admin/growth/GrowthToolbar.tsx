"use client";

export function GrowthToolbar() {
    return (
        <div className="mb-6 p-4 bg-[#1e293b] border border-[#233648] rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-[#137fec]/20 p-2 rounded-lg text-[#137fec]">
                    <span className="material-symbols-outlined">sentiment_satisfied</span>
                </div>
                <div>
                    <h3 className="font-bold text-white text-base">
                        Gestão de Crédito Manual
                    </h3>
                    <p className="text-xs text-[#92adc9]">Ações de Customer Happiness</p>
                </div>
            </div>
            <div className="flex flex-1 w-full md:max-w-xl gap-3">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#92adc9] pointer-events-none">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </span>
                    <input
                        className="w-full bg-[#111a22] border border-[#233648] text-white text-sm rounded-lg focus:ring-[#137fec] focus:border-[#137fec] block pl-10 p-2.5 placeholder-[#92adc9]"
                        placeholder="Buscar aluno por E-mail ou CPF..."
                        type="text"
                    />
                </div>
                <button className="flex items-center gap-2 bg-[#137fec] hover:bg-[#116dc9] text-white font-bold py-2 px-4 rounded-lg transition-colors whitespace-nowrap text-sm">
                    <span className="material-symbols-outlined text-xl">
                        account_balance_wallet
                    </span>
                    Adicionar Saldo
                </button>
            </div>
        </div>
    );
}
