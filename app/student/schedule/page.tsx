import { InstructorHero } from "@/components/student/schedule/InstructorHero";
import { CalendarGrid } from "@/components/student/schedule/CalendarGrid";
import { FocusSelection } from "@/components/student/schedule/FocusSelection";

export default function StudentSchedulePage() {
    return (
        <div className="flex-1 w-full max-w-6xl mx-auto p-6 md:p-8 flex flex-col gap-8">
            {/* Instructor Hero Section */}
            <InstructorHero />

            {/* Scarcity Headline */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 mt-0.5">
                    local_fire_department
                </span>
                <div>
                    <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg">
                        O Carlos liberou novos horários!
                    </h3>
                    <p className="text-amber-800 dark:text-amber-200/80 text-sm">
                        A agenda dele costuma lotar em menos de 24 horas. Garanta o seu.
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT COLUMN: Calendar */}
                <CalendarGrid />
                {/* RIGHT COLUMN: Focus & CTA */}
                <FocusSelection />
            </div>
        </div>
    );
}
