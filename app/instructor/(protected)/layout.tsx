import { InstructorSidebar } from "@/components/instructor/dashboard/InstructorSidebar";

export default function InstructorPrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Forced Dark Mode style for Instructor Dashboard
        <div className="bg-instructor-bg-dark text-white h-screen overflow-hidden flex font-display dark">
            <InstructorSidebar />
            <main className="flex-1 overflow-y-auto h-full relative lg:pl-72">
                {/* Top Bar for Mobile */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-instructor-bg-dark border-b border-white/10 sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-instructor-primary">
                            local_taxi
                        </span>
                        <span className="text-white font-bold">Dirijo.ai</span>
                    </div>
                    <button className="text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
                {children}
            </main>
            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-instructor-surface-dark border-t border-white/10 z-50 pb-safe">
                <div className="flex justify-around items-center p-3">
                    <a
                        className="flex flex-col items-center gap-1 text-instructor-primary"
                        href="#"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-[10px] font-medium">Início</span>
                    </a>
                    <a
                        className="flex flex-col items-center gap-1 text-gray-400"
                        href="#"
                    >
                        <span className="material-symbols-outlined font-light">
                            calendar_month
                        </span>
                        <span className="text-[10px] font-medium">Agenda</span>
                    </a>
                    <a
                        className="flex flex-col items-center gap-1 text-gray-400"
                        href="#"
                    >
                        <span className="material-symbols-outlined font-light">group</span>
                        <span className="text-[10px] font-medium">Alunos</span>
                    </a>
                    <a
                        className="flex flex-col items-center gap-1 text-gray-400"
                        href="#"
                    >
                        <span className="material-symbols-outlined font-light">
                            account_balance_wallet
                        </span>
                        <span className="text-[10px] font-medium">Carteira</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}
