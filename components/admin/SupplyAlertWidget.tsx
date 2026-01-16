"use client";

import Link from "next/link";

export function SupplyAlertWidget() {
    return (
        <div className="lg:col-span-1 flex flex-col">
            <div className="flex-1 rounded-xl bg-[#2b1616] border border-[#ef4444] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg shadow-[#ef4444]/10 animate-[pulse-red_2s_infinite]">
                <style jsx>{`
          @keyframes pulse-red {
            0% {
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            }
          }
        `}</style>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ef4444]/10 via-transparent to-transparent"></div>
                <div className="z-10 bg-[#ef4444]/20 rounded-full p-4 mb-4">
                    <span className="material-symbols-outlined text-4xl text-[#ef4444]">
                        no_accounts
                    </span>
                </div>
                <h3 className="z-10 text-white text-3xl font-bold mb-1">15</h3>
                <p className="z-10 text-[#ef4444] font-bold uppercase tracking-wider text-sm mb-4">
                    Instrutores Pendentes
                </p>
                <div className="z-10 bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30 rounded-lg px-3 py-1 text-xs font-bold animate-pulse mb-6">
                    AÇÃO IMEDIATA NECESSÁRIA
                </div>
                <Link
                    href="/admin/approvals"
                    className="z-10 w-full bg-[#ef4444] hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    <span>Verificar Pipeline</span>
                    <span className="material-symbols-outlined text-sm">
                        arrow_forward
                    </span>
                </Link>
            </div>
        </div>
    );
}
