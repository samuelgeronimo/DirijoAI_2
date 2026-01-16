import { FinancialStats } from "@/components/instructor/dashboard/FinancialStats";
import { MiniAgenda } from "@/components/instructor/dashboard/MiniAgenda";
import { NextMission } from "@/components/instructor/dashboard/NextMission";
import { ReputationCard } from "@/components/instructor/dashboard/ReputationCard";

export default function InstructorDashboardPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12 lg:py-10">
            {/* Page Heading */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Bom dia, Instrutor Carlos
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Vamos conferir seus ganhos e sua próxima missão.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-instructor-secondary/10 border border-instructor-secondary/20 rounded-full">
                    <span className="material-symbols-outlined text-instructor-secondary text-sm">
                        trophy
                    </span>
                    <span className="text-instructor-secondary text-sm font-bold uppercase tracking-wider">
                        Nível Ouro
                    </span>
                </div>
            </header>

            <FinancialStats />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <NextMission />

                {/* Right Column (Reputation & Quick Stats) */}
                <div className="flex flex-col gap-6">
                    <ReputationCard />
                    <MiniAgenda />
                </div>
            </div>
        </div>
    );
}
