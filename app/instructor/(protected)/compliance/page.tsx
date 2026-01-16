import { ComplianceHeader } from "@/components/instructor/compliance/ComplianceHeader";
import { DocumentCardsGrid } from "@/components/instructor/compliance/DocumentCardsGrid";
import { InfoSidebar } from "@/components/instructor/compliance/InfoSidebar";

export default function InstructorCompliancePage() {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 bg-instructor-bg-dark custom-scrollbar">
            <div className="mx-auto max-w-6xl">
                <ComplianceHeader />
                <div className="flex flex-col gap-8 xl:flex-row">
                    {/* Left Column: Document Grid */}
                    <div className="flex-1">
                        <DocumentCardsGrid />
                    </div>
                    {/* Right Column: Sidebar Impact Info */}
                    <InfoSidebar />
                </div>
            </div>
        </div>
    );
}
