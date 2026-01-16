"use client";

export function GrowthChart() {
    return (
        <div className="lg:col-span-2 rounded-xl bg-[#233648] border border-[#334b63] p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white text-base font-bold">Growth Metrics</h3>
                    <p className="text-[#92adc9] text-sm">
                        Novos Alunos vs Aulas Agendadas
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#137fec]"></span>
                        <span className="text-[#92adc9]">Novos Alunos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#92adc9]"></span>
                        <span className="text-[#92adc9]">Aulas</span>
                    </div>
                </div>
            </div>
            {/* SVG Chart Placeholder */}
            <div className="w-full h-[240px] flex items-end justify-between gap-1 mt-auto relative">
                {/* Grid lines background */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                </div>
                <svg
                    className="absolute inset-0 w-full h-full z-10"
                    preserveAspectRatio="none"
                    viewBox="0 0 800 240"
                >
                    <defs>
                        <linearGradient id="gradientPrimary" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#137fec" stopOpacity="0.3"></stop>
                            <stop offset="100%" stopColor="#137fec" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                    {/* Line 1: New Students */}
                    <path
                        d="M0,200 C100,180 150,100 200,120 C250,140 300,80 400,60 C500,40 600,90 700,50 C750,30 800,20 800,20"
                        fill="none"
                        stroke="#137fec"
                        strokeLinecap="round"
                        strokeWidth="3"
                    ></path>
                    <path
                        className="opacity-40"
                        d="M0,200 C100,180 150,100 200,120 C250,140 300,80 400,60 C500,40 600,90 700,50 C750,30 800,20 800,20 V240 H0 Z"
                        fill="url(#gradientPrimary)"
                    ></path>
                    {/* Line 2: Classes */}
                    <path
                        d="M0,220 C80,210 160,180 240,190 C320,200 400,150 480,140 C560,130 640,160 720,120 C760,100 800,90 800,90"
                        fill="none"
                        stroke="#92adc9"
                        strokeDasharray="5,5"
                        strokeLinecap="round"
                        strokeWidth="2"
                    ></path>
                </svg>
            </div>
            <div className="flex justify-between mt-4 text-[#92adc9] text-xs font-medium uppercase tracking-wider">
                <span>01 Jun</span>
                <span>05 Jun</span>
                <span>10 Jun</span>
                <span>15 Jun</span>
                <span>20 Jun</span>
                <span>25 Jun</span>
                <span>30 Jun</span>
            </div>
        </div>
    );
}
