"use client";

export function EvidenceChat() {
    return (
        <div className="xl:col-span-6 bg-[#111a22] rounded-xl border border-[#324d67] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#324d67] bg-[#1a2632]/50 flex justify-between items-center">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#92adc9]">
                        forum
                    </span>
                    Chat de Evidências
                </h3>
                <button className="text-xs text-[#137fec] hover:text-blue-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        download
                    </span>
                    Baixar Log
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0d141b]/50 h-[400px]">
                <div className="flex justify-center">
                    <span className="text-[10px] bg-[#1e293b] text-[#92adc9] px-2 py-0.5 rounded-full border border-[#324d67]">
                        24 Outubro
                    </span>
                </div>
                <div className="flex gap-3 justify-end">
                    <div className="flex flex-col items-end max-w-[80%]">
                        <div className="bg-[#137fec]/20 border border-[#137fec]/30 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                            O instrutor não apareceu no ponto de encontro combinado. Esperei 15
                            minutos.
                        </div>
                        <span className="text-[10px] text-[#5a718a] mt-1 mr-1">
                            Lucas F. • 14:15
                        </span>
                    </div>
                    <div
                        className="size-8 rounded-full bg-cover bg-center shrink-0"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKEFq8q7-p4Sp5lGFh3X7cgUOPr72pHkggse-zXs405ZtnVOR_vloiCbqFA_dV_71nUiyV31_JoqBStntglWCqDXwXBnAgobDHqToGxxrnjOKTbh4kR6YTTCS4QasZF4L0gcZEIJoZ6sC9QWWSIutP7nLu0JXcYtN0zttnM-tdH_OhYtWMpw4QNiqn0z7GnRjzxSEgJsXMy6cZISrbwlgZO8mOwg_OgDJVMBd0u29Yik2GO-kWASBezY0g_dwuFPA_FBOr2-LV8Zf2")',
                        }}
                    ></div>
                </div>
                <div className="flex justify-center my-2">
                    <span className="text-[11px] text-[#92adc9] italic flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">info</span>
                        Sistema abriu disputa automaticamente
                    </span>
                </div>
                <div className="flex gap-3 justify-start">
                    <div
                        className="size-8 rounded-full bg-cover bg-center shrink-0"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhveIWxQIb5Hyv62x3fu07zqsMkw3Mka1-K7A6fRhWvqOP6dmUEuus3eauD9SJyqcMu3vxDF7NedEKW4qBP7dz6HNe0_GGG5HKsZ9X3aXn7mHsf44t9aOFPqwA9xsPFKTmpccBG56Xukz5tmwzT0QANjRkZxIRluJPI_X694Mjry2IU0VY91yUdcJiHR__1B14bj9WuSZkvRVfuGDuSDLLixGWFvje5mtWJRvHK88CEdWff80peaDJPxSmOfHw369E41S1wYTAeRog")',
                        }}
                    ></div>
                    <div className="flex flex-col items-start max-w-[80%]">
                        <div className="bg-[#1e293b] border border-[#324d67] text-white rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                            Eu estava lá! Aqui está a foto do local na hora marcada. O aluno
                            que não vi.
                        </div>
                        <div className="mt-2 rounded-lg overflow-hidden border border-[#324d67] w-[200px] relative group cursor-pointer">
                            <div className="bg-slate-700 h-[120px] w-full flex items-center justify-center text-[#5a718a]">
                                <span className="material-symbols-outlined">image</span>
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">
                                    visibility
                                </span>
                            </div>
                        </div>
                        <span className="text-[10px] text-[#5a718a] mt-1 ml-1">
                            Roberto A. • 14:20
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-3 border-t border-[#324d67] bg-[#1a2632]">
                <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                    <input
                        className="w-full bg-[#111a22] border border-[#324d67] rounded-lg px-3 py-2 text-sm text-[#92adc9] italic"
                        disabled
                        type="text"
                        value="Chat fechado para análise do suporte"
                    />
                </div>
            </div>
        </div>
    );
}
