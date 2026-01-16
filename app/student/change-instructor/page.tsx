import { FeedbackHeader } from "@/components/student/feedback/FeedbackHeader";
import { FeedbackForm } from "@/components/student/feedback/FeedbackForm";
import { FeedbackActions } from "@/components/student/feedback/FeedbackActions";
import Link from "next/link";

export default function ChangeInstructorPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] lg:min-h-full p-4">
            <div className="relative w-full max-w-[600px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto animate-fade-in-up transition-all duration-300 border border-slate-100 dark:border-slate-700">
                {/* Close Button (redirects back to dashboard or previous page) */}
                <Link
                    href="/student/dashboard"
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors z-20"
                >
                    <span className="material-symbols-outlined">close</span>
                </Link>
                <FeedbackHeader />
                <FeedbackForm />
                <FeedbackActions />
            </div>
        </div>
    );
}
