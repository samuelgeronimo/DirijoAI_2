"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        href: "/student/dashboard",
        icon: "home",
        label: "Home",
    },
    {
        href: "/student/change-instructor",
        icon: "search",
        label: "Buscar Instrutor",
    },
    {
        href: "/student/reviews",
        icon: "star",
        label: "Avaliar Instrutor",
    },
    {
        href: "/student/schedule",
        icon: "calendar_month",
        label: "Agenda",
    },
    {
        href: "/student/profile",
        icon: "person",
        label: "Perfil",
    },
];

export function StudentSidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                    <Link
                        key={item.href}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-student-primary/10 text-student-primary"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                        href={item.href}
                    >
                        <span className="material-symbols-outlined">
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium leading-normal">
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
