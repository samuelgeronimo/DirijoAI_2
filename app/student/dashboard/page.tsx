import { StudentHeader } from "@/components/student/StudentHeader";
import { StudentDashboardGrid } from "@/components/student/StudentDashboardGrid";

export default function StudentDashboardPage() {
    return (
        <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8">
            {/* Header Section: Greeting + Progress */}
            <StudentHeader />
            {/* Dashboard Grid Layout */}
            <StudentDashboardGrid />
        </div>
    );
}
