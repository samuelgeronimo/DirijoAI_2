"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        href: "/instructor/dashboard",
        icon: "dashboard",
        label: "Início",
    },
    {
        href: "/instructor/schedule",
        icon: "calendar_month",
        label: "Agenda",
    },
    {
        href: "/instructor/students",
        icon: "group",
        label: "Alunos",
    },
    {
        href: "/instructor/reviews",
        icon: "reviews",
        label: "Avaliações",
    },
    {
        href: "/instructor/vehicle",
        icon: "directions_car",
        label: "Veículo",
    },
    {
        href: "/instructor/compliance",
        icon: "verified_user",
        label: "Documentação",
    },
    {
        href: "/instructor/profile",
        icon: "person",
        label: "Perfil",
    },
    {
        href: "/instructor/wallet",
        icon: "account_balance_wallet",
        label: "Carteira",
    },
];

export function InstructorSidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                
                return (
                    <Link
                        key={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                            isActive
                                ? "bg-instructor-primary text-instructor-bg-dark font-bold shadow-lg shadow-instructor-primary/20"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                        href={item.href}
                    >
                        <span className={`material-symbols-outlined ${isActive ? "filled" : "font-light group-hover:scale-110 transition-transform"}`}>
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
