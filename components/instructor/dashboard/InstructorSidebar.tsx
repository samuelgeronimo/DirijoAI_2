import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { InstructorSignOutButton } from "./InstructorSignOutButton";

export async function InstructorSidebar() {
    const supabase = await createClient();

    // Fetch User Profile
    const { data: { user } } = await supabase.auth.getUser();

    let profile = null;
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', user.id)
            .single();
        profile = data;
    }

    return (
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-instructor-bg-dark h-full fixed left-0 top-0 bottom-0 z-50">
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-instructor-primary/20 p-2 rounded-xl">
                        <span className="material-symbols-outlined text-instructor-primary text-3xl">
                            local_taxi
                        </span>
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold tracking-tight">
                            Dirijo.ai
                        </h1>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                            Instrutores
                        </p>
                    </div>
                </div>
                <nav className="flex flex-col gap-2">
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-instructor-primary text-instructor-bg-dark font-bold shadow-lg shadow-instructor-primary/20 transition-all"
                        href="/instructor/dashboard"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span>Início</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-instructor-primary/10 text-instructor-primary border border-instructor-primary/20 shadow-[0_0_15px_rgba(19,236,91,0.1)] transition-all group"
                        href="/instructor/schedule"
                    >
                        <span className="material-symbols-outlined filled group-hover:scale-110 transition-transform">
                            calendar_month
                        </span>
                        <span className="font-semibold">Agenda</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        href="/instructor/students"
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform font-light">
                            group
                        </span>
                        <span>Alunos</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        href="/instructor/reviews"
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform font-light">
                            reviews
                        </span>
                        <span>Avaliações</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        href="/instructor/vehicle"
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform font-light">
                            directions_car
                        </span>
                        <span>Veículo</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 shadow-sm transition-all group"
                        href="/instructor/compliance"
                    >
                        <span className="material-symbols-outlined filled group-hover:scale-110 transition-transform">
                            verified_user
                        </span>
                        <span className="font-semibold">Documentação</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        href="/instructor/profile"
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform font-light">
                            person
                        </span>
                        <span>Perfil</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        href="/instructor/wallet"
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform font-light">
                            account_balance_wallet
                        </span>
                        <span>Carteira</span>
                    </Link>
                </nav>
            </div>
            <div className="mt-auto p-6">
                <div className="bg-instructor-surface-dark-2 rounded-2xl p-4 flex items-center gap-3 border border-white/5">
                    <div className="relative">
                        <div
                            className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-instructor-primary"
                            style={{
                                backgroundImage: `url('${profile?.avatar_url || "https://via.placeholder.com/150"}')`
                            }}
                        ></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-instructor-primary border-2 border-instructor-surface-dark-2 rounded-full"></div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-white text-sm font-bold truncate max-w-[100px]">
                            {profile?.full_name || 'Instrutor'}
                        </p>
                        <p className="text-gray-400 text-xs">Online</p>
                    </div>
                    <InstructorSignOutButton />
                </div>
            </div>
        </aside>
    );
}
