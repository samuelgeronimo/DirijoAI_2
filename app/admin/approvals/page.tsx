import { ApprovalHeader } from "@/components/admin/approvals/ApprovalHeader";
import { DecisionDashboard } from "@/components/admin/approvals/DecisionDashboard";
import { DocumentVisualizer } from "@/components/admin/approvals/DocumentVisualizer";

export default function AdminApprovalsPage() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] h-screen w-full overflow-hidden flex flex-col text-slate-900 dark:text-white">
            <ApprovalHeader />
            <main className="flex-1 flex overflow-hidden">
                <DocumentVisualizer />
                <DecisionDashboard />
            </main>
        </div>
    );
}
