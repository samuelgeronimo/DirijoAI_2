"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SearchEmptyState from './SearchEmptyState';

const MOCK_INSTRUCTORS = [
    {
        id: 1,
        name: "João S.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzEOdcKjoKtJNzWOZEvU8cnG7-kFjyRI2ojYlc03_D3AW5_NFuamCkuPcwZ_sw59XoerEem9JbxTdMh2dwTvSceGsSRdU4y4WbH60nzYn0tf4yqnCrsUckoyVYSqjIVG_vTGPXBEje0DnOqQqDrWoIi41VMKEg_JWutZLcFsJ1R9crO1SRIxkA0TZXkaaCvZerpM1vJXtJqqTXGf8KHBENy9zgEfgl8edzXX-FOzXbaFpGRq2sxR9kw1klnWGy0RzQQHYEtGAbiYR2",
        rating: 4.9,
        badges: [{ text: "🎯 Rei da Baliza", color: "blue" }],
        achievements: "🏆 42 Aprovados este ano",
        car: "VW Gol G8",
        carDetails: "Ar Condicionado • Direção Elétrica",
        serviceBadge: "✅ Busca em Casa",
        priceOld: 100,
        priceNew: 85,
        availability: "Restam 3 horários",
        top: true
    },
    {
        id: 2,
        name: "Maria Eduarda",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp-0QxD7Q9zS5XC_8MLfeimVJ6MjFwPWOxYqyTO6-seNL69iu736a2sm-Ahq-DX1oBAOTjUl26lM67TNvtVZIXqlauCD_fmJynD8p7SWhIA-YpQbE9tP1WXDWpKyJllLHkjcDVNaeCXtTxiPOCeJnW3zhGsQfi0LtxC5Bh4l_8u4YJt92C-TInbqWFSMXSq756XPioTS-4hzy7wJneECbKHjBe2pat46oSbP_Be8HwtSxg1fTZR05xJ7K9otXGfKxOe-xzuWQOCDTB",
        rating: 5.0,
        badges: [{ text: "🧠 Especialista em Medo", color: "purple" }],
        achievements: "🏆 98% de Aprovação",
        car: "Hyundai HB20",
        carDetails: "Automático • Direção Elétrica",
        serviceBadge: "❄️ Ar Digital",
        priceOld: 110,
        priceNew: 95,
        availability: "Agenda quase cheia",
        top: false
    },
    {
        id: 3,
        name: "Ricardo O.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuAHodFg2I-rZIx3nFSdsZVGVSlKpOY_xjd_XM6PD5_jpI8d4gD2Vie9LF29PArLJ0VGa75WFGAqYiX4FBA7euCL6svIOSdfSG77iNJjjlOTEYexJo3xFHCitQRILM-WiKlkoO58q0bNM-jPOlI-P9KMfX1t-8CsABlc8gP7G3j5qWF_QsURIQuBExlUQzf0U264kZNal275zBRV2cGPqb34EwQXNIZJD4Kmtghex7CsPLsu3MWiPd7iWeS8kP-Kh09PVjJtgfpI3w",
        rating: 4.7,
        badges: [{ text: "🚛 Mestre dos Pesados", color: "amber" }],
        achievements: "🏆 150+ Alunos formados",
        car: "Volvo FH",
        carDetails: "Automático • Categoria E",
        serviceBadge: "🛡️ Seguro Incluso",
        priceOld: 90,
        priceNew: 75,
        availability: "Última vaga hoje",
        top: false
    }
];

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || "São Paulo, SP";

    // Simple mock logic: If query includes "são paulo" (case insensitive) or "sp", show data. Otherwise empty.
    const hasResults = query.toLowerCase().includes("são paulo") || query.toLowerCase().includes("sp");

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 min-h-screen flex flex-col overflow-hidden font-sans">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#101922] px-10 py-3 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#137fec]">
                        <div className="size-8">
                            <span className="material-symbols-outlined text-3xl">local_taxi</span>
                        </div>
                        <h2 className="text-[#0d141b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Dirijo.ai</h2>
                    </div>
                    <label className="flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-[#4c739a] flex border-none bg-[#e7edf3] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 border-none bg-[#e7edf3] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:ring-0 h-full placeholder:text-[#4c739a] px-4 rounded-r-lg pl-2 text-base font-normal"
                                placeholder="São Paulo, SP"
                                defaultValue={query}
                            />
                        </div>
                    </label>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="flex items-center gap-9">
                        <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="/">Início</a>
                        <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Instrutores</a>
                        <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Meus Agendamentos</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold tracking-[0.015em] hover:bg-[#137fec]/90 transition-all">
                            Entrar
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#137fec]/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmbZ2uokfvcWM_18WLogNn2-nJVSGeOAKuoeSw_CoIqXs7cnFCOdH0BGeO0J7P-kpWJ7J1pMveCs6jZ0cFI0t4Yy62WzWn6BHGD_IpXXc6U1Uca4YOoGGWaxFnJfdVl6Xmvi00ScwTFPvPdKOXyOc6RiV2BNBxwc4OphDyWNnFRYaWzaeL5KBZR0krHyPje_XYGJpNO8gQKlslFM24Ue7KgFFlfxmnOQ379dxWN9gTNiDNGRatCJmlB62-7Aq-LpjI5B7puSNkAzR_")' }}></div>
                    </div>
                </div>
            </header>

            {!hasResults ? <SearchEmptyState city={query} /> : (
                <>
                    <div className="bg-white dark:bg-[#101922] border-b border-[#e7edf3] dark:border-slate-800 px-6 py-3 flex gap-3 flex-wrap items-center shadow-sm z-40">
                        <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-[#e7edf3] dark:bg-slate-800 px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <p className="text-[#0d141b] dark:text-slate-200 text-sm font-medium">Preço</p>
                            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                        </button>
                        <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-[#137fec]/10 border border-[#137fec]/20 px-4">
                            <p className="text-[#137fec] text-sm font-semibold">Categoria: B</p>
                            <span className="material-symbols-outlined text-sm text-[#137fec]">close</span>
                        </button>
                        <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-[#e7edf3] dark:bg-slate-800 px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <p className="text-[#0d141b] dark:text-slate-200 text-sm font-medium">Avaliação</p>
                            <span className="material-symbols-outlined text-sm">star</span>
                        </button>
                        <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-[#e7edf3] dark:bg-slate-800 px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <p className="text-[#0d141b] dark:text-slate-200 text-sm font-medium">Horários</p>
                            <span className="material-symbols-outlined text-sm">schedule</span>
                        </button>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <button className="text-[#137fec] text-sm font-medium hover:underline">Limpar filtros</button>
                    </div>

                    <main className="flex flex-1 overflow-hidden">
                        <section className="w-full lg:w-[480px] xl:w-[560px] flex flex-col bg-[#f6f7f8] dark:bg-[#101922] border-r border-[#e7edf3] dark:border-slate-800 overflow-y-auto">
                            <div className="px-6 pt-6 pb-2">
                                <h3 className="text-[#0d141b] dark:text-white tracking-tight text-xl font-bold leading-tight">24 instrutores credenciados em {query}</h3>
                                <p className="text-[#4c739a] text-sm mt-1">Profissionais com alta taxa de aprovação selecionados para você.</p>
                            </div>
                            <div className="p-4 space-y-4">
                                {MOCK_INSTRUCTORS.map(instructor => (
                                    <div key={instructor.id} className="group flex flex-col rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-[#137fec]/50 hover:shadow-md transition-all cursor-pointer overflow-hidden">
                                        <div className="p-4 flex gap-4 items-start pb-2">
                                            <div className="relative shrink-0">
                                                <div className={`w-16 h-16 rounded-full p-0.5 border-2 ${instructor.top ? 'border-yellow-400' : 'border-[#137fec]/30'}`} title={instructor.top ? "Top Instrutor" : "Instrutor Verificado"}>
                                                    <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${instructor.image}")` }}></div>
                                                </div>
                                                {instructor.top && (
                                                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">TOP</div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-tight truncate">{instructor.name}</h4>
                                                        {instructor.badges.map((badge, idx) => (
                                                            <span key={idx} className={`inline-flex items-center gap-1 bg-${badge.color}-50 dark:bg-${badge.color}-900/30 text-${badge.color}-700 dark:text-${badge.color}-300 text-xs font-semibold px-2 py-0.5 rounded mt-1`}>
                                                                {badge.text}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-col items-end shrink-0">
                                                        <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                                            <span className="material-symbols-outlined text-sm text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                            {instructor.rating.toFixed(1)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <span className="flex items-center w-fit gap-1 text-green-700 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded border border-green-100 dark:border-green-900/30">
                                                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                                        {instructor.achievements}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 pb-3">
                                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 flex items-center gap-3">
                                                <div className="bg-white dark:bg-slate-700 p-2 rounded shadow-sm text-slate-500">
                                                    <span className="material-symbols-outlined">directions_car</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">{instructor.car}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{instructor.carDetails}</p>
                                                </div>
                                                <div className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full whitespace-nowrap border border-green-200 dark:border-green-900/50">
                                                    {instructor.serviceBadge}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-400 line-through">R$ {instructor.priceOld}</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-base font-bold text-slate-900 dark:text-white">R$ {instructor.priceNew}</span>
                                                    <span className="text-xs font-normal text-slate-500">/aula</span>
                                                </div>
                                                <span className="text-xs font-bold text-orange-600 flex items-center gap-1 mt-0.5">
                                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                                                    {instructor.availability}
                                                </span>
                                            </div>
                                            <Link
                                                href={`/instructor/${instructor.id}`}
                                                className="border border-[#137fec] text-[#137fec] hover:bg-[#137fec] hover:text-white dark:hover:text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center"
                                            >
                                                Ver Agenda
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                <div className="py-4 flex justify-center">
                                    <button className="text-[#137fec] font-bold text-sm hover:underline">Ver mais instrutores</button>
                                </div>
                            </div>
                        </section>

                        <section className="hidden lg:block flex-1 relative bg-slate-200 dark:bg-slate-800">
                            <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCs6JMi9C7CcoeaXcQ_FCN_S_-K1gDJuFTaHihCqE8lkp1FkR_xZq7-TePHUT3ntqFRrfJVb1NKmaLf8Vw9Sp4HkHtI5XU4uZSdzPcGT67ficTOxuH52Q1XXZvQi0sY9EDBfVIi5mDaZ60WjOAHjnEzAnpQOD6m9un-CYjNo2bAF2sqj0vJQ_elJhc03pySI0iPeazk_eP1tUN-4N4KlGxNQzDnrUwZCQhTpO_3BNXqP1FqtEBTRSMQ7Uqe1dmg4J8f37Jej2TPJZxS")' }}>
                                <div className="absolute inset-0 bg-[#137fec]/5 pointer-events-none"></div>

                                <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
                                    <div className="bg-orange-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1 hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                                        <span>R$ 85</span>
                                    </div>
                                    <div className="w-0.5 h-3 bg-orange-500 mx-auto"></div>
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto shadow-sm ring-2 ring-white"></div>
                                </div>

                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer scale-110 z-30">
                                    <div className="bg-[#137fec] text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-xl border-2 border-white flex items-center gap-1 ring-4 ring-[#137fec]/20 hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                        <span>R$ 95</span>
                                    </div>
                                    <div className="w-0.5 h-4 bg-[#137fec] mx-auto"></div>
                                    <div className="w-2.5 h-2.5 bg-[#137fec] rounded-full mx-auto shadow-sm ring-2 ring-white"></div>
                                </div>

                                <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                                    <div className="bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1 hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
                                        <span>R$ 75</span>
                                    </div>
                                    <div className="w-0.5 h-3 bg-red-500 mx-auto"></div>
                                    <div className="w-2 h-2 bg-red-500 rounded-full mx-auto shadow-sm ring-2 ring-white"></div>
                                </div>

                                <div className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                                    <div className="bg-white dark:bg-slate-900 text-slate-700 dark:text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border-2 border-slate-200 dark:border-slate-700 flex items-center gap-1 hover:scale-110 transition-transform">
                                        <span>R$ 90</span>
                                    </div>
                                    <div className="w-0.5 h-3 bg-slate-400 mx-auto"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full mx-auto shadow-sm ring-2 ring-white"></div>
                                </div>
                            </div>

                            <div className="absolute right-6 bottom-10 flex flex-col gap-2">
                                <button className="size-10 bg-white dark:bg-slate-900 rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                                <button className="size-10 bg-white dark:bg-slate-900 rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <button className="size-10 mt-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg flex items-center justify-center text-[#137fec] hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined">my_location</span>
                                </button>
                            </div>

                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                                <button className="bg-white dark:bg-slate-900 text-[#137fec] font-bold text-sm px-6 py-2.5 rounded-full shadow-xl border border-[#137fec]/20 hover:bg-[#137fec] hover:text-white transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">refresh</span>
                                    Pesquisar nesta área
                                </button>
                            </div>
                        </section>
                    </main>
                </>
            )}
        </div>
    );
}
