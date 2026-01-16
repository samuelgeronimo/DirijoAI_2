export function ProfilePreview() {
    return (
        <aside className="w-[380px] hidden xl:flex flex-col border-l border-slate-200 dark:border-instructor-surface-dark-2 bg-white dark:bg-[#0c1810] p-6 h-full sticky top-0">
            <div className="mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">smartphone</span>
                    Pré-visualização do Aluno
                </h3>
                <p className="text-xs text-slate-500">
                    Veja como seu card aparece na busca.
                </p>
            </div>
            {/* Phone Mockup Container */}
            <div className="flex-1 flex justify-center items-start pt-4 h-full overflow-hidden">
                <div className="w-[320px] bg-white dark:bg-[#112217] rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden relative max-h-[600px] flex flex-col">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                    {/* App UI Mockup */}
                    <div className="h-full overflow-y-auto bg-slate-100 dark:bg-[#0c1810] relative text-slate-900 dark:text-white pb-4 scrollbar-hide">
                        {/* Profile Header Image/Video Placeholder */}
                        <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 relative group cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-80"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8GpQoClH2nso0t4wohZ6IXHN2KHBxSc7ELgIJNi6vZ7_V03iduq9GwFqc87VEuJkxYKYFay5tPU9wtGIBQ4jRgJN6LJH_9gZXqccEn_Uc1lZKSWdnb-jZMtPvUHv8vGxDKSn-2oCAyRamP0PJGaqrDHcqP9wRfouMMdwuobDsI2sfaKBjxMpgIrvVqrDX_g4wXg0Isup0CjUuYuzg3tjROxkKbIAIpwXV6LcwwI_NvI5pLUYPtYe0orCISAlwMj3-_PSXMSQemGIo')",
                                }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50">
                                    <span className="material-symbols-outlined text-white text-3xl">
                                        play_arrow
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                                01:00
                            </div>
                        </div>
                        {/* Instructor Info */}
                        <div className="p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-black leading-tight">
                                        Instrutor Carlos
                                    </h4>
                                    <div className="flex items-center text-xs text-yellow-500 font-bold mt-1">
                                        <span className="material-symbols-outlined text-sm">
                                            star
                                        </span>
                                        <span className="ml-1">4.9</span>
                                        <span className="text-slate-400 font-normal ml-1">
                                            (120 aulas)
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-instructor-primary/10 text-instructor-primary rounded p-1">
                                    <span className="material-symbols-outlined text-xl">
                                        verified
                                    </span>
                                </div>
                            </div>
                            {/* Badges Preview */}
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 bg-instructor-primary/10 text-instructor-primary text-[10px] font-bold uppercase rounded border border-instructor-primary/20">
                                    Psicólogo
                                </span>
                                <span className="px-2 py-0.5 bg-instructor-primary/10 text-instructor-primary text-[10px] font-bold uppercase rounded border border-instructor-primary/20">
                                    Paciência
                                </span>
                            </div>
                            {/* Gallery Preview */}
                            <div className="mt-2">
                                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                                    Últimas Aprovações
                                </p>
                                <div className="flex gap-2 overflow-x-hidden">
                                    <div
                                        className="size-16 rounded bg-slate-800 bg-cover bg-center shrink-0"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5qTK5IJJqv_rA2WOc6bHfY59RK7JUMwFYuvnSuoanwFa_iIPNXikBkmrdLcD9coE11bHKMPy8PVVDzjmPH0EuUjljSoj_Ueuoqy7Z2O7ekharU4Yoox8x87nY1kcH69TIjOJt18Hb4FeKhdmff44hUFsx82a7HIlMGNJaP8LBdrXiXvfX5C4I0KCIzPc7BqLsrHZ6xT88gUk_dhzW6nTePuWW8Xeg_a9JKJeovk3W1s9FnTRDtRyd6zKTD6ZRnCVeH2iwkRHmeCe5')",
                                        }}
                                    ></div>
                                    <div
                                        className="size-16 rounded bg-slate-800 bg-cover bg-center shrink-0"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlFjEK5DW521qkkNPHePvWHVXFR62ZW9uSnpFKI5KlhvAJantaPJyC17CIig9JKkL1dZcG5Ubh8ztd9QNUiGZGXNQcX0bIWAqZQiOPvdhoIug3qFo7MdG6l0wr-Mhdk31Aovtd5-HkRkUbXGzZWJaOXgTgAkcOY2cKD_9Ej2r4uMcsF_rP7eMnC7n9ud-cn1krfr2pEbcYPzeCaZAZh-6wAKoRTjmp4iOh5EsS8SngxdKlFQu4s0-L24j2rdwMsb_pM8jT43HM9xvo')",
                                        }}
                                    ></div>
                                    <div
                                        className="size-16 rounded bg-slate-800 bg-cover bg-center shrink-0"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBShfRh_KDu1cSUAF1yYNs-9L1LY_dFW1jqFQLc3J0wgl6VVvLZwZkt0Ie3oQhAerLs_nATGe7xciYX8__W9Z4dkg5VeymFaWDbfz4e6x8un6VtNjQYOr_JH446O2xRL0eZJMA5JUVjdxcOsHUf0abBWKzRxw8_g4lTWU22Byq12meyzHM7J-PYPnycIo_6R41gOqQuDdoDHWoK2mPCN0gAT8AJ3bxWnFs0QIrMw_WzoMlskqgR0CGP-nD8wiGg0y9ZqePiG5HtOXmY')",
                                        }}
                                    ></div>
                                </div>
                            </div>
                            {/* CTA */}
                            <button className="w-full mt-4 bg-instructor-primary text-[#102216] font-bold py-3 rounded-lg text-sm shadow-lg shadow-instructor-primary/20">
                                Agendar Aula
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
