import { BadgesSection } from "@/components/instructor/profile/BadgesSection";
import { ProfileHeader } from "@/components/instructor/profile/ProfileHeader";
import { ProfilePreview } from "@/components/instructor/profile/ProfilePreview";
import { VSLSection } from "@/components/instructor/profile/VSLSection";
import { WallOfFame } from "@/components/instructor/profile/WallOfFame";

export default function InstructorProfilePage() {
    return (
        <div className="flex h-full overflow-hidden">
            {/* Left Side: Editor (Scrollable) */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <div className="max-w-[800px] mx-auto px-6 py-8 flex flex-col gap-8">
                    <ProfileHeader />
                    <VSLSection />
                    <WallOfFame />
                    <BadgesSection />
                </div>
                {/* Footer Action Bar - Fixed relative to the scroll view or effectively placed at bottom of content */}
                <footer className="border-t border-slate-200 dark:border-[#23482f] bg-white dark:bg-[#112217] px-10 py-4 flex justify-between items-center z-10 sticky bottom-0">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                        <span className="material-symbols-outlined text-lg">info</span>
                        <span>Alterações salvas automaticamente há 2 min.</span>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto justify-end">
                        <button className="px-6 py-3 rounded-lg font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a3324] transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button className="px-8 py-3 rounded-lg font-bold bg-instructor-primary text-[#102216] shadow-lg shadow-instructor-primary/20 hover:bg-instructor-primary-hover transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                            Salvar Alterações
                        </button>
                    </div>
                </footer>
            </div>

            {/* Right Side: Preview (Fixed) */}
            <ProfilePreview />
        </div>
    );
}
