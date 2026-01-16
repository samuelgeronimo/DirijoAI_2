"use client";

export function FinanceHeader() {
    return (
        <header className="flex items-center justify-between border-b border-[#233648] bg-[#101922]/95 backdrop-blur-sm px-6 py-4 z-10 sticky top-0">
            <div className="flex items-center gap-4 text-white">
                <button className="lg:hidden text-[#92adc9] hover:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#137fec]">
                        account_balance_wallet
                    </span>
                    <h2 className="text-lg font-bold tracking-tight">Gestão Financeira</h2>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-[#92adc9] hover:text-white transition-colors rounded-full hover:bg-[#233648]">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-[#101922]"></span>
                </button>
                <button className="flex items-center gap-2 bg-[#233648] hover:bg-[#324d67] text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">help</span>
                    <span>Suporte</span>
                </button>
            </div>
        </header>
    );
}
