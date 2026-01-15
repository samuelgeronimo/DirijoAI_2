"use client";
import React from 'react';
import Link from 'next/link';

export default function InstructorOnboardingVideo() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 font-display transition-colors duration-200">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-[#2d3b4a] bg-white dark:bg-[#1e2936] px-6 lg:px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="size-8 flex items-center justify-center text-[#137fec]">
                            <span className="material-symbols-outlined text-3xl">directions_car</span>
                        </div>
                        <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Instrutor Pro</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <div className="hidden md:flex items-center gap-9">
                            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Ajuda</a>
                            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Sair</a>
                        </div>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#e7edf3] dark:border-slate-700" data-alt="Instructor profile picture" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChGFgsrxnLXdNUXiR-IRos9bOQEJNNUSIIDUt9MiDfo0dGD16UBrcdso3SInxc9sdTT8yqpPnJ5vfetBMh0i_PKrebH0-qLjANY90T7vkaqmx_ntn6UWUu3G3fRvxHZhZpeYGc5GyDTOdlczde5PtskNtwoEebKr9NQa1ZKNMY-SWEvjBf8hkfhBMEGAJVF9PD06ptxj8lztS1RqhN_f9HLu8nlZuw-e3mpR1ZLOwpdaICc_r2mh6zYtuXxXoLw3KJvp8M88WJ_IXf")' }}>
                        </div>
                    </div>
                </header>
                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
                        <div className="layout-content-container flex flex-col max-w-3xl flex-1 gap-12">
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-6 justify-between items-end">
                                    <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Etapa 4 de 4: Vídeo de Apresentação</p>
                                    <p className="text-[#137fec] text-sm font-bold leading-normal">95%</p>
                                </div>
                                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                                    <div className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-out" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center gap-10">
                                <div className="flex flex-col gap-4 max-w-xl mx-auto">
                                    <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                                        Venda 3x mais com um vídeo
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed">
                                        Pesquisas mostram que alunos preferem instrutores com vídeos de apresentação. Isso transmite confiança e profissionalismo.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                    <button className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white dark:bg-[#1e2936] border-2 border-[#e7edf3] dark:border-slate-800 hover:border-[#137fec]/50 dark:hover:border-[#137fec]/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md">
                                        <div className="size-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 transition-transform group-hover:scale-110">
                                            <span className="material-symbols-outlined text-4xl">videocam</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xl font-bold text-[#0d141b] dark:text-white">Gravar Vídeo Agora</span>
                                            <span className="text-sm text-slate-500 dark:text-slate-400">Use a câmera do seu dispositivo</span>
                                        </div>
                                    </button>
                                    <button className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-transparent border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#137fec] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-300">
                                        <div className="size-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#137fec] transition-transform group-hover:scale-110">
                                            <span className="material-symbols-outlined text-4xl">upload_file</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xl font-bold text-[#0d141b] dark:text-white">Enviar da Galeria</span>
                                            <span className="text-sm text-slate-500 dark:text-slate-400">Carregue um arquivo pronto</span>
                                        </div>
                                    </button>
                                </div>
                                <div className="w-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start text-left shadow-sm">
                                    <div className="shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/40 p-3 text-amber-600 dark:text-amber-400">
                                        <span className="material-symbols-outlined text-3xl">lightbulb</span>
                                    </div>
                                    <div className="flex flex-col gap-3 flex-1">
                                        <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm uppercase tracking-wide flex items-center gap-2">
                                            Não sabe o que dizer? Use nosso roteiro:
                                        </h4>
                                        <div className="relative">
                                            <span className="absolute -top-2 -left-2 text-4xl text-amber-200 dark:text-amber-800/50 font-serif leading-none">“</span>
                                            <p className="text-slate-800 dark:text-slate-200 text-lg md:text-xl font-medium leading-relaxed font-body relative z-10 pl-2">
                                                Olá, sou <span className="bg-amber-200/50 dark:bg-amber-700/50 px-1 rounded">[Nome]</span>. Meu carro tem ar condicionado e tenho muita paciência para te ensinar a fazer baliza sem medo. Agende seu horário!
                                            </p>
                                            <span className="absolute -bottom-4 right-0 text-4xl text-amber-200 dark:text-amber-800/50 font-serif leading-none">”</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-6 w-full pt-4">
                                    <Link href="/instructor/onboarding/success" className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-xl bg-[#137fec] text-white font-bold text-lg hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95">
                                        <span>Continuar</span>
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </Link>
                                    <Link href="/instructor/onboarding/success" className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors underline decoration-transparent hover:decoration-slate-400 underline-offset-4">
                                        Pular esta etapa (Não recomendado)
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
