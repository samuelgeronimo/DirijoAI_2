"use client";
import React from 'react';
import Link from 'next/link';

export default function InstructorOnboardingConfirmation() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col transition-colors duration-200">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] px-6 py-3 lg:px-10 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="text-[#137fec] size-8 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">directions_car</span>
                    </div>
                    <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">DrivingInstructor Pro</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Olá, Candidato</span>
                    </div>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-100 dark:border-slate-700" data-alt="Portrait of a smiling user avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQpvHB9I29Q0vtbDQtRRPPo9nWO3BQrYLF-926ENmTrT3GcJyOuQisefmwYWRQQMtOOA1XTRIgUmoVywKGx2vUvVgQqPAR0NFFZGMand_fxq3Hi7f4p8DeucYjjMKF9rJ0FyfWTnOpj4sNLEX62yUT2sBLxrOPln3YdVVvT6-YIkypqg0eiRpDUl3sEM36bDSXX895Yw1IzJSB6fLknxFhLIx4KxwJtQm5_diaQ4vBsE_XN00Y9miXKqv_vT5uV0tWuf2tFDyIZv6_")' }}>
                    </div>
                </div>
            </header>
            {/* Main Content Layout */}
            <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-[800px] flex flex-col gap-8">
                    {/* 1. Header & Status Section */}
                    <div className="flex flex-col items-center text-center gap-4 animate-fade-in">
                        <div className="size-20 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-2 shadow-sm ring-1 ring-orange-100 dark:ring-orange-800">
                            <span className="material-symbols-outlined text-5xl text-orange-500">hourglass_top</span>
                        </div>
                        <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight max-w-2xl">
                            Cadastro Recebido! Nossa equipe já está acelerando.
                        </h1>
                        <p className="text-[#4c739a] dark:text-slate-400 text-base md:text-lg font-normal leading-normal max-w-xl">
                            Validamos seus dados em até 24 horas. Fique atento ao seu e-mail para novidades.
                        </p>
                        {/* Status Stepper */}
                        <div className="w-full max-w-2xl mt-6">
                            <div className="relative flex items-center justify-between w-full">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded"></div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 bg-gradient-to-r from-green-500 to-orange-400 -z-10 rounded"></div>
                                {/* Step 1 */}
                                <div className="flex flex-col items-center gap-2 bg-[#f6f7f8] dark:bg-[#101922] px-2">
                                    <div className="size-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm ring-4 ring-[#f6f7f8] dark:ring-[#101922]">
                                        <span className="material-symbols-outlined text-lg">check</span>
                                    </div>
                                    <span className="text-xs font-bold text-green-600 dark:text-green-400">Enviado</span>
                                </div>
                                {/* Step 2 */}
                                <div className="flex flex-col items-center gap-2 bg-[#f6f7f8] dark:bg-[#101922] px-2">
                                    <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/40 border-2 border-orange-500 flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-md ring-4 ring-[#f6f7f8] dark:ring-[#101922] animate-pulse">
                                        <span className="material-symbols-outlined text-xl">manage_search</span>
                                    </div>
                                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">Em Análise</span>
                                </div>
                                {/* Step 3 */}
                                <div className="flex flex-col items-center gap-2 bg-[#f6f7f8] dark:bg-[#101922] px-2">
                                    <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 shadow-sm ring-4 ring-[#f6f7f8] dark:ring-[#101922]">
                                        <span className="material-symbols-outlined text-lg">verified</span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">Aprovação</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 2. Wait Bonus Card (Education) */}
                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-slate-700 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <div className="flex flex-col md:flex-row">
                            {/* Thumbnail Side */}
                            <div className="md:w-5/12 relative aspect-video md:aspect-auto bg-slate-900 overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" data-alt="Abstract driving instructor teaching in a car cockpit" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYkl1vU5Omely1d_R-W1X0NWgRoZ6adyrHXf6eeNp2zyAMfYQd3ufUZdLXvGPgWdQwfZH8t-RmWTkN4EYErTVxyLyev_76u-FeKqv0X8ObQz10qb8OLB7lTnQkqFW4aTPxrpD7-uoe6YxOOoF5QQy6yqeKAAj4byFRaLq5qNnqAjQ6xM0SLq-Zisw_EJQTaKW1cdiy3rg3fNWET3NNDzwkAYvfk6b0QqEeVjL2ai-ohC0EWqYPVnpvAI53OjxL2UbCEo1b1TRz_lT1")' }}>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:bg-[#137fec] group-hover:border-[#137fec] transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                                    05:00
                                </div>
                            </div>
                            {/* Content Side */}
                            <div className="flex-1 p-6 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-[#137fec]/10 text-[#137fec] text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Bônus Exclusivo</span>
                                </div>
                                <h3 className="text-[#0d141b] dark:text-white text-xl font-bold leading-tight mb-2">
                                    Enquanto você espera... Comece a lucrar mais.
                                </h3>
                                <p className="text-[#4c739a] dark:text-slate-400 text-sm mb-6 leading-relaxed">
                                    Descubra em nossa aula secreta como instrutores de elite lotam a agenda antes mesmo de começar a divulgar.
                                </p>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-700 pt-4 mt-auto">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-[#137fec]">school</span>
                                        <span className="text-sm font-medium">Aula Secreta: Agenda Lotada</span>
                                    </div>
                                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#137fec] hover:bg-[#137fec]/90 text-white font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm shadow-[#137fec]/30">
                                        <span className="material-symbols-outlined text-lg">play_circle</span>
                                        <span>Assistir Agora</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 3. Viral Loop Widget */}
                    <div className="relative bg-white dark:bg-[#1a2632] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 sm:p-8 text-center overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 bg-green-50 dark:bg-green-900/10 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 size-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                <span className="material-symbols-outlined text-base">bolt</span>
                                Acelere sua aprovação
                            </div>
                            <h3 className="text-[#0d141b] dark:text-white text-2xl font-bold">
                                Quer furar a fila da análise?
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                                Indique um amigo instrutor agora e moveremos sua ficha automaticamente para o <strong className="text-[#0d141b] dark:text-white font-semibold">topo da pilha</strong> de prioridade.
                            </p>
                            <button className="mt-2 w-full sm:w-auto min-w-[300px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-6 rounded-lg shadow-md shadow-green-200 dark:shadow-none flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5">
                                {/* WhatsApp SVG Icon */}
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                <span>Indicar Amigo e Priorizar Meu Cadastro</span>
                            </button>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                                Promoção válida por tempo limitado.
                            </p>
                        </div>
                    </div>
                    {/* 4. Community Footer */}
                    <div className="flex flex-col items-center gap-4 py-6 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-[#0d141b] dark:text-white font-medium text-lg text-center">
                            Não fique dirigindo sozinho. Entre para a elite.
                        </p>
                        <button className="group flex items-center gap-2 text-[#137fec] hover:text-[#137fec]/80 font-bold transition-colors">
                            <span className="bg-[#137fec]/10 p-2 rounded-full group-hover:bg-[#137fec]/20 transition-colors">
                                <span className="material-symbols-outlined text-xl">groups</span>
                            </span>
                            <span>Entrar no Grupo VIP de Instrutores</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
