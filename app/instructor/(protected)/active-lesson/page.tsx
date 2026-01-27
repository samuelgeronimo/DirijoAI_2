"use client";

import { LessonFooter } from "@/components/instructor/active-lesson/LessonFooter";
import { LessonHeader } from "@/components/instructor/active-lesson/LessonHeader";
import { LessonMapOverlay } from "@/components/instructor/active-lesson/LessonMapOverlay";
import { SOSModal } from "@/components/instructor/active-lesson/SOSModal";
import { InstructorStatusGuard } from "@/components/InstructorStatusGuard";
import { useState } from "react";

export default function ActiveLessonPage() {
    const [isSOSOpen, setIsSOSOpen] = useState(false);

    return (
        <InstructorStatusGuard>
            {/* Fixed inset-0 and z-50 to cover sidebar and any underlying layout */}
            <div className="fixed inset-0 z-50 bg-[#1a0b0b] font-display text-white h-screen flex flex-col overflow-hidden">
                <LessonHeader onSOSClick={() => setIsSOSOpen(true)} />

                <main className="flex-1 relative flex flex-col min-h-0">
                    <LessonMapOverlay />
                </main>

                <LessonFooter />

                <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
            </div>
        </InstructorStatusGuard>
    );
}
