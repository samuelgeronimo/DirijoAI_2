import { ConflictCard } from "@/components/admin/disputes/ConflictCard";
import { DisputesHeader } from "@/components/admin/disputes/DisputesHeader";
import { DisputeTimeline } from "@/components/admin/disputes/DisputeTimeline";
import { EvidenceChat } from "@/components/admin/disputes/EvidenceChat";
import { VerdictPanel } from "@/components/admin/disputes/VerdictPanel";
import { getDisputeDetails } from "@/utils/admin/dispute-metrics";
import { notFound } from "next/navigation";

export default async function AdminDisputeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const dispute = await getDisputeDetails(id);

    if (!dispute) {
        notFound();
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f7f8] dark:bg-[#0d141b]">
            {/* TopNavBar */}
            <DisputesHeader />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-[#0d141b]">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    <ConflictCard
                        student={dispute.student}
                        instructor={dispute.instructor}
                        lesson={dispute.lesson}
                    />

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full min-h-[500px]">
                        <DisputeTimeline createdAt={dispute.created_at} />
                        <EvidenceChat messages={dispute.messages} />
                        <VerdictPanel disputeId={dispute.id} status={dispute.status} />
                    </div>
                </div>
            </div>
        </div>
    );
}
