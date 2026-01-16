"use client";

export function ApprovalHeader() {
    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#111a22] border-b border-gray-200 dark:border-[#233648] shrink-0 z-20">
            <div className="flex items-center gap-4">
                <div className="size-8 bg-[#137fec]/20 rounded-lg flex items-center justify-center text-[#137fec]">
                    <span className="material-symbols-outlined">verified</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    Dirijo.ai <span className="text-gray-400 font-normal mx-2">|</span>{" "}
                    <span className="text-[#137fec] font-medium">Supply Manager</span>
                </h1>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#1e2936] border border-gray-200 dark:border-gray-700">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        Fila Prioritária: 12 pendentes
                    </span>
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-gray-500 hover:text-[#137fec] dark:text-gray-400 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-[#233648]">
                        <span className="material-symbols-outlined text-[20px]">
                            notifications
                        </span>
                        <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111a22]"></span>
                    </button>
                    <div
                        className="size-8 rounded-full bg-cover bg-center ring-2 ring-gray-200 dark:ring-[#233648]"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdqDpgAlFqTX3jMkYFUEuxwzZ5G5gB06fLRG9UOc3Zi4f9SqTWG_A39NDBNuxHbIjmTdOUOgFHZE30kuzE5qnzyvUZVjEc0OjjuKRxagmwYrucZd80h2935JPL0jplqX9tHTcvBVAV9Xv3BWfi7roMo9vH2zdCRmRsKBdxg0wdbFwXypFibZC-LiCLYgdzTUmeygLF0pP9FCgx0xKSLNdCNd4m75gxaM7Xwa4Ut62DQtcQ-sTxo4XD2ybhqlZ5JObbKV8LzRMV0BjL')",
                        }}
                    ></div>
                </div>
            </div>
        </header>
    );
}
