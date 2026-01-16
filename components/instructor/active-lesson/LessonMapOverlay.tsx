"use client";

export function LessonMapOverlay() {
    return (
        <div className="relative w-full h-full bg-[#1c1c1c] overflow-hidden">
            {/* Map Background Image (Simulated) */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 mix-blend-luminosity"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbZGsUkKF1istjrsL3muG0oDbdf7SHEkB_fHJYqrPeJZcpa_QCbBwJIUhJAKycFmYz_53CYmtXYLwj0yfOw1izcwslHzfrUHX5EXOmU0u0nrFBvJWH_Wr2UFxluyJySz1ifqN39ZY8-UGyyHp-PR3SaDzGcmzrftd5-Anhrrxu7OfsRWmH5q8EQ8gkbyPkYVRPhWogS4L7s0d2gZqhmJpgFdqlhtaCco35XKvKL4wCJo6PuSEOpDMr-KWgNpuc9w6fj6G8r8v3gId6')",
                }}
            ></div>

            {/* Map Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b0b] via-transparent to-transparent opacity-90"></div>

            {/* Simulated Route Line SVG */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M 200 800 Q 400 600 500 400 T 900 100"
                    fill="none"
                    stroke="#3b82f6"
                    strokeDasharray="12 4"
                    strokeLinecap="round"
                    strokeWidth="6"
                ></path>
                {/* Current Position Marker */}
                <circle
                    cx="500"
                    cy="400"
                    fill="#3b82f6"
                    r="12"
                    stroke="white"
                    strokeWidth="3"
                ></circle>
                <circle
                    className="animate-ping"
                    cx="500"
                    cy="400"
                    fill="#3b82f6"
                    opacity="0.2"
                    r="30"
                ></circle>
            </svg>

            {/* Floating Controls on Map */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6">
                {/* Center Action Button */}
                <button className="pointer-events-auto flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-2xl transition-transform hover:scale-105 active:scale-95 group border border-white/10 backdrop-blur-md cursor-pointer">
                    <span className="material-symbols-outlined text-3xl group-hover:rotate-45 transition-transform">
                        navigation
                    </span>
                    <span className="text-lg font-bold tracking-wide">ABRIR NO WAZE</span>
                </button>
            </div>

            {/* Next Maneuver Card (Floating Bottom) */}
            <div className="absolute bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[600px] z-10 transition-all">
                <div className="bg-[#2a1515]/90 backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-2xl flex items-center gap-5">
                    <div className="flex-none h-14 w-14 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="material-symbols-outlined text-3xl text-white">
                            turn_right
                        </span>
                    </div>
                    <div className="flex-1">
                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">
                            Próxima Manobra
                        </p>
                        <h3 className="text-white text-xl font-medium">Baliza na Rua X</h3>
                    </div>
                    <div className="flex-none text-right">
                        <span className="text-2xl font-bold text-white">200</span>
                        <span className="text-sm text-white/50">m</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
