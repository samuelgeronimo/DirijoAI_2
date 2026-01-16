import Link from "next/link";

export function NextMission() {
    return (
        <div className="xl:col-span-2 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-instructor-primary">
                    location_on
                </span>
                Próxima Missão
            </h3>
            <div className="bg-instructor-surface-dark rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                {/* Map Preview Header */}
                <div
                    className="h-32 bg-cover bg-center relative"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtZHNgCgywNeAmJRprS3i1eakKoBTNIKJYLFgLoZYwLxFQY2k90KQb76sjwDZxb6VrtXcWSr3Z1pPfjkZyIOA2Fy01FKc8B-ctKvDEZ8oH9pX9zuNMSKgKnjlDfWst8EAMqx6yVzIYXw1n3e6votO1x8i817im1dIkoQrvcerw8VkwHznVgIJqk7TwHkpZjkKnqoNK5zSepV3VoE9vo3rO_MFIjCUiTXr1i3qg7RuwW9M6OX1diWCLWwe83lizFGG1aUtpado4-vas')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-instructor-surface-dark"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            aria-label="Open Waze"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-lg transition-colors border border-white/10 cursor-pointer"
                        >
                            <span className="material-symbols-outlined">near_me</span>
                        </button>
                        <button
                            aria-label="Open Chat"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-lg transition-colors border border-white/10 cursor-pointer"
                        >
                            <span className="material-symbols-outlined">chat_bubble</span>
                        </button>
                    </div>
                </div>
                <div className="p-6 sm:p-8 -mt-12 relative z-10">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
                        <div className="relative">
                            <div
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cover bg-center shadow-xl border-4 border-instructor-surface-dark"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDx0emomj6xnDyA0p7bxxhODiIZNxHksUGdLrP2A1Jw8rbI7_x2exBER18MCXFtHBq5BhJAP7axR98qcusHkpAcQ120rzygKolSqREGCc6KhwvQBML1AZH71i2_cf-fYMQv3r3uQLiO3qk0RRbMyw_nVT25LeNKlQPVAkTH49FbEzFlaRRtjuoJyrIJej5O-eo3T0AvXeIu5xi0BasJ1MNN7W47n_td8KI9Fj0yOoZl0dNAVp6J-g9Gz5iKXQmW4jsc69PZ958P90e4')",
                                }}
                            ></div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-instructor-bg-dark text-xs font-bold px-2 py-1 rounded-full border-2 border-instructor-surface-dark">
                                ALUNO
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                Lucas M.
                            </h2>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 text-gray-300">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-instructor-primary font-light text-lg">
                                        schedule
                                    </span>
                                    <span className="font-medium">14:00 - 15:00</span>
                                </div>
                                <div className="hidden sm:block text-gray-600">•</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-instructor-primary font-light text-lg">
                                        pin_drop
                                    </span>
                                    <span>Rua das Flores, 123 - Centro</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-instructor-surface-dark-2/50 rounded-xl p-4 mb-8 border border-white/5">
                        <div className="flex gap-3">
                            <span className="material-symbols-outlined text-instructor-secondary mt-0.5">
                                lightbulb
                            </span>
                            <div>
                                <p className="text-white font-semibold text-sm">
                                    Dica do sistema
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Lucas prefere treinar baliza hoje. O trânsito está leve na
                                    região.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link
                        href="/instructor/active-lesson"
                        className="w-full bg-instructor-primary hover:bg-instructor-primary-hover text-instructor-bg-dark text-lg font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(19,236,91,0.2)] hover:shadow-[0_0_40px_rgba(19,236,91,0.4)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
                    >
                        <span className="material-symbols-outlined fill-current">
                            play_circle
                        </span>
                        INICIAR AULA
                    </Link>
                </div>
            </div>
        </div>
    );
}
