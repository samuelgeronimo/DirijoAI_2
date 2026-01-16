export function FloatingAction() {
    return (
        <div className="absolute bottom-8 right-8 z-40">
            <button className="group relative flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all active:scale-95 cursor-pointer">
                <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-yellow-400 opacity-20 duration-1000"></div>
                <div className="flex items-center justify-center rounded-full bg-yellow-500 p-1 text-white">
                    <span className="material-symbols-outlined fill-current">bolt</span>
                </div>
                <span className="text-base font-bold text-slate-900">
                    Promoção Relâmpago Ativa
                </span>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md">
                    3
                </span>
            </button>
        </div>
    );
}
