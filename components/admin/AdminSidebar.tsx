"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/auth/actions";

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 flex-shrink-0 border-r border-[#233648] bg-[#111a22] flex flex-col justify-between hidden md:flex h-full">
            <div className="flex flex-col p-4 gap-6">
                <div className="flex flex-col px-2">
                    <h1 className="text-white text-xl font-bold leading-normal tracking-tight">
                        Dirijo.ai
                    </h1>
                    <p className="text-[#92adc9] text-xs font-medium uppercase tracking-wider mt-1">
                        God Mode Access
                    </p>
                </div>
                <nav className="flex flex-col gap-2">
                    <Link
                        href="/admin/dashboard"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg border transition-all ${isActive("/admin/dashboard")
                            ? "bg-[#233648] text-white shadow-sm border-[#334b63]"
                            : "border-transparent text-[#92adc9] hover:bg-[#233648]/50"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[#137fec]">
                            dashboard
                        </span>
                        <p className="text-sm font-medium">Dashboard</p>
                    </Link>
                    <Link
                        href="/admin/finance"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg border transition-all ${isActive("/admin/finance")
                            ? "bg-[#233648] text-white shadow-sm border-[#334b63]"
                            : "border-transparent text-[#92adc9] hover:bg-[#233648]/50"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[#137fec] " style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                        <p className="text-sm font-medium">The Bank</p>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#233648]/50 text-[#92adc9] transition-colors"
                    >
                        <span className="material-symbols-outlined">group</span>
                        <p className="text-sm font-medium">Usuários</p>
                    </Link>
                    <Link
                        href="/admin/disputes"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg border transition-all ${isActive("/admin/disputes")
                            ? "bg-[#233648] text-white shadow-sm border-[#334b63]"
                            : "border-transparent text-[#92adc9] hover:bg-[#233648]/50"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[#137fec]" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                        <p className="text-sm font-medium">Disputas</p>
                        <span className="ml-auto bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            3
                        </span>
                    </Link>
                    <Link
                        href="/admin/growth"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg border transition-all ${isActive("/admin/growth")
                            ? "bg-[#233648] text-white shadow-sm border-[#334b63]"
                            : "border-transparent text-[#92adc9] hover:bg-[#233648]/50"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[#137fec]" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
                        <p className="text-sm font-medium">Cupons</p>
                    </Link>
                </nav>
            </div>
            <div className="p-4 border-t border-[#233648]">
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#233648]/50 rounded-lg transition-colors border-0"
                >
                    <div className="size-8 rounded-full bg-[#233648] flex items-center justify-center text-[#92adc9]">
                        <span className="material-symbols-outlined text-sm">logout</span>
                    </div>
                    <p className="text-[#92adc9] text-sm font-medium">Logout</p>
                </button>
            </div>
        </aside>
    );
}
