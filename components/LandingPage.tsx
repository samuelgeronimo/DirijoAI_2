"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import HeroSection from '@/components/landing/HeroSection';
import LandingHeader from '@/components/landing/LandingHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import dynamic from 'next/dynamic';

const AuthModal = dynamic(() => import('@/components/auth/AuthModal'), {
    ssr: false,
    loading: () => null
});

export default function LandingPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-brand-accent selection:text-brand-dark">
            <LandingHeader />

            <main className="">
                <HeroSection />

                {/* Problem/Solution Section */}
                {/* Problem/Solution Section (The Villain) */}
                <section id="como-funciona" className="py-24 bg-slate-50">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-red-600 font-bold uppercase tracking-wider text-sm mb-2 block">Cuidado</span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">A "Máfia das Autoescolas" quer que você reprove.</h2>
                            <p className="text-lg text-slate-600">Eles lucram com a sua insegurança e com o "quebra". Chega de ser tratado como gado.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* The Villain Side */}
                            <ScrollReveal animation="slide-right" delay={200} className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 opacity-80 hover:opacity-100 transition-opacity">
                                <h3 className="text-xl font-bold mb-6 text-red-600 flex items-center gap-2">
                                    <span className="material-symbols-outlined">cancel</span>
                                    O Jeito Antigo (Eles)
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-400 mt-1">close</span>
                                        <p className="text-slate-600"><strong>Lucram com a reprovação:</strong> Quanto mais você falha, mais eles ganham.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-400 mt-1">close</span>
                                        <p className="text-slate-600"><strong>Aulas Coletivas Disfarçadas:</strong> Colocam 3 alunos no carro e você só dirige 15 minutos.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-400 mt-1">close</span>
                                        <p className="text-slate-600"><strong>Carros Caindo aos Pedaços:</strong> Embreagem dura, ar que não gela e cheiro de cigarro.</p>
                                    </li>
                                </ul>
                            </ScrollReveal>

                            {/* The Hero Side */}
                            <ScrollReveal animation="slide-left" delay={400} className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-brand-cta relative transform lg:scale-105">
                                <div className="absolute -top-4 -right-4 bg-brand-cta text-white font-bold px-4 py-1 rounded-full text-sm shadow-lg">
                                    A Escolha Inteligente
                                </div>
                                <h3 className="text-xl font-bold mb-6 text-brand-dark flex items-center gap-2">
                                    <span className="material-symbols-outlined text-brand-cta">check_circle</span>
                                    O Jeito Dirijo.ai (Você)
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-brand-cta mt-1">check</span>
                                        <p className="text-slate-600"><strong>Foco na Aprovação:</strong> Instrutores avaliados por alunos como você.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-brand-cta mt-1">check</span>
                                        <p className="text-slate-600"><strong>100% Prático e Individual:</strong> O tempo é todo seu. Sem "carona" pra outros alunos.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-brand-cta mt-1">check</span>
                                        <p className="text-slate-600"><strong>Carros Impecáveis:</strong> Escolha o modelo, veja fotos e exija ar-condicionado.</p>
                                    </li>
                                </ul>
                            </ScrollReveal>
                        </div>

                        {/* 3 Step Plan (Donald Miller) */}
                        <div className="mt-24">
                            <h3 className="text-2xl font-black text-center text-slate-900 mb-12">Assuma a direção em 3 passos simples</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
                                <ScrollReveal animation="fade-up" delay={0} className="relative">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📍</div>
                                    <h4 className="font-bold text-lg mb-2 text-slate-900">1. Busque sua Liberdade</h4>
                                    <p className="text-slate-600">Digite seu endereço e veja os instrutores "Top Gun" perto de você.</p>
                                </ScrollReveal>
                                <ScrollReveal animation="fade-up" delay={200} className="relative">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⭐</div>
                                    <h4 className="font-bold text-lg mb-2 text-slate-900">2. Escolha seu Mentor</h4>
                                    <p className="text-slate-600">Compare preços, carros e veja avaliações reais sem filtro.</p>
                                </ScrollReveal>
                                <ScrollReveal animation="fade-up" delay={400} className="relative">
                                    <div className="w-16 h-16 bg-brand-cta/20 text-brand-cta rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                                    <h4 className="font-bold text-lg mb-2 text-slate-900">3. Domine a Pista</h4>
                                    <p className="text-slate-600">Agende em 1 clique e prepare-se para rasgar a CNH provisória.</p>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Strip */}
                <section className="py-20 bg-brand-dark text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <ScrollReveal animation="fade-up" className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Pronto para assumir o volante da sua vida?</h2>
                            <p className="text-slate-300 text-lg">Junte-se a milhares de alunos que conquistaram a CNH e a liberdade de dirigir.</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/search" className="h-14 px-8 bg-brand-accent hover:bg-amber-400 text-brand-dark font-black rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 whitespace-nowrap">
                                Quero Minha Vaga
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </ScrollReveal>
                </section>

                {/* FAQ / Trust Section */}
                {/* Wall of Love (TikTok Style) */}
                <section id="depoimentos" className="py-24 bg-white overflow-hidden">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <ScrollReveal animation="fade-up" className="text-center mb-16">
                            <span className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm uppercase mb-4 inline-block">Wall of Love</span>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Eles passaram de primeira. <br />Agora é sua vez.</h2>
                        </ScrollReveal>

                        {/* Video Scroll Container */}
                        <ScrollReveal animation="fade-in" delay={200} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide items-start">
                            {/* Video Card 1 */}
                            <div className="w-[240px] md:w-[280px] aspect-[9/16] bg-slate-900 rounded-2xl relative shrink-0 snap-center shadow-2xl group overflow-hidden cursor-pointer">
                                <Image
                                    src="https://images.unsplash.com/photo-1549488497-29367858c89b?q=80&w=1974&auto=format&fit=crop"
                                    alt="Estudante aprovada comemorando"
                                    fill
                                    priority
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 300px"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                                        <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white font-bold text-lg leading-tight">"Achei que nunca ia conseguir fazer baliza!"</p>
                                    <p className="text-slate-300 text-sm mt-2">@juliapassou</p>
                                </div>
                            </div>

                            {/* Video Card 2 */}
                            <div className="w-[240px] md:w-[280px] aspect-[9/16] bg-slate-900 rounded-2xl relative shrink-0 snap-center shadow-2xl group overflow-hidden cursor-pointer">
                                <Image
                                    src="https://images.unsplash.com/photo-1625579930776-8c4c79426f49?q=80&w=1935&auto=format&fit=crop"
                                    alt="Student License"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 240px, 280px"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                                        <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white font-bold text-lg leading-tight">"O instrutor Pedro salvou minha CNH."</p>
                                    <p className="text-slate-300 text-sm mt-2">@lucas.silva</p>
                                </div>
                            </div>

                            {/* Video Card 3 */}
                            <div className="w-[240px] md:w-[280px] aspect-[9/16] bg-slate-900 rounded-2xl relative shrink-0 snap-center shadow-2xl group overflow-hidden cursor-pointer">
                                <Image
                                    src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop"
                                    alt="Student Celebration"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 240px, 280px"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                                        <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white font-bold text-lg leading-tight">"Economizei R$ 500 fazendo aulas avulsas."</p>
                                    <p className="text-slate-300 text-sm mt-2">@mariana_drive</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" className="max-w-[800px] mx-auto mt-16 text-center">
                            <h3 className="text-xl font-bold mb-8">Dúvidas? Sem enrolação:</h3>
                            <div className="text-left bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <details className="group pb-4 border-b border-slate-200 last:border-0 last:pb-0 mb-4 last:mb-0">
                                    <summary className="flex justify-between items-center font-bold text-slate-900 cursor-pointer">
                                        Se eu não gostar do instrutor, perco meu dinheiro?
                                        <span className="block transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                                    </summary>
                                    <p className="text-slate-600 mt-2 text-sm">Não. Se você não curtir a primeira aula, nós devolvemos 100% do valor e ainda pagamos seu Uber pra casa. O risco é todo nosso.</p>
                                </details>
                                <details className="group pb-4 border-b border-slate-200 last:border-0 last:pb-0 mb-4 last:mb-0">
                                    <summary className="flex justify-between items-center font-bold text-slate-900 cursor-pointer">
                                        Os instrutores são credenciados?
                                        <span className="block transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                                    </summary>
                                    <p className="text-slate-600 mt-2 text-sm">Sim. Só aceitamos instrutores com "Selo Elite", que têm CFC ativo, antecedentes criminais limpos e carro verificado.</p>
                                </details>
                            </div>
                        </ScrollReveal>
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

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </div>
    );
}
