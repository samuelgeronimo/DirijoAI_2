"use client";

export function GrowthKPIs() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* KPI 1 */}
            <div className="flex flex-col gap-3 rounded-xl p-6 bg-[#1e293b] border border-[#233648] relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-[#0bda5b]">
                        trending_up
                    </span>
                </div>
                <div className="flex justify-between items-start">
                    <p className="text-[#92adc9] text-sm font-medium uppercase tracking-wider">
                        ROI de Cupons
                    </p>
                    <span className="flex items-center text-[#0bda5b] text-sm font-bold bg-[#0bda5b]/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">
                            arrow_upward
                        </span>{" "}
                        12.5%
                    </span>
                </div>
                <p className="text-3xl font-bold leading-tight text-white">320%</p>
                <div className="w-full bg-[#233648] h-1 rounded-full mt-2">
                    <div
                        className="bg-[#0bda5b] h-1 rounded-full"
                        style={{ width: "75%" }}
                    ></div>
                </div>
            </div>
            {/* KPI 2 */}
            <div className="flex flex-col gap-3 rounded-xl p-6 bg-[#1e293b] border border-[#233648] relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-[#137fec]">
                        add_shopping_cart
                    </span>
                </div>
                <div className="flex justify-between items-start">
                    <p className="text-[#92adc9] text-sm font-medium uppercase tracking-wider">
                        Receita Extra (Upsells)
                    </p>
                    <span className="flex items-center text-[#0bda5b] text-sm font-bold bg-[#0bda5b]/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">
                            arrow_upward
                        </span>{" "}
                        5.2%
                    </span>
                </div>
                <p className="text-3xl font-bold leading-tight text-white">
                    R$ 4.250,00
                </p>
                <div className="w-full bg-[#233648] h-1 rounded-full mt-2">
                    <div
                        className="bg-[#137fec] h-1 rounded-full"
                        style={{ width: "60%" }}
                    ></div>
                </div>
            </div>
            {/* KPI 3 */}
            <div className="flex flex-col gap-3 rounded-xl p-6 bg-[#1e293b] border border-[#233648] relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-orange-500">
                        sell
                    </span>
                </div>
                <div className="flex justify-between items-start">
                    <p className="text-[#92adc9] text-sm font-medium uppercase tracking-wider">
                        Total Descontos
                    </p>
                    <span className="flex items-center text-orange-500 text-sm font-bold bg-orange-500/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">
                            arrow_downward
                        </span>{" "}
                        2.1%
                    </span>
                </div>
                <p className="text-3xl font-bold leading-tight text-white">
                    R$ 1.200,00
                </p>
                <div className="w-full bg-[#233648] h-1 rounded-full mt-2">
                    <div
                        className="bg-orange-500 h-1 rounded-full"
                        style={{ width: "25%" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
