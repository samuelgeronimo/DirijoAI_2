"use client";

interface LessonHeaderProps {
    onSOSClick: () => void;
}

export function LessonHeader({ onSOSClick }: LessonHeaderProps) {
    return (
        <header className="flex-none bg-[#2a1515]/95 backdrop-blur-sm border-b border-white/5 px-4 py-3 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Student Info */}
                <div className="flex items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <div
                            className="h-12 w-12 rounded-full bg-center bg-cover border-2 border-white/10"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAE-NBr8yk9UT2jxTajZLgEeDKZajb2tkW1VTsRS9xEJFm1lgpVKci0EGRC6AA-QOc0Zz4rw5HsifSr3nmwfBfb1YeWy-LGiYgK8n7iu_0TkB_3IZ97IsEE4CODzi1IWWN1OZAA6XyD7bDwTfilHK6Wl-FcgFg5m-PVGT8wJ1tQYmFkwxlIONlk59aX4OBCKJq5MQYnnSGfPPJNoxRh50Osil6wEiH70hoJT3i3sVy3RCkPAMQltj9_I6nat1WvP1kbCrxNJTSnsjuX')",
                            }}
                        ></div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-[#2a1515] rounded-full"></div>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">
                            Aluno
                        </p>
                        <h2 className="text-white text-lg font-bold leading-tight">
                            Lucas Silva
                        </h2>
                    </div>
                </div>

                {/* Center: Timer & Status */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    {/* Timer */}
                    <div className="flex items-baseline gap-1 bg-black/20 px-4 py-1 rounded-lg border border-white/5 shadow-inner">
                        <span className="material-symbols-outlined text-white/40 text-xl self-center mr-2">
                            timer
                        </span>
                        <span className="text-3xl font-bold tracking-tight tabular-nums text-white">
                            45:20
                        </span>
                    </div>
                    {/* REC Indicator */}
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="h-2 w-2 rounded-full bg-[#f90606] animate-pulse shadow-[0_0_8px_rgba(249,6,6,0.6)]"></div>
                        <span className="text-[#f90606] text-[10px] font-bold tracking-widest">
                            REC
                        </span>
                    </div>
                </div>

                {/* Right: SOS Button */}
                <div className="flex items-center">
                    <button
                        onClick={onSOSClick}
                        className="group relative flex items-center justify-center h-12 px-6 bg-[#f90606] hover:bg-red-700 active:bg-red-800 transition-all rounded-lg shadow-[0_0_15px_rgba(249,6,6,0.3)] overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
                        <span className="material-symbols-outlined text-white mr-2 group-hover:animate-ping">
                            e911_emergency
                        </span>
                        <span className="text-white text-base font-bold tracking-wide">
                            SOS
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}
