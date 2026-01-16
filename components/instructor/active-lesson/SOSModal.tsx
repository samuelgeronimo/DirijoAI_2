"use client";

import { useEffect, useState } from "react";

interface SOSModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SOSModal({ isOpen, onClose }: SOSModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Wait for animation
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center ${isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`relative w-full md:w-[600px] bg-[#1a0b0b] md:rounded-2xl rounded-t-2xl border border-red-900/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-transform duration-300 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    }`}
            >
                {/* Modal Header */}
                <div className="bg-red-950/30 border-b border-white/5 p-6 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#f90606]/10 mb-4 animate-pulse">
                        <span className="material-symbols-outlined text-4xl text-[#f90606]">
                            campaign
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        Central de Emergência
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                        Selecione o tipo de ocorrência para ação imediata
                    </p>
                </div>

                <div className="p-6 space-y-4">
                    {/* Police Button (Primary Action) */}
                    <button className="w-full h-20 bg-black hover:bg-red-950 border-2 border-[#f90606]/50 hover:border-[#f90606] text-white rounded-xl flex items-center justify-center gap-4 transition-all group shadow-lg cursor-pointer">
                        <span className="material-symbols-outlined text-4xl text-[#f90606] group-hover:scale-110 transition-transform">
                            local_police
                        </span>
                        <span className="text-2xl font-bold tracking-tight">
                            LIGAR 190 / POLÍCIA
                        </span>
                    </button>

                    {/* Grid of Specific Emergencies */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="h-24 bg-[#2a1515] hover:bg-[#2a1515]/80 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-3xl text-orange-500">
                                car_crash
                            </span>
                            <span className="font-bold text-white">BATIDA</span>
                        </button>
                        <button className="h-24 bg-[#2a1515] hover:bg-[#2a1515]/80 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-3xl text-purple-500">
                                campaign
                            </span>
                            <span className="font-bold text-white">ASSÉDIO</span>
                        </button>
                        <button className="h-24 bg-[#2a1515] hover:bg-[#2a1515]/80 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-3xl text-green-500">
                                sick
                            </span>
                            <span className="font-bold text-white">PASSOU MAL</span>
                        </button>
                        <button className="h-24 bg-[#2a1515] hover:bg-[#2a1515]/80 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-3xl text-yellow-500">
                                car_repair
                            </span>
                            <span className="font-bold text-white">PANE MECÂNICA</span>
                        </button>
                    </div>
                </div>

                {/* Cancel Button */}
                <div className="p-4 bg-black/20 text-center border-t border-white/5">
                    <button
                        className="text-white/40 hover:text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={onClose}
                    >
                        Foi engano, voltar para aula
                    </button>
                </div>
            </div>
        </div>
    );
}
