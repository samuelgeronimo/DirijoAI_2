import React from 'react';

export default function LandingPage() {
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
                        <a className="text-sm font-bold text-slate-600 hover:text-brand-cta uppercase tracking-wide transition-colors" href="#como-funciona">
                            Como Funciona
                        </a>
                        <a className="text-sm font-bold text-slate-600 hover:text-brand-cta uppercase tracking-wide transition-colors" href="#depoimentos">
                            Depoimentos
                        </a>
                        <div className="flex gap-3 ml-4">
                            <button className="text-sm font-bold text-slate-700 hover:text-brand-dark px-4 py-2">
                                Sou Instrutor
                            </button>
                            <button className="bg-brand-dark text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-slate-800 transition-all shadow-lg">
                                Entrar
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
            <main className="pt-20">
                <section className="relative w-full min-h-[650px] flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-no-repeat bg-fixed px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm animate-pulse">
                            <span className="material-symbols-outlined text-yellow-400 text-sm">warning</span>
                            <span className="text-yellow-400 text-xs md:text-sm font-black uppercase tracking-widest">
                                Atenção: Novas regras para CNH
                            </span>
                        </div>
                        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6 drop-shadow-2xl">
                            A MÁFIA DAS <span className="text-red-500">AUTOESCOLAS</span> CAIU. <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                                A LEI MUDOU.
                            </span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-2xl font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
                            Chega de pagar R$ 3.000,00 e ser reprovado de propósito. Conecte-se diretamente a instrutores independentes,{" "}
                            <strong className="text-white">economize até 70%</strong> e conquiste sua liberdade.
                        </p>
                        <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto transform hover:-translate-y-1 transition-transform duration-300">
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <span className="material-symbols-outlined text-slate-400">location_on</span>
                                    <input
                                        className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 font-medium h-14 focus:outline-none px-2"
                                        placeholder="Digite sua cidade ou bairro..."
                                        type="text"
                                    />
                                </div>
                                <button className="bg-brand-cta hover:bg-green-700 text-white text-lg font-black uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-green-600/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                                    Encontrar Agora
                                    <span className="material-symbols-outlined font-bold">double_arrow</span>
                                </button>
                            </div>
                        </div>
                        <p className="mt-4 text-slate-400 text-sm font-medium">
                            <span className="text-yellow-400">★ 4.9/5</span> baseado em 12.400+ aulas realizadas
                        </p>
                    </div>
                </section>
                <section className="bg-slate-100 py-20 px-6 border-b border-slate-200">
                    <div className="max-w-[1000px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                                Até quando você vai <br />
                                <span className="text-red-600 bg-red-100 px-2">depender de carona?</span>
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                O sistema tradicional foi feito para você falhar e gastar mais. Você se identifica com isso?
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: "attach_money",
                                    title: "Preços Abusivos",
                                    desc: "Pacotes fechados que custam mais de R$ 3.000,00 obrigando você a pagar por aulas que não precisa.",
                                },
                                {
                                    icon: "sentiment_dissatisfied",
                                    title: "Instrutores Impacientes",
                                    desc: "Profissionais cansados que gritam e te deixam nervoso(a) ao volante, travando seu aprendizado.",
                                },
                                {
                                    icon: "schedule",
                                    title: "Agenda Impossível",
                                    desc: "Aulas apenas em horário comercial, obrigando você a faltar no trabalho ou faculdade.",
                                },
                                {
                                    icon: "block",
                                    title: "Reprovação Programada",
                                    desc: 'O famoso "quebra" no exame prático para te forçar a pagar a taxa de remarcação.',
                                },
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-red-500 flex items-start gap-4">
                                    <div className="bg-red-100 text-red-600 min-w-[50px] h-[50px] rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="bg-white py-24 px-6" id="como-funciona">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-brand-cta font-bold uppercase tracking-widest text-sm">O Novo Caminho</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">Sua CNH em 3 Passos Simples</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {[
                                {
                                    color: "blue",
                                    icon: "person_search",
                                    title: "1. Escolha seu Mentor",
                                    desc: "Veja avaliações reais, fotos e perfil. Escolha alguém que combine com seu estilo.",
                                },
                                {
                                    color: "green",
                                    icon: "payments",
                                    title: "2. Agende e Pague Barato",
                                    desc: "Sem intermediários. Pague por aula avulsa ou pacotes promocionais direto no app.",
                                    isCta: true,
                                },
                                {
                                    color: "yellow",
                                    icon: "sports_score",
                                    title: "3. Dirija e Conquiste",
                                    desc: "Aprenda na prática, perca o medo e passe no exame de primeira com nosso método.",
                                },
                            ].map((step, index) => (
                                <div key={index} className="flex flex-col items-center text-center group">
                                    <div
                                        className={`size-24 bg-${step.color}-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-${step.isCta ? "current" : step.color + "-600"
                                            } ${step.isCta ? "group-hover:bg-brand-cta" : ""} transition-colors duration-300 shadow-xl shadow-${step.color}-100`}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-5xl text-${step.isCta ? "brand-cta" : step.color + "-600"
                                                } group-hover:text-white transition-colors`}
                                        >
                                            {step.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-slate-500 font-medium px-4">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-20 px-6 bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-600 rounded-full blur-[120px]"></div>
                    </div>
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="bg-white rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.4)] transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-yellow-400 p-4 text-center">
                                <h3 className="text-slate-900 font-black text-xl md:text-2xl uppercase tracking-widest">
                                    Oferta Exclusiva: Kit Aprovação
                                </h3>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                                <div className="flex-1 space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                                        Tudo o que você precisa para passar de primeira
                                    </h2>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
                                            <span className="text-lg font-medium text-slate-700">Acesso a Instrutores 5 Estrelas</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
                                            <span className="text-lg font-medium text-slate-700">
                                                <strong>Bônus #1:</strong> Manual da Baliza Perfeita (PDF)
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
                                            <span className="text-lg font-medium text-slate-700">
                                                <strong>Bônus #2:</strong> Seguro Aprendiz Grátis durante a aula
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full md:w-auto min-w-[300px] text-center">
                                    <p className="text-slate-500 font-medium mb-1 line-through">De R$ 120,00 (Autoescola)</p>
                                    <p className="text-sm text-slate-500 mb-4">Por apenas</p>
                                    <div className="text-6xl font-black text-slate-900 tracking-tighter mb-2">
                                        <span className="text-2xl align-top mr-1">R$</span>60
                                        <span className="text-2xl text-slate-400">/aula</span>
                                    </div>
                                    <button className="w-full bg-brand-cta hover:bg-green-700 text-white font-black text-lg py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all uppercase animate-bounce mt-4">
                                        Quero Minha Vaga
                                    </button>
                                    <p className="text-xs text-slate-400 mt-3">Promoção válida para as primeiras 50 inscrições do dia.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white py-24 px-6" id="depoimentos">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="max-w-3xl mx-auto bg-green-50 rounded-2xl p-8 border border-green-200 flex flex-col md:flex-row items-center gap-6 mb-20 text-center md:text-left">
                            <div className="size-24 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                                <span className="material-symbols-outlined text-5xl text-green-600">verified_user</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Garantia "Instrutor Compatível"</h3>
                                <p className="text-slate-600 font-medium">
                                    O risco é todo nosso. Se você não gostar da sua primeira aula, nós trocamos seu instrutor gratuitamente
                                    ou devolvemos 100% do seu dinheiro. Sem perguntas.
                                </p>
                            </div>
                        </div>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-slate-900">Quem seguiu o método, aprovou:</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    quote:
                                        "Eu travei na autoescola por 6 meses. Com o instrutor Ricardo do Dirijo.ai, aprendi a baliza em 2 aulas. Tirei a CNH semana passada!",
                                    name: "Mariana S.",
                                    status: "Aprovada",
                                },
                                {
                                    quote:
                                        "Economizei quase R$ 1.500 comparado ao que a autoescola do bairro queria cobrar. A plataforma é muito transparente.",
                                    name: "Pedro H.",
                                    status: "Aprovado",
                                },
                                {
                                    quote:
                                        "O melhor foi poder escolher uma instrutora mulher. Me senti muito mais segura e confiante. Recomendo demais!",
                                    name: "Carla M.",
                                    status: "Aprovada",
                                },
                            ].map((t, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className="material-symbols-outlined fill-current">
                                                star
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-slate-700 mb-6 italic">"{t.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 bg-slate-300 rounded-full overflow-hidden">
                                            <svg
                                                className="w-full h-full text-slate-400"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{t.name}</h4>
                                            <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full">
                                                {t.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="bg-slate-50 py-20 px-6">
                    <div className="max-w-[800px] mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Dúvidas Frequentes</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    question: "Como funciona o pagamento?",
                                    answer:
                                        "Você paga diretamente pela plataforma via Pix ou Cartão de Crédito. O valor só é liberado para o instrutor após a conclusão da aula, garantindo sua segurança.",
                                },
                                {
                                    question: "Os instrutores são credenciados?",
                                    answer:
                                        "Sim. Todos os instrutores na Dirijo.ai passam por uma rigorosa verificação de credenciais junto ao DETRAN e verificação de antecedentes criminais.",
                                },
                                {
                                    question: "Serve para quem tem medo de dirigir?",
                                    answer:
                                        "Com certeza! Temos uma categoria específica de instrutores especializados em psicologia do trânsito e alunos com medo de dirigir.",
                                },
                            ].map((faq, index) => (
                                <details key={index} className="group bg-white rounded-xl shadow-sm border border-slate-200">
                                    <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-slate-800 list-none">
                                        {faq.question}
                                        <span className="transition group-open:rotate-180">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </span>
                                    </summary>
                                    <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed">{faq.answer}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
                <footer className="bg-brand-dark text-white py-16 px-6 border-t border-slate-800">
                    <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-4">SUA CNH ESTÁ TE ESPERANDO</h2>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                                Não deixe para depois a liberdade que você pode conquistar hoje. Milhares de alunos já estão dirigindo.
                            </p>
                            <button className="bg-brand-cta hover:bg-green-700 text-white font-black text-xl px-12 py-5 rounded-full shadow-[0_0_25px_rgba(22,163,74,0.5)] hover:shadow-[0_0_40px_rgba(22,163,74,0.7)] transition-all transform hover:scale-105 uppercase">
                                Quero Começar Agora &gt;&gt;
                            </button>
                        </div>
                        <div className="w-full h-px bg-slate-800 my-8"></div>
                        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
                            <div className="flex items-center gap-2 opacity-70">
                                <span className="material-symbols-outlined text-2xl">local_taxi</span>
                                <span className="font-bold text-xl tracking-tighter">Dirijo.ai</span>
                            </div>
                            <div className="text-sm text-slate-500">
                                © 2024 Dirijo Tecnologia Ltda. Todos os direitos reservados.
                            </div>
                            <div className="flex gap-4">
                                <a className="text-slate-400 hover:text-white transition-colors" href="#">
                                    Termos
                                </a>
                                <a className="text-slate-400 hover:text-white transition-colors" href="#">
                                    Privacidade
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
