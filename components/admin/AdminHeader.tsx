"use client";

export function AdminHeader() {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-[#233648] bg-[#111a22]/95 backdrop-blur-sm px-6 py-4 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-[#137fec]">
                        analytics
                    </span>
                    <h2 className="text-white text-lg font-bold leading-tight">
                        Torre de Controle
                    </h2>
                </div>
            </div>
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex w-96 items-center rounded-lg bg-[#233648] border border-[#334b63] focus-within:border-[#137fec] transition-colors h-10 px-3">
                    <span className="material-symbols-outlined text-[#92adc9]">
                        search
                    </span>
                    <input
                        className="w-full bg-transparent border-none text-white text-sm placeholder:text-[#92adc9] focus:ring-0 ml-2"
                        placeholder="Buscar instrutor, aluno ou transação ID..."
                    />
                </div>
                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-[#233648]">
                    <div className="text-right hidden sm:block">
                        <p className="text-white text-sm font-medium">Admin Master</p>
                        <p className="text-[#92adc9] text-xs">Superuser</p>
                    </div>
                    <div
                        className="size-10 rounded-full bg-cover bg-center border-2 border-[#233648]"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcVt4YpIpYTrOrPhIBM6IO5baM_nNocTWoRE1BCt5xVoBh7yO0nwGafoVJfSEmrGXnMdrhzsVg47KgySYCPeVOy-_IejxsmexKSUvp7Zp2bmrvRqb7P8f5OKePvjCck9G65qy5234E8govQ0Ewy6u4R5D0eBryYT4b4AjqKHUvwuYRb84F9nGyRakJe6a8Cti3_Lc2k4z1JoJLbJtAo4kLsvyFhuvVFcF3Gad_sPqGs1HL4oXq1JmFt8OfCfpR1JUgDiDHnKL9_wNd')",
                        }}
                    ></div>
                </div>
            </div>
        </header>
    );
}
