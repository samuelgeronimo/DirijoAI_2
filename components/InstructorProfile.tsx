"use client";
import React from 'react';
import Link from 'next/link';

export default function InstructorProfile() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 transition-colors duration-200 pb-24 font-sans">
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] dark:border-b-slate-700 bg-white dark:bg-[#101922] px-10 py-3 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#137fec]">
                            <div className="size-6">
                                <span className="material-symbols-outlined text-3xl">directions_car</span>
                            </div>
                            <h2 className="text-[#0d141b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">DireçãoPro</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-9">
                            <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-[#137fec]" href="#">Instrutores</a>
                            <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-[#137fec]" href="#">Como Funciona</a>
                            <a className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-[#137fec]" href="#">Minhas Aulas</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-[#4c739a] flex border-none bg-[#e7edf3] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg" data-icon="MagnifyingGlass">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-[#e7edf3] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:ring-0 h-full placeholder:text-[#4c739a] px-4 rounded-r-lg text-sm" placeholder="Buscar instrutor ou cidade" />
                            </div>
                        </label>
                        <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold">
                            <span>Meu Perfil</span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#137fec]/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC85I0ZNoESrVXwJUS50eM4kIhGYrt2GGsomR5zhADYKBVur4GPcEcvQOmyqpKJj2AfEQ3y-KXO6TeLjbkziBj_xKUWgA08p9wXpr0xiGNudH-k5HjfeWEphuKEFHRP4lUqMdQgtP75eZ9mjDeDAH_LNDoSdZBSz1YhdrGz9VGS01zwjhuMg3r8QKh20MgzIOqk5ztWA8DLhkc1urx4DjaF2S_pIr2zTdraVBm0OcDEAc_s4ZNcti95GcVNLzxLxegs1tIXNEh6O7y4")' }}></div>
                    </div>
                </header>
                <main className="flex flex-1 justify-center py-8">
                    <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6 md:px-10">
                        <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-full lg:w-[480px] shrink-0">
                                <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg group cursor-pointer border-4 border-white dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity group-hover:opacity-75" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbuUkCPsp_x_JGjQoBGMqsHQuokGgoOG2f1EUodgUGkRJ98RfLo-41MKjh-FE4vewkZL203QWs-uc0ZtYzmuYYi-0fEm0MfgHDoJra9KexLwX4-LT_BB9EzZpv3kBn_rmDunRwhYYzEwpXKBVTYJp7ff54VjCksYftij8Iw4Zqw-lyYrw2zojSQ5SRE2rxuKsC9Jzq5ykWkoPRlLKmbLVhrzP3H4psJwXfTrLlrC7gl_n72d9jpxOwdU0_rDAo8wrfLGa8cN8yT0Ny")' }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="size-20 bg-[#137fec]/90 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(19,127,236,0.6)] group-hover:scale-110 transition-transform duration-300 animate-pulse">
                                            <span className="material-symbols-outlined text-5xl ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                        <p className="text-white font-bold text-sm flex items-center gap-2">
                                            <span className="material-symbols-outlined text-red-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>videocam</span>
                                            Assista: Como perdi o medo e passei de 1ª
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                                <div className="flex flex-col gap-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Disponível Hoje</span>
                                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                                            <span className="material-symbols-outlined text-sm">location_on</span> São Paulo, SP
                                        </span>
                                    </div>
                                    <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-bold tracking-tight">Carlos Oliveira</h1>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#137fec] text-xl" title="Instrutor Verificado">verified</span>
                                        <p className="text-[#137fec] font-bold text-lg">Instrutor Credenciado DETRAN - Categoria B</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 pr-4">
                                        <div className="flex text-yellow-400 text-lg">
                                            {[1, 2, 3, 4].map(star => (
                                                <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            ))}
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">4.9 (128 avaliações)</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-[#0d141b] dark:text-white">+500</span>
                                        <p className="text-xs text-slate-500 font-medium">Alunos Aprovados</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="flex-1 min-w-[160px] flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#137fec] text-white text-base font-bold shadow-lg shadow-[#137fec]/30 hover:bg-[#137fec]/90 transition-all hover:-translate-y-0.5">
                                        <span>Ver Horários Livres</span>
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-4 border-2 border-slate-200 dark:border-slate-700 text-[#0d141b] dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined text-lg">favorite</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[#0d141b] dark:text-white text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                    Mural da Aprovação
                                </h3>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Últimos Aprovados</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkCFfBFG99wmS4K89Crsn1KhtCkxmnXSdzcn64zXhCMSo-6eVOz6lNUNVpElbjgtSb9EAJr_oXpg6wunVB6sVhFlaB5zRGsaNk9V4mZ5uUW2QYqS5b4wLBeUK2rsJOyW9-DDcomJBHm3hlJBdvheFc6hhN5dzYEJybk2zVOuGPoQIH6_BCkcvHRJ_n9e2HaqQtXDsqsJO9I1-zxPenxKoUf0gEyzQ2zdSdLm9cSrRClYLQfwp-EJH5QA4fICfsMO4HNZH4Ruu0ccYn")' }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <p className="font-bold text-sm">Mariana C.</p>
                                        <div className="inline-flex items-center gap-1 bg-green-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                            <span className="material-symbols-outlined text-[12px]">check_circle</span> Passou de 1ª
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMHBgV3GbjDnKMge98mdWKzzByUycM2PHETZSv2IpMNFVNDX4i6JVTxREbHNPVnTQmKe3wq_c7mvwZeXFGTt4YnM-Lq4Mg0ed9unr-A2J921Y_IeWH23cj2fY869puuOuTYUMEPUxO5aG-EHzEQF7X34nOWsSEDNSd4bIQmLoZP73kEmtfK0HIcVnoZNVEQNBXNOSzNY2U_3_4l9kEmAE1Z2Fd3c8i4N8iCwocfuUln-U8nqd7EuSr7FrGTolJszj19AbY6K_UcwgY")' }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <p className="font-bold text-sm">Rodrigo M.</p>
                                        <div className="inline-flex items-center gap-1 bg-blue-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                            <span className="material-symbols-outlined text-[12px]">timer</span> 30 dias de aula
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md hidden md:block">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADnxtkMhcF9bzx6J-Tf-4SIGtDvMcUzeN4d5T5OjunMuDElH2KT2v8OQ4JD4AQLeSnr5kySaVg1_pbeFwuyaa3YG4l_XS7rF0_R_wrmU61TPJq6-hB1VJs15yQmDtpiEiq4__73upHRcHJl3p_DJh4LcAIuIvOz5YDsa0UH9oWmSzorWsS5mRdmUg3iqhbGNlprPzGyZhVndGPVCetVhrbOGpe4iiTy38WpPJYisyrOPNEW_Ws-iYlgOj6EY_l9ZmKaNvpccDkdWFC")' }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <p className="font-bold text-sm">Felipe S.</p>
                                        <div className="inline-flex items-center gap-1 bg-green-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                            <span className="material-symbols-outlined text-[12px]">check_circle</span> Passou de 1ª
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md hidden md:block">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsQ9TDz5ACfe9SDTYQntSQOWUcjLrbO5gyRqM-CS9G85p3AI2gDl6HXkNDk4PXMX6ieV0qT_VZ97qoGOOVWimFNkDGqgj0Eoq5VqiZn4pb0kEAG_VIE-5-E4d9rm-aWP2T1bj_l6qYCvtR79VbFbFcih025veuKS_u4Ipb0fhyMCqmXEt3kBEhQeG3FE4v7oAM2Jva-plaMFwHiypg_Xnn6i4plkDK3JJx3HBDOl6MM87C6AyXp5TyjJ--liyCLHnTB1JXP26oIgTD")' }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <p className="font-bold text-sm">Carla B.</p>
                                        <div className="inline-flex items-center gap-1 bg-purple-500/90 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                                            <span className="material-symbols-outlined text-[12px]">psychology</span> Perdeu o medo
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer shadow-md hidden lg:block">
                                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                                        <p className="text-[#137fec] font-bold text-sm">+400 outros</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                <div className="border-b border-slate-200 dark:border-slate-800">
                                    <div className="flex gap-8">
                                        <a className="flex flex-col items-center border-b-[3px] border-[#137fec] text-[#137fec] pb-3 pt-2" href="#">
                                            <span className="text-sm font-bold tracking-wide">SOBRE</span>
                                        </a>
                                        <a className="flex flex-col items-center border-b-[3px] border-transparent text-[#4c739a] hover:text-[#137fec] pb-3 pt-2" href="#">
                                            <span className="text-sm font-bold tracking-wide">VEÍCULO</span>
                                        </a>
                                        <a className="flex flex-col items-center border-b-[3px] border-transparent text-[#4c739a] hover:text-[#137fec] pb-3 pt-2" href="#">
                                            <span className="text-sm font-bold tracking-wide">AVALIAÇÕES</span>
                                        </a>
                                    </div>
                                </div>
                                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-[#0d141b] dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#137fec]">person</span>
                                        Bio &amp; Diferenciais
                                    </h3>
                                    <div className="mb-6">
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                                            Transformo pessoas ansiosas em motoristas confiantes em tempo recorde.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                                <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Especialista em Fobias:</strong> Técnicas comprovadas de PNL para perder o medo do trânsito.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                                <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Simulação de Exame:</strong> Treino prático nas rotas oficiais do DETRAN.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                                <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Domínio da Embreagem:</strong> Nunca mais deixe o carro morrer na subida.</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border border-blue-100 dark:border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm text-[#137fec] group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-3xl">menu_book</span>
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h4 className="font-bold text-[#0d141b] dark:text-white text-base">Método Manual Anti-Reprovação</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 mb-2">Exclusivo para alunos: O guia de bolso para eliminar os 5 erros que mais reprovam na prova prática.</p>
                                                <a className="text-[#137fec] text-sm font-bold hover:underline flex items-center justify-center sm:justify-start gap-1" href="#">
                                                    Saiba mais <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                                        <div className="flex items-center gap-3 p-3 bg-[#137fec]/5 rounded-lg border border-[#137fec]/10">
                                            <span className="material-symbols-outlined text-[#137fec]">verified_user</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Credencial DETRAN 2024</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-[#137fec]/5 rounded-lg border border-[#137fec]/10">
                                            <span className="material-symbols-outlined text-[#137fec]">school</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pedagogia do Trânsito</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-[#137fec]/5 rounded-lg border border-[#137fec]/10">
                                            <span className="material-symbols-outlined text-[#137fec]">history</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">92% de Aprovação</span>
                                        </div>
                                    </div>
                                </section>
                                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-[#0d141b] dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#137fec]">directions_car</span>
                                        Galeria do Veículo
                                    </h3>
                                    <p className="text-[#4c739a] text-sm mb-4">Volkswagen Polo 2023 - Completo (Direção Elétrica, Ar-condicionado, Airbags)</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden group cursor-pointer">
                                            <div className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsQ9TDz5ACfe9SDTYQntSQOWUcjLrbO5gyRqM-CS9G85p3AI2gDl6HXkNDk4PXMX6ieV0qT_VZ97qoGOOVWimFNkDGqgj0Eoq5VqiZn4pb0kEAG_VIE-5-E4d9rm-aWP2T1bj_l6qYCvtR79VbFbFcih025veuKS_u4Ipb0fhyMCqmXEt3kBEhQeG3FE4v7oAM2Jva-plaMFwHiypg_Xnn6i4plkDK3JJx3HBDOl6MM87C6AyXp5TyjJ--liyCLHnTB1JXP26oIgTD")' }}></div>
                                        </div>
                                        <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden group cursor-pointer">
                                            <div className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADnxtkMhcF9bzx6J-Tf-4SIGtDvMcUzeN4d5T5OjunMuDElH2KT2v8OQ4JD4AQLeSnr5kySaVg1_pbeFwuyaa3YG4l_XS7rF0_R_wrmU61TPJq6-hB1VJs15yQmDtpiEiq4__73upHRcHJl3p_DJh4LcAIuIvOz5YDsa0UH9oWmSzorWsS5mRdmUg3iqhbGNlprPzGyZhVndGPVCetVhrbOGpe4iiTy38WpPJYisyrOPNEW_Ws-iYlgOj6EY_l9ZmKaNvpccDkdWFC")' }}></div>
                                        </div>
                                        <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden group cursor-pointer">
                                            <div className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXB1xg9mQytJ6Jk1glvI5N7uldHtG47tNuipcyi7B5dMY7_qMc5LBiqLFlgdQ8e85tnqTNbjCDwEhnKD-xCOJPsXfXD7dACs_c88GNWyMygk-AnuEUdQePhlsTzxli7yk5ISJr70kHcHGaC8lZk3uSIoeMky9ybs2PPsqYvjH7k3UTIleET5NYTfhbIjSebNTs1BQHSrkcuwemuLf7XQzPKNUMQXQCqabpdEapJzssGILVmbkDdnKevFgNTg0E8VbwXHKtXzDl6vxw")' }}></div>
                                        </div>
                                    </div>
                                </section>
                                <section className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-[#0d141b] dark:text-white text-xl font-bold flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#137fec]">forum</span>
                                            Avaliações de Alunos
                                        </h3>
                                        <button className="text-[#137fec] text-sm font-bold hover:underline">Ver todas</button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between mb-3">
                                                <div className="flex gap-3">
                                                    <div className="size-10 rounded-full bg-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkCFfBFG99wmS4K89Crsn1KhtCkxmnXSdzcn64zXhCMSo-6eVOz6lNUNVpElbjgtSb9EAJr_oXpg6wunVB6sVhFlaB5zRGsaNk9V4mZ5uUW2QYqS5b4wLBeUK2rsJOyW9-DDcomJBHm3hlJBdvheFc6hhN5dzYEJybk2zVOuGPoQIH6_BCkcvHRJ_n9e2HaqQtXDsqsJO9I1-zxPenxKoUf0gEyzQ2zdSdLm9cSrRClYLQfwp-EJH5QA4fICfsMO4HNZH4Ruu0ccYn")', backgroundSize: 'cover' }}></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0d141b] dark:text-white">Mariana Costa</p>
                                                        <p className="text-xs text-[#4c739a]">Aprovada em Junho/2023</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span key={star} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                "O Carlos é extremamente paciente. Eu tinha muito medo de trânsito pesado e hoje dirijo tranquilamente para o trabalho. Recomendo demais!"
                                            </p>
                                        </div>
                                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between mb-3">
                                                <div className="flex gap-3">
                                                    <div className="size-10 rounded-full bg-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMHBgV3GbjDnKMge98mdWKzzByUycM2PHETZSv2IpMNFVNDX4i6JVTxREbHNPVnTQmKe3wq_c7mvwZeXFGTt4YnM-Lq4Mg0ed9unr-A2J921Y_IeWH23cj2fY869puuOuTYUMEPUxO5aG-EHzEQF7X34nOWsSEDNSd4bIQmLoZP73kEmtfK0HIcVnoZNVEQNBXNOSzNY2U_3_4l9kEmAE1Z2Fd3c8i4N8iCwocfuUln-U8nqd7EuSr7FrGTolJszj19AbY6K_UcwgY")', backgroundSize: 'cover' }}></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0d141b] dark:text-white">Rodrigo Mendes</p>
                                                        <p className="text-xs text-[#4c739a]">Habilitado em Agosto/2023</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span key={star} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                "Passei de primeira no exame! O foco dele na baliza foi o diferencial. Carro muito novo e fácil de dirigir."
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="relative">
                                <div className="sticky top-8 flex flex-col gap-4">
                                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800">
                                        <div className="bg-[#137fec] p-4 text-white">
                                            <p className="text-sm font-medium opacity-90 uppercase tracking-wider flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">event_available</span>
                                                Agenda Inteligente
                                            </p>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <p className="text-sm font-bold text-[#0d141b] dark:text-white">Março 2024</p>
                                                    <div className="flex gap-2">
                                                        <button className="material-symbols-outlined text-sm p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">chevron_left</button>
                                                        <button className="material-symbols-outlined text-sm p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">chevron_right</button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
                                                    <span>DOM</span><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span>
                                                </div>
                                                <div className="grid grid-cols-7 gap-1">
                                                    <div className="h-8 flex items-center justify-center text-slate-300 text-xs">25</div>
                                                    <div className="h-8 flex items-center justify-center text-slate-300 text-xs">26</div>
                                                    <div className="h-8 flex items-center justify-center text-slate-300 text-xs">27</div>
                                                    <div className="h-8 flex items-center justify-center text-slate-300 text-xs">28</div>
                                                    <div className="h-8 flex items-center justify-center text-slate-300 text-xs">29</div>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">1</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">2</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium bg-[#137fec] text-white shadow-md shadow-[#137fec]/30">3</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">4</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">5</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">6</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">7</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">8</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">9</button>
                                                    <button className="h-8 flex items-center justify-center rounded-lg text-xs font-medium hover:bg-[#137fec]/10">10</button>
                                                </div>
                                            </div>
                                            <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-xs p-2.5 rounded-lg border border-amber-200 dark:border-amber-800 mb-4 flex items-start gap-2">
                                                <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">timer</span>
                                                <span className="font-medium leading-tight">Alta demanda! Selecione um horário em azul para reservar por 10 min.</span>
                                            </div>
                                            <div className="mb-6">
                                                <p className="text-xs font-bold text-[#4c739a] mb-3 uppercase tracking-wide">Horários para 03/Mar</p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 text-xs font-bold py-2 rounded-lg line-through decoration-slate-400 cursor-not-allowed">08:00 - 09:00</button>
                                                    <button className="border border-[#137fec] bg-[#137fec] text-white shadow-lg shadow-[#137fec]/30 text-xs font-bold py-2 rounded-lg transform hover:scale-105 transition-all ring-2 ring-[#137fec] ring-offset-1 dark:ring-offset-slate-900">09:15 - 10:15</button>
                                                    <button className="border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 text-xs font-bold py-2 rounded-lg line-through decoration-slate-400 cursor-not-allowed">10:30 - 11:30</button>
                                                    <button className="border border-[#137fec] bg-white dark:bg-slate-900 text-[#137fec] text-xs font-bold py-2 rounded-lg hover:bg-[#137fec] hover:text-white transition-colors border-dashed">14:00 - 15:00</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#137fec]/5 dark:bg-slate-900 border border-[#137fec]/20 p-4 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#137fec]">savings</span>
                                            <div>
                                                <p className="text-xs font-bold text-[#137fec] mb-1">Economize no Pacote</p>
                                                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">Feche 10 aulas e pague apenas <strong>R$ 60/aula</strong>. Desconto aplicado no checkout.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-12 mb-16">
                    <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 text-[#137fec] mb-4">
                                <span className="material-symbols-outlined">directions_car</span>
                                <h2 className="text-xl font-bold">DireçãoPro</h2>
                            </div>
                            <p className="text-sm text-slate-500">Conectando futuros motoristas aos melhores instrutores do Brasil desde 2018.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Para Alunos</h4>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li><a className="hover:text-[#137fec]" href="#">Buscar Instrutores</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Minhas Aulas</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Simulado DETRAN</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Para Instrutores</h4>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li><a className="hover:text-[#137fec]" href="#">Cadastrar Perfil</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Gestão de Agenda</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Portal do Parceiro</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Suporte</h4>
                            <ul className="text-sm text-slate-500 space-y-2">
                                <li><a className="hover:text-[#137fec]" href="#">Central de Ajuda</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Termos de Uso</a></li>
                                <li><a className="hover:text-[#137fec]" href="#">Privacidade</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-[100] px-6 py-3">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Melhor preço no pacote</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm text-slate-600 dark:text-slate-300 font-bold">A partir de</span>
                            <span className="text-2xl font-bold text-[#137fec]">R$ 60</span>
                            <span className="text-sm text-slate-500 font-medium">/aula</span>
                        </div>
                    </div>
                    <Link href="/auth" className="bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold text-base py-3 px-8 rounded-lg shadow-lg shadow-[#137fec]/40 transition-all hover:scale-105 flex items-center gap-2">
                        <span>RESERVAR HORÁRIO</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
