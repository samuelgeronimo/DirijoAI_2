import { CouponCreator } from "@/components/admin/growth/CouponCreator";
import { GrowthKPIs } from "@/components/admin/growth/GrowthKPIs";
import { GrowthToolbar } from "@/components/admin/growth/GrowthToolbar";
import { UpsellManager } from "@/components/admin/growth/UpsellManager";

export default function AdminGrowthPage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f7f8] dark:bg-[#111a22]">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-[#111a22]">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                    {/* Page Header + KPI Stats */}
                    <div className="flex flex-col gap-8 mb-2">
                        {/* Title Section */}
                        <div className="flex flex-wrap justify-between items-end gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#92adc9] text-sm">
                                    <span>Growth Engine</span>
                                    <span className="material-symbols-outlined text-base">
                                        chevron_right
                                    </span>
                                    <span className="text-[#137fec]">Laboratório de Vendas</span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
                                    Laboratório de Vendas
                                </h1>
                                <p className="text-[#92adc9] text-base">
                                    Otimize suas ofertas e configure upsells automáticos para
                                    maximizar o LTV.
                                </p>
                            </div>
                        </div>
                        {/* KPIs */}
                        <GrowthKPIs />
                    </div>

                    {/* Operational Bar */}
                    <GrowthToolbar />

                    {/* Split Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Panel: Coupon Creator (Span 4) */}
                        <CouponCreator />

                        {/* Right Panel: Upsell Manager (Span 8) */}
                        <UpsellManager />
                    </div>
                </div>
            </div>
        </div>
    );
}
