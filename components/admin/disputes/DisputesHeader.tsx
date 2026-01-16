"use client";

export function DisputesHeader() {
    return (
        <header className="flex items-center justify-between border-b border-[#233648] bg-[#101922]/95 backdrop-blur-sm px-6 py-4 z-10 sticky top-0">
            <div className="flex items-center gap-4 text-white">
                <button className="lg:hidden text-[#92adc9] hover:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center p-2 bg-yellow-500/10 rounded-lg text-yellow-500 border border-yellow-500/20">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            warning
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight leading-none">
                            Resolução de Conflitos #8892
                        </h2>
                        <span className="text-xs font-medium text-yellow-500 bg-yellow-900/20 px-1.5 py-0.5 rounded mt-1 inline-block border border-yellow-500/10">
                            Em Análise
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center text-xs text-[#92adc9] bg-[#111a22] px-3 py-1.5 rounded-lg border border-[#324d67]">
                    <span className="mr-2">SLA de Resolução:</span>
                    <span className="text-red-400 font-bold">02:14:00 restantes</span>
                </div>
                <button className="relative p-2 text-[#92adc9] hover:text-white transition-colors rounded-full hover:bg-[#233648]">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-[#101922]"></span>
                </button>
            </div>
        </header>
    );
}
