"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingPage() {
    const router = useRouter();
    const [locationInput, setLocationInput] = useState("");
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState("");

    useEffect(() => {
        if ("geolocation" in navigator) {
            setIsLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    if (data.address) {
                        const city = data.address.city || data.address.town || data.address.village || "";
                        const state = data.address.state || "";
                        // Ensure we have valid parts before joining
                        const formattedParams = [city, state].filter(Boolean).join(" - ");
                        setLocationInput(formattedParams);
                    }
                } catch (error) {
                    console.error("Error fetching location", error);
                } finally {
                    setIsLoadingLocation(false);
                }
            }, (error) => {
                // Log detailed error for debugging, but don't crash
                console.warn("Geolocation access failed or was blocked:", {
                    code: error.code,
                    message: error.message,
                });
                setLocationError("Não foi possível detectar sua localização.");
                setIsLoadingLocation(false);
            });
        }
    }, []);
    const handleSearch = () => {
        if (locationInput.trim()) {
            router.push(`/search?q=${encodeURIComponent(locationInput)}`);
        } else {
            // Visual feedback for empty input
            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (input) input.focus();
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-brand-accent selection:text-brand-dark">
            <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-cta text-white p-1 rounded-lg">
                            <span className="material-symbols-outlined text-3xl">local_taxi</span>
                        </div>
                        <h2 className="text-brand-dark text-2xl font-black tracking-tighter uppercase italic">
                            Dirijo<span className="text-brand-cta">.ai</span>
                        </h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#como-funciona" className="text-sm font-bold text-slate-600 hover:text-brand-cta uppercase tracking-wide transition-colors">
                            Como Funciona
                        </a>
                        <a href="#depoimentos" className="text-sm font-bold text-slate-600 hover:text-brand-cta uppercase tracking-wide transition-colors">
                            Depoimentos
                        </a>
                        <div className="flex gap-3 ml-4">
                            <Link href="/instructor" className="text-sm font-bold text-slate-700 hover:text-brand-dark px-4 py-2">
                                Sou Instrutor
                            </Link>
                            <button className="bg-brand-dark text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-slate-800 transition-all shadow-lg">
                                Entrar
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-hero-pattern bg-cover bg-center opacity-90"></div>
                    {/* Overlay gradient for better text readability if needed */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/40"></div>

                    <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <span className="material-symbols-outlined text-brand-accent text-sm">verified</span>
                                <span className="text-sm font-bold tracking-wide uppercase">O App nº1 para Instrutores e Alunos</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                Liberdade para <span className="text-brand-accent">Ensinar</span>.<br />
                                Segurança para <span className="text-brand-cta">Aprender</span>.
                            </h1>
                            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl">
                                Conectamos alunos que querem aprender a dirigir com os melhores instrutores particulares do Brasil. Sem burocracia, 100% seguro.
                            </p>

                            <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-lg flex flex-col md:flex-row gap-2">
                                <div className="flex-1 relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                                    <input
                                        type="text"
                                        placeholder={isLoadingLocation ? "Detectando localização..." : (locationError ? "Digite sua cidade manually" : "Onde você quer ter aula?")}
                                        value={locationInput}
                                        onChange={(e) => setLocationInput(e.target.value)}
                                        className={`w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-cta text-slate-900 font-medium placeholder:text-slate-400 ${locationError ? 'placeholder:text-red-400' : ''}`}
                                    />
                                    {isLoadingLocation && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-brand-cta border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                </div>
                                <button onClick={handleSearch} className="h-14 px-8 bg-brand-cta hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 group">
                                    <span>Encontrar Agora</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-300">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-brand-cta">check_circle</span>
                                    <span>Instrutores Verificados</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-brand-cta">check_circle</span>
                                    <span>Pagamento Seguro</span>
                                </div>
                            </div>
                        </div>
                        {/* Hero Image/Visual could go here */}
                        <div className="hidden lg:block relative">
                            {/* Abstract or UI Mockup placeholder */}
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-cta/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </section>

                {/* Problem/Solution Section */}
                <section id="como-funciona" className="py-24 bg-slate-50">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Pare de perder tempo (e dinheiro) com o jeito antigo.</h2>
                            <p className="text-lg text-slate-600">A autoescola tradicional é cara, burocrática e lenta. O Dirijo.ai é o oposto.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-600">
                                    <span className="material-symbols-outlined text-3xl">money_off</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Chega de Taxas Abusivas</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Instrutores independentes cobram até 40% menos porque não têm os custos fixos de uma autoescola.
                                </p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-brand-accent text-brand-dark text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Recomendado</div>
                                <div className="w-16 h-16 bg-brand-accent/20 rounded-2xl flex items-center justify-center mb-6 text-brand-dark">
                                    <span className="material-symbols-outlined text-3xl">schedule</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Sua Agenda, Suas Regras</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Agende aulas pelo app, escolha o instrutor que mais combina com você e remarque se precisar. Sem drama.
                                </p>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                    <span className="material-symbols-outlined text-3xl">security</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Segurança Total</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Instrutores verificados, pagamentos via plataforma e rastreamento das aulas. Você no controle.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Strip */}
                <section className="py-20 bg-brand-dark text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Pronto para assumir o volante da sua vida?</h2>
                            <p className="text-slate-300 text-lg">Junte-se a milhares de alunos que conquistaram a CNH e a liberdade de dirigir.</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={handleSearch} className="h-14 px-8 bg-brand-accent hover:bg-amber-400 text-brand-dark font-black rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 whitespace-nowrap">
                                Quero Minha Vaga
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* FAQ / Trust Section */}
                <section id="depoimentos" className="py-24 bg-white">
                    <div className="max-w-[1000px] mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Perguntas Frequentes</h2>
                        </div>
                        <div className="grid gap-6">
                            <details className="group bg-slate-50 p-6 rounded-2xl border border-slate-100 open:ring-2 open:ring-brand-cta/20 pb-4">
                                <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-slate-900">
                                    Como funcionam os pagamentos?
                                    <span className="transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                                </summary>
                                <p className="text-slate-600 mt-4 leading-relaxed">
                                    Você paga pela plataforma (Pix ou Cartão) e o valor fica retido até a aula acontecer. Se algo der errado, seu dinheiro é devolvido automaticamente.
                                </p>
                            </details>
                            <details className="group bg-slate-50 p-6 rounded-2xl border border-slate-100 open:ring-2 open:ring-brand-cta/20 pb-4">
                                <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-slate-900">
                                    Os instrutores são qualificados?
                                    <span className="transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                                </summary>
                                <p className="text-slate-600 mt-4 leading-relaxed">
                                    Sim. Todos os instrutores passam por uma verificação rigorosa de antecedentes criminais, CNH e credenciamento no Detran (CFC).
                                </p>
                            </details>
                            <details className="group bg-slate-50 p-6 rounded-2xl border border-slate-100 open:ring-2 open:ring-brand-cta/20 pb-4">
                                <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-slate-900">
                                    Posso escolher o carro?
                                    <span className="transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                                </summary>
                                <p className="text-slate-600 mt-4 leading-relaxed">
                                    Sim! No perfil de cada instrutor você vê o modelo do carro, ano, se tem ar-condicionado e direção hidráulica.
                                </p>
                            </details>
                        </div>
                    </div>
                </section>

                <footer className="bg-slate-900 py-12 text-slate-400 border-t border-slate-800">
                    <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-slate-800 text-white p-1 rounded-lg">
                                <span className="material-symbols-outlined text-2xl">local_taxi</span>
                            </div>
                            <span className="text-white font-bold text-xl tracking-tighter italic">Dirijo.ai</span>
                        </div>
                        <div className="flex gap-6 text-sm font-medium">
                            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                            <a href="#" className="hover:text-white transition-colors">Contato</a>
                        </div>
                        <p className="text-xs">© 2024 Dirijo Tecnologia Ltda.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
