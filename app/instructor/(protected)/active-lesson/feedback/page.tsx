import { FeedbackModal } from "@/components/instructor/active-lesson/feedback/FeedbackModal";

export default function LessonFeedbackPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-instructor-bg-light dark:bg-instructor-bg-dark font-display text-slate-900 dark:text-white antialiased overflow-hidden">
            {/* Background Overlay with image context */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-20 dark:opacity-10 pointer-events-none"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlKB7ZVc71PeRxhsx4ICU6OQBlMIpcNEt1b2Hmekf1_UhMBBD7Rx75gjYmBNHs8nE_eRm14VoOdgF-c726vC9ny6RXw3gpaxVnfgsp560R_e1COwBejAcORTSljyDNAGna_9A8oQBXoOIuIl2oNcQNKE21rKFqkFEWBy4DpGVV4M1ZHDZT_UHyoiTL0_X9C9bgFLVFFzhOLE4Par6MP9vqVK1EFlRBOER0QqzI1NJZhOA1QMLL-J-jBROdEGd2ltjdvL-a7QaffqAq')",
                }}
            ></div>
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-instructor-bg-dark/95 to-instructor-bg-dark/80 backdrop-blur-sm"></div>

            <FeedbackModal />
        </div>
    );
}
