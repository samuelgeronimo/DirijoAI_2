"use client";
import React from 'react';
import Link from 'next/link';

export default function InstructorOnboardingSchedule() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 font-display transition-colors duration-200">
            <style jsx>{`
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #137fec;
                    cursor: pointer;
                    margin-top: -8px; 
                    box-shadow: 0 0 2px rgba(0,0,0,0.2);
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 4px;
                    cursor: pointer;
                    background: #cfdbe7;
                    border-radius: 2px;
                }
                .dark input[type=range]::-webkit-slider-runnable-track {
                    background: #334155;
                }
            `}</style>
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
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
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#e7edf3] dark:border-slate-700" data-alt="Instructor profile picture showing a smiling professional" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChGFgsrxnLXdNUXiR-IRos9bOQEJNNUSIIDUt9MiDfo0dGD16UBrcdso3SInxc9sdTT8yqpPnJ5vfetBMh0i_PKrebH0-qLjANY90T7vkaqmx_ntn6UWUu3G3fRvxHZhZpeYGc5GyDTOdlczde5PtskNtwoEebKr9NQa1ZKNMY-SWEvjBf8hkfhBMEGAJVF9PD06ptxj8lztS1RqhN_f9HLu8nlZuw-e3mpR1ZLOwpdaICc_r2mh6zYtuXxXoLw3KJvp8M88WJ_IXf")' }}>
                        </div>
                    </div>
                </header>
                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
                        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-8">
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-6 justify-between items-end">
                                    <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Etapa 4 de 4: Disponibilidade e Preços</p>
                                    <p className="text-[#137fec] text-sm font-bold leading-normal">100%</p>
                                </div>
                                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                                    <div className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-out" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Defina sua Agenda e Valores</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Configure horários e defina preços diferenciados para finais de semana ou picos.</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 flex flex-col gap-6">
                                    <div className="flex flex-col rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                                        <div className="px-6 py-4 border-b border-[#e7edf3] dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between md:items-center">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">Agenda Semanal</h3>
                                                <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2.5 py-1 text-xs font-bold text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20">
                                                    44h Abertas
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button className="text-sm text-[#137fec] font-medium hover:underline flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-base">date_range</span>
                                                    Configurar Preços por Período
                                                </button>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse min-w-[600px]">
                                                <thead>
                                                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-[#e7edf3] dark:border-slate-800">
                                                        <th className="px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 w-1/4">Dia</th>
                                                        <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 w-[15%]">Início</th>
                                                        <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 w-[15%]">Fim</th>
                                                        <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 w-[30%]">Valor/Hora</th>
                                                        <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 text-right w-[15%]"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                                <span className="text-sm font-medium text-[#0d141b] dark:text-white">Segunda-feira</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="08:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="18:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative w-full">
                                                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">R$</span>
                                                                    <input className="block w-full rounded-md border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-7 py-1.5 text-sm text-slate-500 font-medium focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" disabled type="text" defaultValue="85,00" />
                                                                </div>
                                                                <button className="text-slate-400 hover:text-[#137fec] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Configurações de Preço">
                                                                    <span className="material-symbols-outlined text-xl">local_offer</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <button className="p-2 text-slate-400 hover:text-[#137fec] transition-colors rounded-full hover:bg-[#137fec]/10">
                                                                <span className="material-symbols-outlined text-xl">add_circle</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                                <span className="text-sm font-medium text-[#0d141b] dark:text-white">Terça-feira</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="08:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="18:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative w-full">
                                                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">R$</span>
                                                                    <input className="block w-full rounded-md border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-7 py-1.5 text-sm text-slate-500 font-medium focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" disabled type="text" defaultValue="85,00" />
                                                                </div>
                                                                <button className="text-slate-400 hover:text-[#137fec] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Configurações de Preço">
                                                                    <span className="material-symbols-outlined text-xl">local_offer</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <button className="p-2 text-slate-400 hover:text-[#137fec] transition-colors rounded-full hover:bg-[#137fec]/10">
                                                                <span className="material-symbols-outlined text-xl">add_circle</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                                <span className="text-sm font-medium text-[#0d141b] dark:text-white">Quarta-feira</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="08:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="18:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative w-full">
                                                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">R$</span>
                                                                    <input className="block w-full rounded-md border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-7 py-1.5 text-sm text-slate-500 font-medium focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" disabled type="text" defaultValue="85,00" />
                                                                </div>
                                                                <button className="text-slate-400 hover:text-[#137fec] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Configurações de Preço">
                                                                    <span className="material-symbols-outlined text-xl">local_offer</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <button className="p-2 text-slate-400 hover:text-[#137fec] transition-colors rounded-full hover:bg-[#137fec]/10">
                                                                <span className="material-symbols-outlined text-xl">add_circle</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                                <span className="text-sm font-medium text-[#0d141b] dark:text-white">Quinta-feira</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="08:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="18:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative w-full">
                                                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">R$</span>
                                                                    <input className="block w-full rounded-md border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-7 py-1.5 text-sm text-slate-500 font-medium focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" disabled type="text" defaultValue="85,00" />
                                                                </div>
                                                                <button className="text-slate-400 hover:text-[#137fec] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Configurações de Preço">
                                                                    <span className="material-symbols-outlined text-xl">local_offer</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <button className="p-2 text-slate-400 hover:text-[#137fec] transition-colors rounded-full hover:bg-[#137fec]/10">
                                                                <span className="material-symbols-outlined text-xl">add_circle</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                                <span className="text-sm font-medium text-[#0d141b] dark:text-white">Sexta-feira</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="08:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" type="time" defaultValue="17:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative w-full">
                                                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">R$</span>
                                                                    <input className="block w-full rounded-md border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-7 py-1.5 text-sm text-slate-500 font-medium focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" disabled type="text" defaultValue="85,00" />
                                                                </div>
                                                                <button className="text-slate-400 hover:text-[#137fec] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Configurações de Preço">
                                                                    <span className="material-symbols-outlined text-xl">local_offer</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <button className="p-2 text-slate-400 hover:text-[#137fec] transition-colors rounded-full hover:bg-[#137fec]/10">
                                                                <span className="material-symbols-outlined text-xl">add_circle</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className="group bg-orange-50/50 dark:bg-orange-900/10 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <input defaultChecked className="h-5 w-5 rounded border-orange-400 text-orange-600 focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                                <span className="text-sm font-bold text-[#0d141b] dark:text-white">Sábado</span>
                                                                <span className="text-[10px] uppercase font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/40 px-1.5 py-0.5 rounded">Extra</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm" type="time" defaultValue="09:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <input className="block w-full rounded-lg border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm" type="time" defaultValue="13:00" />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative w-full">
                                                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-orange-600 font-bold text-xs">R$</span>
                                                                    <input className="block w-full rounded-md border-orange-300 dark:border-orange-700 bg-white dark:bg-slate-900 pl-7 py-1.5 text-sm text-orange-700 dark:text-orange-400 font-bold shadow-sm focus:border-orange-500 focus:ring-orange-500" type="text" defaultValue="110,00" />
                                                                </div>
                                                                <button className="text-orange-500 hover:text-orange-700 transition-colors p-1 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/40" title="Configurações de Preço">
                                                                    <span className="material-symbols-outlined text-xl">local_offer</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30">
                                                                <span className="material-symbols-outlined text-xl">delete</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className="group opacity-60 hover:opacity-100 transition-opacity">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <input className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Domingo</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4" colSpan={2}>
                                                            <span className="text-sm text-slate-400 italic">Indisponível</span>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <span className="text-sm text-slate-400">-</span>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-[#0d141b] dark:text-white">
                                            <span className="material-symbols-outlined text-[#137fec]">payments</span>
                                            <h3 className="text-lg font-bold">Valor Base da Aula</h3>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Preço padrão por hora (50 min)</label>
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-lg">R$</span>
                                                </div>
                                                <input className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-12 py-4 text-3xl font-bold text-[#0d141b] dark:text-white placeholder:text-slate-300 focus:border-[#137fec] focus:ring-[#137fec]" id="price" name="price" placeholder="0,00" type="text" defaultValue="85,00" />
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2">Valor médio na sua região: R$ 80 - R$ 100</p>
                                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                                <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                                                    ℹ️ Este é seu valor base. Alunos podem comprar Pacotes de 10 aulas com desconto (seu repasse será ajustado proporcionalmente). Isso garante que o aluno fique com você até o fim.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 flex flex-col gap-5">
                                        <div className="flex items-center justify-between text-[#0d141b] dark:text-white">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[#137fec]">location_on</span>
                                                <h3 className="text-lg font-bold">Área de Atuação</h3>
                                            </div>
                                        </div>
                                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                            <button className="flex-1 py-1.5 px-3 rounded-md bg-white dark:bg-slate-700 shadow-sm text-sm font-medium text-[#0d141b] dark:text-white transition-all">Raio (km)</button>
                                            <button className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#0d141b] dark:hover:text-white transition-all">Bairros</button>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-slate-600 dark:text-slate-300">Distância máxima</span>
                                                <span className="text-sm font-bold text-[#137fec] bg-[#137fec]/10 px-2 py-1 rounded">15 km</span>
                                            </div>
                                            <input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" max="50" min="1" type="range" defaultValue="15" />
                                            <div className="flex justify-between text-xs text-slate-400 px-1">
                                                <span>1km</span>
                                                <span>50km</span>
                                            </div>
                                        </div>
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#e7edf3] dark:border-slate-700 group cursor-pointer">
                                            <div className="absolute inset-0 bg-cover bg-center" data-alt="Map showing a 15km radius circle around the city center of São Paulo" data-location="São Paulo" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZE0f-UduF05K19urh2yD88PNO2C2cBgwCyMin5NgfOhxza-GEagSj6cm9TSJAfhiMN07va-9jvxqFmQpUTJt4hYH--IVQ9-0J12Fiv-IWYHPHbNTZqRWEI6HzIpCGk08FeCBGxcBSJ9ObcmkXoPIjhKGdj-_P1AS52zH-WigVxHIosmy3U3ozRDw-swMOnCk8Ij9LgUkkcGVQSrvqmGQ8E5n2AgBaLCV0FoakkLnSwipKa_iXFk7Zabo5wi1N_TRhP9Y9ddo3SHHa")' }}>
                                            </div>
                                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors"></div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">Expandir mapa</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-[#0d141b] dark:text-white">
                                            <span className="material-symbols-outlined text-[#137fec]">verified</span>
                                            <h3 className="text-lg font-bold">Termos de Qualidade</h3>
                                        </div>
                                        <div className="flex flex-col gap-3 pt-2">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input className="mt-0.5 h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600 transition-colors" required type="checkbox" />
                                                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-[#0d141b] dark:group-hover:text-white transition-colors">
                                                    Comprometo-me a não cancelar aulas em cima da hora (sujeito a multa)
                                                </span>
                                            </label>
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input className="mt-0.5 h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600 transition-colors" required type="checkbox" />
                                                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-[#0d141b] dark:group-hover:text-white transition-colors">
                                                    Aceito utilizar o Manual Anti-Reprovação Dirijo.ai como guia nas minhas aulas.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#e7edf3] dark:border-slate-800">
                                <Link href="/instructor/onboarding/success" className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-center">
                                    Voltar
                                </Link>
                                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                    <span className="text-sm text-slate-500 dark:text-slate-400 hidden lg:block">Total estimado: <strong className="text-[#0d141b] dark:text-white">44h semanais</strong></span>
                                    {/* Finalizing navigation to a 'dashboard' or just '#' for now since it is the end of flow */}
                                    <Link href="/instructor/onboarding/confirmation" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#137fec] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                                        <span>Finalizar e Ativar Perfil</span>
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
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
