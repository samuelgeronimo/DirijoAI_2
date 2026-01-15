"use client";
import React from 'react';
import Link from 'next/link';

export default function InstructorOnboardingProfile() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-gray-100 font-display transition-colors duration-200">
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
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#e7edf3] dark:border-slate-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChGFgsrxnLXdNUXiR-IRos9bOQEJNNUSIIDUt9MiDfo0dGD16UBrcdso3SInxc9sdTT8yqpPnJ5vfetBMh0i_PKrebH0-qLjANY90T7vkaqmx_ntn6UWUu3G3fRvxHZhZpeYGc5GyDTOdlczde5PtskNtwoEebKr9NQa1ZKNMY-SWEvjBf8hkfhBMEGAJVF9PD06ptxj8lztS1RqhN_f9HLu8nlZuw-e3mpR1ZLOwpdaICc_r2mh6zYtuXxXoLw3KJvp8M88WJ_IXf")' }}>
                        </div>
                    </div>
                </header>
                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
                        <div className="layout-content-container flex flex-col max-w-[1100px] flex-1 gap-8">
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-6 justify-between items-end">
                                    <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Etapa 3 de 4: Perfil e Veículo</p>
                                    <p className="text-[#137fec] text-sm font-bold leading-normal">75%</p>
                                </div>
                                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                                    <div className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-out" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Destaque seu Perfil</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Conte suas experiências e mostre ao aluno o conforto do seu veículo.</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 flex flex-col gap-6">
                                    <div className="rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1e2936] shadow-sm p-6 flex flex-col gap-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-[#137fec]">person</span>
                                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">Sobre mim</h3>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex flex-col items-center gap-3 min-w-[120px]">
                                                <div className="relative size-28 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors">
                                                    <input accept="image/*" aria-label="Upload de foto de perfil" className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                                                    <div className="flex flex-col items-center text-slate-400 group-hover:text-[#137fec] transition-colors">
                                                        <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                                                        <span className="text-[10px] uppercase font-bold mt-1">Foto</span>
                                                    </div>
                                                </div>
                                                <button className="text-xs font-bold text-[#137fec] hover:text-blue-600 hover:underline" type="button">Alterar foto</button>
                                            </div>
                                            <div className="flex-1 w-full">
                                                <label className="sr-only" htmlFor="bio">Biografia</label>
                                                <textarea className="block w-full h-full min-h-[120px] rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm placeholder:text-slate-400 p-3" id="bio" placeholder="Olá! Sou instrutor há 5 anos, focado em direção defensiva. Gosto de ensinar com paciência..." rows={4}></textarea>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-right">0/500 caracteres</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1e2936] shadow-sm p-6 flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#137fec]">stars</span>
                                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">Seus Superpoderes <span className="text-sm font-normal text-slate-500 ml-1">(Selecione até 3)</span></h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <label className="cursor-pointer group">
                                                <input defaultChecked className="peer hidden" type="checkbox" />
                                                <div className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-all peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/10 peer-checked:text-[#137fec] hover:border-[#137fec]/50">
                                                    🛡️ Paciência Zero
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group">
                                                <input defaultChecked className="peer hidden" type="checkbox" />
                                                <div className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-all peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/10 peer-checked:text-[#137fec] hover:border-[#137fec]/50">
                                                    🎯 Rei da Baliza
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group">
                                                <input className="peer hidden" type="checkbox" />
                                                <div className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-all peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/10 peer-checked:text-[#137fec] hover:border-[#137fec]/50">
                                                    🧠 Psicólogo
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group">
                                                <input defaultChecked className="peer hidden" type="checkbox" />
                                                <div className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-all peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/10 peer-checked:text-[#137fec] hover:border-[#137fec]/50">
                                                    🛣️ Rodovia
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group">
                                                <input className="peer hidden" type="checkbox" />
                                                <div className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-all peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/10 peer-checked:text-[#137fec] hover:border-[#137fec]/50">
                                                    ⚡ Intensivão
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1e2936] shadow-sm p-6 flex flex-col gap-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-[#137fec]">directions_car</span>
                                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">Dados do Veículo</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="car-model">Modelo</label>
                                                <input className="rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" id="car-model" placeholder="Ex: HB20" type="text" />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="car-year">Ano</label>
                                                <input className="rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" id="car-year" placeholder="Ex: 2021" type="text" />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="car-plate">Placa</label>
                                                <input className="rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] shadow-sm" id="car-plate" placeholder="Ex: ABC-1234" type="text" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Equipamentos e Conforto:</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                                    <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">❄️ Ar Condicionado</span>
                                                </label>
                                                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                                    <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">💪 Direção Elétrica/Hidráulica</span>
                                                </label>
                                                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                                    <input className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">🛑 Freio/Embreagem Dupla</span>
                                                </label>
                                                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                                    <input defaultChecked className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">📹 Câmera de Ré / Sensor</span>
                                                </label>
                                                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                                    <input className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600" type="checkbox" />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">⚙️ Câmbio Automático</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-2">
                                            <label className="block text-sm font-medium text-[#0d141b] dark:text-white mb-2">
                                                Foto do Interior do Veículo <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-6 py-10 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                                <div className="text-center">
                                                    <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-[#137fec] transition-colors">add_a_photo</span>
                                                    <div className="mt-4 flex text-sm leading-6 text-slate-600 dark:text-slate-400 justify-center">
                                                        <span className="relative cursor-pointer rounded-md font-semibold text-[#137fec] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#137fec] focus-within:ring-offset-2 hover:text-blue-500">
                                                            <span>Faça o upload da imagem</span>
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Mostre o painel e a limpeza do veículo.</p>
                                                    <p className="text-xs leading-5 text-slate-400">PNG, JPG até 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="sticky top-24">
                                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Pré-visualização do Aluno</h3>
                                        <div className="rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1e2936] shadow-lg overflow-hidden flex flex-col">
                                            <div className="h-24 bg-gradient-to-r from-blue-500 to-[#137fec] relative"></div>
                                            <div className="px-6 pb-6 -mt-10 flex flex-col gap-4">
                                                <div className="flex justify-between items-end">
                                                    <div className="size-20 rounded-full border-4 border-white dark:border-slate-900 bg-center bg-cover shadow-sm bg-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChGFgsrxnLXdNUXiR-IRos9bOQEJNNUSIIDUt9MiDfo0dGD16UBrcdso3SInxc9sdTT8yqpPnJ5vfetBMh0i_PKrebH0-qLjANY90T7vkaqmx_ntn6UWUu3G3fRvxHZhZpeYGc5GyDTOdlczde5PtskNtwoEebKr9NQa1ZKNMY-SWEvjBf8hkfhBMEGAJVF9PD06ptxj8lztS1RqhN_f9HLu8nlZuw-e3mpR1ZLOwpdaICc_r2mh6zYtuXxXoLw3KJvp8M88WJ_IXf")' }}></div>
                                                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                                                        <span className="material-symbols-outlined text-sm">verified</span>
                                                        Credenciado
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-[#0d141b] dark:text-white">Roberto Silva</h4>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Instrutor Categoria B</p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-md border border-blue-100 dark:border-blue-800">
                                                        🛡️ Paciência Zero
                                                    </span>
                                                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-md border border-blue-100 dark:border-blue-800">
                                                        🎯 Rei da Baliza
                                                    </span>
                                                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-md border border-blue-100 dark:border-blue-800">
                                                        🛣️ Rodovia
                                                    </span>
                                                </div>
                                                <hr className="border-slate-100 dark:border-slate-800" />
                                                <div className="flex flex-col gap-3">
                                                    <p className="text-xs font-bold text-slate-400 uppercase">Destaques do Veículo</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-500 italic">HB20 • 2021</p>
                                                    <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                                                        <li className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                                            ❄️ Ar Condicionado
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                                            💪 Direção Elétrica
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                                            📹 Sensor/Câmera
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3 border-t border-slate-100 dark:border-slate-800 text-center">
                                                <span className="text-xs text-slate-400">Esta é a visão do seu futuro aluno</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#e7edf3] dark:border-[#2d3b4a]">
                                <Link href="/instructor/onboarding/documents" className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-center">
                                    Voltar
                                </Link>
                                <Link href="/instructor/onboarding/video" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#137fec] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                                    <span>Continuar para Agenda</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
