import { FinanceHeader } from "@/components/admin/finance/FinanceHeader";
import { FinanceStats } from "@/components/admin/finance/FinanceStats";
import { GodModePanel } from "@/components/admin/finance/GodModePanel";
import { PayoutRequestsTable } from "@/components/admin/finance/PayoutRequestsTable";

export default function AdminFinancePage() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f7f8] dark:bg-[#101922]">
            {/* TopNavBar */}
            <FinanceHeader />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    {/* Stats Section */}
                    <FinanceStats />

                    {/* Layout Split: Table (Left) & God Mode (Right) */}
                    <div className="flex flex-col xl:flex-row gap-6 items-start">
                        {/* Left Column: Payout Requests */}
                        <PayoutRequestsTable />

                        {/* Right Column: God Mode Panel */}
                        <GodModePanel />
                    </div>
                </div>
            </div>
        </div>
    );
}
