import { FinanceHeader } from "@/components/admin/finance/FinanceHeader";
import { FinanceStats } from "@/components/admin/finance/FinanceStats";
import { GodModePanel } from "@/components/admin/finance/GodModePanel";
import { PayoutRequestsTable } from "@/components/admin/finance/PayoutRequestsTable";

import { getPlatformTakeRate } from "@/app/admin/actions";
import { getFinanceOverview, getPayoutRequests } from "@/utils/admin/finance-metrics";

export default async function AdminFinancePage() {
    const currentRate = await getPlatformTakeRate();

    // Fetch metrics in parallel
    const [financeMetrics, payoutRequests] = await Promise.all([
        getFinanceOverview(),
        getPayoutRequests()
    ]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f7f8] dark:bg-[#101922]">
            {/* TopNavBar */}
            <FinanceHeader />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    {/* Stats Section */}
                    <FinanceStats stats={financeMetrics} />

                    {/* Layout Split: Table (Left) & God Mode (Right) */}
                    <div className="flex flex-col xl:flex-row gap-6 items-start">
                        {/* Left Column: Payout Requests */}
                        <PayoutRequestsTable payouts={payoutRequests} />

                        {/* Right Column: God Mode Panel */}
                        <GodModePanel initialRate={currentRate} />
                    </div>
                </div>
            </div>
        </div>
    );
}
