"use client";
import React from 'react';

interface SearchEmptyStateProps {
    city: string;
}

export default function SearchEmptyState({ city }: SearchEmptyStateProps) {
    return (
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#101922] flex items-center justify-center p-6 lg:p-12 font-sans">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="flex flex-col text-center lg:text-left order-2 lg:order-1">
                    <div className="relative w-full aspect-[16/9] lg:aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl flex items-center justify-center overflow-hidden mb-8 border border-blue-100 dark:border-slate-700 shadow-sm group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <div className="relative z-10 transform transition-transform duration-700 group-hover:scale-105">
                            <div className="relative">
                                <span className="material-symbols-outlined text-[120px] lg:text-[180px] text-[#137fec] drop-shadow-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                                <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border-2 border-green-500 animate-bounce">
                                    <span className="material-symbols-outlined text-4xl text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/50 dark:from-slate-900/50 to-transparent"></div>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                        Uau! <br />
                        <span className="text-[#137fec]">Você é rápido demais!</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        O Dirijo.ai está desembarcando na sua região nas próximas semanas. A demanda está alta e estamos credenciando os melhores instrutores agora.
                    </p>
                </div>
                <div className="flex flex-col gap-6 order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-700 p-6 lg:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                            OFERTA LIMITADA
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-[#137fec]">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Entre na Lista VIP</h3>
                                <p className="text-sm text-green-600 dark:text-green-400 font-bold">Ganhe R$ 50,00 na 1ª aula</p>
                            </div>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Seu melhor WhatsApp</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-xl">chat</span>
                                    </div>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] text-slate-900 dark:text-white placeholder-slate-400 transition-shadow"
                                        placeholder="(00) 00000-0000"
                                        type="tel"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bairro de preferência</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-xl">home_pin</span>
                                    </div>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] text-slate-900 dark:text-white placeholder-slate-400 transition-shadow"
                                        placeholder="Ex: Centro"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <button className="w-full bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-[#137fec]/20 transition-all hover:-translate-y-0.5 mt-2" type="button">
                                QUERO MEU CUPOM DE R$ 50
                            </button>
                        </form>
                        <p className="text-center text-xs text-slate-400 mt-4">Prometemos não enviar spam. Apenas seu cupom.</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 p-5 flex flex-col sm:flex-row items-center gap-4">
                        <div className="size-16 bg-white dark:bg-slate-700 rounded-lg shadow-sm flex items-center justify-center shrink-0 text-slate-400 dark:text-slate-300">
                            <span className="material-symbols-outlined text-4xl">menu_book</span>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Enquanto a gente não chega...</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Não perca tempo. Domine a teoria com o <strong className="text-[#137fec]">Manual Anti-Reprovação</strong>.</p>
                            <div className="flex items-center justify-center sm:justify-between gap-3 flex-wrap">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">R$ 19,90</span>
                                <button className="text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-3 py-2 rounded hover:opacity-90 transition-opacity uppercase tracking-wide">
                                    Baixar Agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
