import { AgendaControls } from "@/components/instructor/schedule/AgendaControls";
import { CalendarGrid } from "@/components/instructor/schedule/CalendarGrid";
import { FloatingAction } from "@/components/instructor/schedule/FloatingAction";
import { KPIStats } from "@/components/instructor/schedule/KPIStats";

export default function InstructorSchedulePage() {
    return (
        <div className="flex-1 overflow-y-auto bg-instructor-bg-dark custom-scrollbar p-6 relative h-full">
            <div className="mx-auto max-w-7xl flex flex-col gap-6">
                <AgendaControls />
                <KPIStats />
                <CalendarGrid />
                {/* Spacer for scroll */}
                <div className="h-24"></div>
            </div>
            <FloatingAction />
        </div>
    );
}
