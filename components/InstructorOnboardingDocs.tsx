"use client";
import React from 'react';
import Link from 'next/link';

export default function InstructorOnboardingDocs() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] min-h-screen flex flex-col font-display text-[#0d141b] dark:text-gray-100 transition-colors duration-200">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1e2936] border-b border-[#e7edf3] dark:border-[#2d3b4a] px-6 py-3 shadow-sm">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-[#137fec]">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_6_535)">
                                    <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_6_535"><rect fill="white" height="48" width="48"></rect></clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight">Onboarding Instrutor</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">help</span>
                        </button>
                        <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
                        </button>
                        <div className="ml-2 flex items-center gap-3 pl-3 border-l border-[#e7edf3] dark:border-[#2d3b4a]">
                            <div className="h-8 w-8 rounded-full bg-[#137fec]/20 flex items-center justify-center text-[#137fec] font-bold text-xs overflow-hidden">
                                <img alt="Avatar do usuário" className="w-full h-full object-cover" data-alt="Avatar de um homem jovem sorrindo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbd2kmf4nVSYkexafjOs9R_5c2-Hc9l2MK6UAGqfab6E1SB2cwBsFrKh8K4UdskKfWn7m-etGUrMVwEP8oh2ezjwIuMEsE7afxMpe8kY0fu4TcUYnEV_BpmrOPmJ_Vrnbmc442Y4C5Yi7oAzg35nSLRZ1InjbCf1XaOACMUwf2CSYvBwtfEvA5piQBmhddDyU5kQGhBiBLoAGnh8E6-nwyhq5zoopj81bzSjYS3LhgcsWy1yg7-llYyORAbytaeSuzHmJmzNnxVdBe" />
                            </div>
                            <span className="text-sm font-medium hidden sm:block">Roberto Silva</span>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Layout */}
            <main className="flex-1 w-full max-w-[960px] mx-auto p-6 md:p-10 flex flex-col gap-8">
                {/* Progress Bar Section */}
                <section className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[#137fec] text-sm font-semibold uppercase tracking-wide">Etapa 2 de 4</p>
                            <h2 className="text-xl font-bold mt-1 dark:text-white">Documentação e Credenciais</h2>
                        </div>
                        <span className="text-sm font-medium text-[#4c739a] dark:text-gray-400">50% Completo</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#e7edf3] dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#137fec] rounded-full transition-all duration-500 ease-out" style={{ width: '50%' }}></div>
                    </div>
                </section>
                {/* Content Card */}
                <div className="bg-white dark:bg-[#1e2936] rounded-xl shadow-sm border border-[#e7edf3] dark:border-[#2d3b4a] overflow-hidden">
                    {/* Page Heading inside Card */}
                    <div className="p-8 pb-4 border-b border-[#e7edf3] dark:border-[#2d3b4a]">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white">Valide sua Permissão de Trabalho</h3>
                            <p className="text-[#4c739a] dark:text-gray-400 text-sm md:text-base max-w-2xl">
                                Precisamos confirmar seu cadastro junto ao DETRAN para ativar seu perfil de instrutor. Seus dados são mantidos em segurança e validados automaticamente.
                            </p>
                        </div>
                    </div>
                    {/* Form Section */}
                    <form className="p-8 flex flex-col gap-8">
                        {/* Personal Docs Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">CPF</span>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">badge</span>
                                    <input className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal" placeholder="000.000.000-00" type="text" />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Número do Registro DETRAN (CFI)</span>
                                    <span className="material-symbols-outlined text-gray-400 text-[16px] cursor-help" title="Cadastro de Formação de Instrutores">help</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">assignment_ind</span>
                                    <input className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal" placeholder="Ex: 123456" type="text" />
                                </div>
                                <p className="text-xs text-[#4c739a] dark:text-gray-500">Número localizado no verso da sua credencial.</p>
                            </label>
                        </div>
                        {/* CNH Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <label className="flex flex-col gap-2 md:col-span-5">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Número da CNH</span>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">directions_car</span>
                                    <input className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal" placeholder="12345678900" type="text" />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 md:col-span-3">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Categoria</span>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-8 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium appearance-none">
                                        <option disabled selected value="">Selecione</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 md:col-span-4">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Estado de Emissão (UF)</span>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-8 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium appearance-none">
                                        <option disabled selected value="">Estado</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        {/* More states would go here */}
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                                </div>
                            </label>
                        </div>
                        {/* Upload Section */}
                        <div className="flex flex-col gap-4 mt-2">
                            <h4 className="text-base font-semibold text-[#0d141b] dark:text-white">Comprovantes Digitais</h4>
                            <div className="border-2 border-dashed border-[#137fec]/30 dark:border-[#137fec]/20 bg-[#137fec]/5 dark:bg-[#137fec]/10 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 transition-colors hover:bg-[#137fec]/10 dark:hover:bg-[#137fec]/20 hover:border-[#137fec]/50 cursor-pointer group">
                                <div className="size-14 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[#137fec] text-3xl">cloud_upload</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[#0d141b] dark:text-white font-medium">Clique para enviar ou arraste e solte</p>
                                    <p className="text-[#4c739a] dark:text-gray-400 text-sm">Foto da Credencial de Instrutor e Documento do Veículo (CRLV)</p>
                                </div>
                                <p className="text-xs text-[#4c739a]/70 dark:text-gray-500 mt-2">PDF, JPG ou PNG até 5MB</p>
                            </div>
                            {/* Uploaded Files List */}
                            <div className="flex flex-col gap-3">
                                {/* File Item 1 */}
                                <div className="flex items-center justify-between p-3 rounded-lg border border-[#e7edf3] dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="size-10 rounded bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[#137fec] text-xl">description</span>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <p className="text-sm font-medium text-[#0d141b] dark:text-white truncate">cnh-frente-verso-2024.pdf</p>
                                            <p className="text-xs text-[#4c739a] dark:text-gray-400">1.2 MB • Enviado com sucesso</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" type="button">
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                                {/* File Item 2 (Processing) */}
                                <div className="flex items-center justify-between p-3 rounded-lg border border-[#e7edf3] dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm opacity-80">
                                    <div className="flex items-center gap-3 overflow-hidden w-full">
                                        <div className="size-10 rounded bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">image</span>
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-1 mr-4">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-sm font-medium text-[#0d141b] dark:text-white truncate">crlv-veiculo.jpg</p>
                                                <span className="text-xs font-medium text-[#137fec]">85%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#137fec] rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-[#0d141b] transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-700" type="button">
                                        <span className="material-symbols-outlined text-xl">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Footer Actions */}
                        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 mt-2 border-t border-[#e7edf3] dark:border-[#2d3b4a]">
                            <Link href="/instructor" className="w-full md:w-auto px-6 py-3 rounded-lg text-[#0d141b] dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Voltar
                            </Link>
                            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                                <div className="flex items-center gap-2 text-xs text-[#4c739a] dark:text-gray-500">
                                    <span className="material-symbols-outlined text-base">lock</span>
                                    <span className="whitespace-nowrap">Dados criptografados de ponta a ponta</span>
                                </div>
                                <Link href="/instructor/onboarding/profile" className="w-full md:w-auto px-8 py-3 rounded-lg bg-[#137fec] hover:bg-[#0f65bd] text-white font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                                    Salvar e Continuar
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
                {/* Bottom Help */}
                <div className="text-center pb-10">
                    <p className="text-sm text-[#4c739a] dark:text-gray-500">
                        Está tendo problemas com a documentação? <a className="text-[#137fec] hover:underline font-medium" href="#">Fale com nosso suporte</a>
                    </p>
                </div>
            </main>
        </div>
    );
}
