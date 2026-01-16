"use client";

export function ConflictCard() {
    return (
        <div className="bg-[#111a22] rounded-xl border border-[#324d67] shadow-lg overflow-hidden">
            <div className="p-5 flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex items-center justify-between md:justify-start gap-8 md:gap-16 relative">
                    <div className="hidden md:block absolute top-1/2 left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-emerald-500/20 via-[#324d67] to-[#137fec]/20 -z-10 transform -translate-y-1/2"></div>
                    {/* Instructor */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                        <div className="relative">
                            <div
                                className="size-16 rounded-full bg-cover bg-center border-2 border-[#324d67] shadow-xl"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhveIWxQIb5Hyv62x3fu07zqsMkw3Mka1-K7A6fRhWvqOP6dmUEuus3eauD9SJyqcMu3vxDF7NedEKW4qBP7dz6HNe0_GGG5HKsZ9X3aXn7mHsf44t9aOFPqwA9xsPFKTmpccBG56Xukz5tmwzT0QANjRkZxIRluJPI_X694Mjry2IU0VY91yUdcJiHR__1B14bj9WuSZkvRVfuGDuSDLLixGWFvje5mtWJRvHK88CEdWff80peaDJPxSmOfHw369E41S1wYTAeRog")',
                                }}
                            ></div>
                            <div className="absolute -bottom-1 -right-1 bg-[#137fec] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#111a22]">
                                INSTRUTOR
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">Roberto A.</p>
                            <div className="flex items-center justify-center gap-1 text-xs text-[#92adc9]">
                                <span
                                    className="material-symbols-outlined text-[12px] text-yellow-400"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    star
                                </span>
                                4.9
                            </div>
                        </div>
                    </div>
                    {/* Middle Info */}
                    <div className="flex flex-col items-center gap-1 bg-[#1e293b] px-4 py-2 rounded-lg border border-[#324d67]">
                        <span className="text-xs text-[#92adc9] uppercase tracking-widest font-bold">
                            Aula
                        </span>
                        <span className="text-white font-mono text-lg font-bold">
                            14:00
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">
                            Confirmada
                        </span>
                    </div>
                    {/* Student */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                        <div className="relative">
                            <div
                                className="size-16 rounded-full bg-cover bg-center border-2 border-[#324d67] shadow-xl"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKEFq8q7-p4Sp5lGFh3X7cgUOPr72pHkggse-zXs405ZtnVOR_vloiCbqFA_dV_71nUiyV31_JoqBStntglWCqDXwXBnAgobDHqToGxxrnjOKTbh4kR6YTTCS4QasZF4L0gcZEIJoZ6sC9QWWSIutP7nLu0JXcYtN0zttnM-tdH_OhYtWMpw4QNiqn0z7GnRjzxSEgJsXMy6cZISrbwlgZO8mOwg_OgDJVMBd0u29Yik2GO-kWASBezY0g_dwuFPA_FBOr2-LV8Zf2")',
                                }}
                            ></div>
                            <div className="absolute -bottom-1 -left-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#111a22]">
                                ALUNO
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">Lucas F.</p>
                            <div className="flex items-center justify-center gap-1 text-xs text-[#92adc9]">
                                <span
                                    className="material-symbols-outlined text-[12px] text-yellow-400"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    star
                                </span>
                                4.2
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map Preview */}
                <div className="w-full md:w-[320px] h-[120px] rounded-lg border border-[#324d67] bg-[#1a2632] relative overflow-hidden group">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "radial-gradient(#4b6a88 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    ></div>
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-[#324d67]/50 transform -rotate-6"></div>
                    <div className="absolute top-0 left-1/3 h-full w-2 bg-[#324d67]/50 transform rotate-12"></div>
                    <div className="absolute top-[40%] left-[45%] flex flex-col items-center transform transition-transform group-hover:-translate-y-1">
                        <span
                            className="material-symbols-outlined text-red-500 text-3xl drop-shadow-lg"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            location_on
                        </span>
                        <div className="bg-[#101922]/90 text-white text-[10px] px-2 py-0.5 rounded shadow-lg border border-[#324d67] whitespace-nowrap">
                            Check-in: 13:55
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2">
                        <button className="bg-white/10 hover:bg-white/20 text-white p-1 rounded transition-colors">
                            <span className="material-symbols-outlined text-sm">
                                open_in_full
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
