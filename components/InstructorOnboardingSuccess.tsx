"use client";
import React from 'react';
import Link from 'next/link';

export default function InstructorOnboardingSuccess() {
    return (
        <div className="font-display bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-white min-h-screen flex flex-col overflow-x-hidden antialiased transition-colors duration-200">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-[#2a3b4d] px-6 py-4 bg-white dark:bg-[#1a2632]">
                <div className="flex items-center gap-4 text-[#0d141b] dark:text-white">
                    <div className="size-6 text-[#137fec] flex items-center justify-center">
                        <span className="material-symbols-outlined">directions_car</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Onboard Instrutores</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">Roberto Silva</span>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white dark:ring-[#1a2632] shadow-sm" data-alt="Portrait of the instructor user" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZpO_X-zdBpR76O9-yup358Ffz4IVmO8GpBv3I4KJ4gIzBWSDbv0aHBcrK_-6qNaW5yKnuRdq7O-M_PILZrmnrAxnY-GKyXAUCFmEsmxpc5C0VRgb8RA0JvJJi3O2Xw2STxN1ARRZLW97VXyR9dpGmytGL0RxyH_qwIsiN-JnuAXSQa8giOQxco6IafItnXMBtB6_lWaPQXHgxI1QqKEkOHH9gaPTCsRCw6kIvgPeu3_kRCJGyLN7N6kJSZDuQUL4VzvLJUvDLiMPa")' }}></div>
                    </div>
                </div>
            </header>
            {/* Main Layout */}
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
                    <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-8">
                        {/* Progress Bar Step */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-6 justify-between items-end">
                                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Etapa 3 de 5</p>
                                <span className="text-[#137fec] text-sm font-bold">60% Concluído</span>
                            </div>
                            <div className="rounded-full bg-[#cfdbe7] dark:bg-slate-700 h-2 w-full overflow-hidden">
                                <div className="h-full rounded-full bg-[#137fec]" style={{ width: '60%' }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-[#4c739a] dark:text-slate-400 text-sm font-normal leading-normal">Perfil Profissional</p>
                                <p className="text-[#4c739a] dark:text-slate-400 text-sm font-normal leading-normal text-right">Próximo: Disponibilidade</p>
                            </div>
                        </div>
                        {/* Page Heading */}
                        <div className="flex flex-col gap-3">
                            <h1 className="text-[#0d141b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                                Seu Histórico de Aprovação
                            </h1>
                            <p className="text-[#4c739a] dark:text-slate-400 text-lg font-normal leading-relaxed max-w-2xl">
                                Mostre suas conquistas! Adicione fotos de ex-alunos com a CNH para ganhar a confiança de novos clientes e construir sua reputação.
                            </p>
                        </div>
                        {/* Gamification Banner */}
                        <div className="flex items-start sm:items-center gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 shadow-sm">
                            <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-200">
                                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                                <div>
                                    <p className="text-emerald-900 dark:text-emerald-100 font-bold text-base">Destaque-se na busca!</p>
                                    <p className="text-emerald-700 dark:text-emerald-300 text-sm">Ótimo! Instrutores com <span className="font-bold">+5 fotos</span> aparecem no topo da busca para novos alunos.</p>
                                </div>
                                <div className="shrink-0 bg-white dark:bg-emerald-950 px-3 py-1 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-100 dark:border-emerald-800">
                                    2/5 fotos adicionadas
                                </div>
                            </div>
                        </div>
                        {/* Main Content Area: Upload & Grid */}
                        <div className="flex flex-col gap-8">
                            {/* Upload Zone (Empty State style) */}
                            <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#cfdbe7] dark:border-slate-600 bg-white dark:bg-[#1a2632] px-6 py-12 transition-all hover:border-[#137fec] hover:bg-slate-50 dark:hover:bg-[#1e2c3a] group cursor-pointer relative overflow-hidden">
                                <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" multiple type="file" />
                                <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#137fec] group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                                </div>
                                <div className="flex max-w-[480px] flex-col items-center gap-2 z-0">
                                    <p className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                                        Arraste suas fotos aqui
                                    </p>
                                    <p className="text-[#4c739a] dark:text-slate-400 text-sm font-normal leading-normal max-w-[480px] text-center">
                                        ou clique para buscar na galeria do seu computador (JPG, PNG)
                                    </p>
                                </div>
                                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#e7edf3] dark:bg-slate-700 text-[#0d141b] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#dbe4ec] dark:hover:bg-slate-600 transition-colors pointer-events-none">
                                    <span className="truncate">Selecionar Arquivos</span>
                                </button>
                            </div>
                            {/* Results Grid */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[#0d141b] dark:text-white text-lg font-bold">Fotos Adicionadas (2)</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Grid Item 1 */}
                                    <div className="flex flex-col gap-3 group">
                                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="bg-white/90 dark:bg-black/70 hover:bg-red-50 text-slate-600 dark:text-slate-200 hover:text-red-600 p-1.5 rounded-lg shadow-sm backdrop-blur-sm transition-colors">
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                            <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Student holding driving license smiling" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1EkfN8vCBn0iBOdJ1tvJRxVrdf2dphxvex9USQjjmc7iflyWepBDDq-AhTDXGJA725WCY0jcY8y6CAL1kkae68tESc3imtOWzdHRug5BxK_Q49rUlPVAEy5i5w9LCWJy93L6UYNjNlUUfr3QSex_9lOtr_kA1N4M38KIvqU5eSNMzjiw9drq6bGHhiQXN_RIVBzVb8mTlY0SRWioouQSil0JLvWx-yZ20umj-ekVuUXQmuhNZ1HabIjyAWDHtBZR_NCn1rGJvVtVW")' }}></div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Nome do Aluno</label>
                                            <div className="relative">
                                                <input className="w-full bg-white dark:bg-[#1a2632] border border-[#cfdbe7] dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-[#0d141b] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all" placeholder="Ex: João da Silva" type="text" defaultValue="Mariana Costa" />
                                                <span className="absolute right-3 top-2.5 text-emerald-500 material-symbols-outlined text-lg">check_circle</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Grid Item 2 */}
                                    <div className="flex flex-col gap-3 group">
                                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="bg-white/90 dark:bg-black/70 hover:bg-red-50 text-slate-600 dark:text-slate-200 hover:text-red-600 p-1.5 rounded-lg shadow-sm backdrop-blur-sm transition-colors">
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                            <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Happy young man showing thumb up after passing driving test" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2X-vxw0ePNxDVaEG6QOP5WGU6s0WCtQr2QGFJ4cJDMsQJGsIFswKMOdFLzbt14s-cScRl0rI-quK5M_T1rTUxkk-WgTqC9ixilE5P1eiaLyT9x8IEk83JH_1LcVM3n-kOlZIocED4cGiHp_Rv16WJzowItdDVyPXMqCx2-9Rse1-uBrdUDY0RjNWtfPwKRNCMzf_8fxNl_rE2JVtPoplGEmSwHy89XO4lcGeAF1kSQucsZAgE1NumdWFs_INUfey11oQ1rp91o-ik")' }}></div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Nome do Aluno</label>
                                            <input className="w-full bg-white dark:bg-[#1a2632] border border-[#cfdbe7] dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-[#0d141b] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all" placeholder="Ex: João da Silva" type="text" />
                                        </div>
                                    </div>
                                    {/* Grid Item 3 (Placeholder / Ghost) */}
                                    <div className="flex flex-col gap-3 opacity-50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 items-center justify-center min-h-[280px]">
                                        <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                            <span className="material-symbols-outlined">image</span>
                                        </div>
                                        <p className="text-sm text-slate-400 text-center">Espaço reservado para<br />próxima foto</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Footer Actions */}
                        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#e7edf3] dark:border-[#2a3b4d] mt-4 mb-12">
                            <Link href="/instructor/onboarding/video" className="w-full sm:w-auto h-12 px-8 rounded-lg border-2 border-[#e7edf3] dark:border-slate-600 bg-transparent text-[#0d141b] dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">arrow_back</span>
                                Voltar
                            </Link>
                            <Link href="/instructor/onboarding/schedule" className="w-full sm:w-auto h-12 px-8 rounded-lg bg-[#137fec] text-white text-base font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group">
                                Continuar para Agenda
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
