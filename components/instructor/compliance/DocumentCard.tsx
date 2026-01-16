import { ReactNode } from "react";

interface DocumentCardProps {
    status: "critical" | "warning" | "success";
    title: string;
    subtitle: string;
    icon: string;
    children: ReactNode;
}

export function DocumentCard({
    status,
    title,
    subtitle,
    icon,
    children,
}: DocumentCardProps) {
    const styles = {
        critical: {
            container:
                "border-rose-500/50 bg-rose-950/20 shadow-rose-900/10 hover:border-rose-500",
            iconBg: "bg-rose-500/20",
            iconColor: "text-rose-400",
            subtitleColor: "text-rose-400",
            glow: "bg-rose-500/20 group-hover:bg-rose-500/30",
        },
        warning: {
            container: "border-amber-500/50 bg-instructor-surface-dark hover:border-amber-400 animate-pulse-slow",
            iconBg: "bg-amber-500/20",
            iconColor: "text-amber-400",
            subtitleColor: "text-amber-400",
            glow: "", // Warning has a specific gradient line instead of glow blob
        },
        success: {
            container:
                "border-instructor-surface-dark-2 bg-instructor-surface-dark hover:border-emerald-500/50 hover:shadow-lg",
            iconBg: "bg-emerald-500/10",
            iconColor: "text-emerald-500",
            subtitleColor: "text-emerald-500",
            glow: "",
        },
    };

    const currentStyle = styles[status];

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border p-6 transition-all shadow-lg ${currentStyle.container}`}
        >
            {/* Decorative Elements */}
            {status === "critical" && (
                <div
                    className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all ${currentStyle.glow}`}
                ></div>
            )}
            {status === "warning" && (
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-amber-500 to-amber-300"></div>
            )}

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${currentStyle.iconBg} ${currentStyle.iconColor}`}
                        >
                            <span className="material-symbols-outlined">{icon}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{title}</h3>
                            <p className={`text-sm ${currentStyle.subtitleColor}`}>
                                {subtitle}
                            </p>
                        </div>
                    </div>
                    <button className="rounded-full p-2 text-[#92a4c9] hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}
