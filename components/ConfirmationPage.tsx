"use client";
import { createClient } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ConfirmationPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order_number');
    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const instructorName = searchParams.get('instructor_name');

    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        async function fetchProfile() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('full_name')
                    .eq('id', user.id)
                    .single();

                if (data?.full_name) {
                    setFirstName(data.full_name.split(' ')[0]);
                }
            }
        }
        fetchProfile();
    }, []);


    const fmtDate = (d: string) => {
        const [y, m, day] = d.split('-');
        return `${day}/${m}/${y}`;
    }

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-white font-display overflow-x-hidden transition-colors duration-200 relative flex h-auto min-h-screen w-full flex-col">
            <header className="w-full border-b border-solid border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1a2632]">
                <div className="px-4 lg:px-40 flex justify-center py-3">
                    <div className="flex max-w-[960px] flex-1 items-center justify-between">
                        <div className="flex items-center gap-4 text-[#0d141b] dark:text-white">
                            <div className="size-8 flex items-center justify-center bg-[#137fec] rounded-lg text-white">
                                <span className="material-symbols-outlined text-[20px]">directions_car</span>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Instrutores Brasil</h2>
                        </div>
                        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                            <div className="flex items-center gap-9">
                                <Link className="text-[#0d141b] dark:text-slate-200 text-sm font-medium leading-normal hover:text-[#137fec] transition-colors" href="/student/dashboard">Minhas Aulas</Link>
                                <a className="text-[#0d141b] dark:text-slate-200 text-sm font-medium leading-normal hover:text-[#137fec] transition-colors" href="#">Ajuda</a>
                            </div>
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-slate-100 dark:border-slate-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANRo3rFKLi7gauEbXGQOZu-cmJKYAoNW3o_Pjjybdhupx5xO7Cqz0I10PlBVslSQkB32RNjTC0tybQhlrNBl6ENmPsbDJyNa3iiS0swUDn5vpQebVv8oTtrFpapmYgkUbTiPBOL2e70M-0en0iMFj5BUVv4LHGQHu2xnK1KTZuB-r4KZNrDeCp05nPou5KsIFSqDiz4rMnKBhUj-IYhg1iRaNSvpacvcv7xx9CIumGCnoitus-GjJdVGHGBMO_UHRVGa_7COIruR8A")' }}></div>
                        </div>
                        <div className="md:hidden text-[#0d141b] dark:text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-10">
                <div className="flex flex-col max-w-[600px] w-full gap-8">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-green-100 dark:bg-green-900/20 rounded-full animate-ping opacity-75"></div>
                            <div className="relative bg-green-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl">check</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[#0d141b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                                Tudo certo, {firstName || 'Motorista'}!
                            </h1>
                            <p className="text-green-600 dark:text-green-400 text-lg font-semibold leading-normal">
                                Pagamento Confirmado!
                            </p>
                            {orderNumber && (
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                                    Pedido #{orderNumber}
                                </p>
                            )}
                        </div>
                    </div>

                    {dateParam && timeParam && (
                        <div className="bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex flex-col items-center justify-center bg-[#137fec]/10 rounded-lg p-4 min-w-[100px] text-[#137fec]">
                                <span className="material-symbols-outlined text-3xl mb-1">event_available</span>
                                <span className="text-xs font-bold uppercase tracking-wide">Agendado</span>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-1">
                                    1ª Aula Confirmada
                                </h3>
                                <div className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                                    <p>Sua primeira aula prática já está reservada.</p>
                                    {instructorName && (
                                        <p className="font-semibold text-[#137fec] mt-1">
                                            Instrutor: {instructorName}
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-500 mt-1 italic">
                                        * Combine o local de encontro diretamente pelo chat.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                    <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                                        {fmtDate(dateParam)}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <span className="material-symbols-outlined text-lg">schedule</span>
                                        {timeParam}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="bg-yellow-50/50 dark:bg-yellow-900/10 border-2 border-dashed border-yellow-400 rounded-xl p-6 sm:p-8 flex flex-col items-center text-center gap-6 shadow-sm relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 bg-yellow-200/30 rounded-full size-40 blur-3xl pointer-events-none"></div>
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full text-yellow-600 dark:text-yellow-400 z-10">
                            <span className="material-symbols-outlined text-3xl">card_giftcard</span>
                        </div>
                        <div className="space-y-2 z-10">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                                Ganhe um Simulado de Prova <span className="text-yellow-600 dark:text-yellow-400">(R$ 80,00)</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                                Ajude seus amigos a passarem de primeira e garanta benefícios exclusivos.
                            </p>
                        </div>
                        <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg px-6 py-4 flex flex-col items-center justify-center gap-1 transition-all shadow-md hover:shadow-lg group z-10">
                            <div className="flex items-center gap-2 font-bold text-lg">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                <span>Convidar Amigo no WhatsApp</span>
                            </div>
                            <span className="text-xs sm:text-sm font-medium opacity-90 group-hover:opacity-100">Envie seu cupom de R$ 20 para um amigo</span>
                        </button>
                    </div>
                    <div className="bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 pt-6 pb-2 text-center">
                            <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Seu saldo de 10 aulas já está disponível</h3>
                            <div className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-sm">schedule</span>
                                <p className="text-red-600 dark:text-red-400 text-sm font-semibold">Seus créditos expiram em 90 dias</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 px-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="size-3 rounded-full bg-[#137fec] ring-4 ring-blue-100 dark:ring-blue-900"></div>
                                    <span className="text-xs font-bold text-[#137fec]">Compra</span>
                                </div>
                                <div className="h-1 flex-1 bg-slate-100 dark:bg-slate-700 mx-2 rounded-full overflow-hidden">
                                    <div className="h-full w-1/2 bg-[#137fec]/30"></div>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="size-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                    <span className="text-xs text-slate-500">Agendamento</span>
                                </div>
                                <div className="h-1 flex-1 bg-slate-100 dark:bg-slate-700 mx-2 rounded-full"></div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="size-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                    <span className="text-xs text-slate-500">Aula</span>
                                </div>
                            </div>
                            <Link href="/student/dashboard" className="w-full">
                                <button className="w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold h-14 px-8 rounded-lg text-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 animate-pulse">
                                    <span>AGENDAR AS DEMAIS AULAS AGORA</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </Link>
                            <p className="text-center text-slate-400 text-sm mt-3">Você pode escolher o instrutor na próxima etapa.</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#1e2c3a] border border-[#e7edf3] dark:border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">Parceiros Oficiais</p>
                                <h4 className="text-[#0d141b] dark:text-white font-semibold">Precisa de ajuda com o DETRAN?</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Descomplique a burocracia da sua CNH.</p>
                            </div>
                        </div>
                        <button className="w-full sm:w-auto shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-[#0d141b] dark:text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors shadow-sm whitespace-nowrap">
                            Cotar serviço de Despachante
                        </button>
                    </div>
                    <div className="text-center px-4 pb-4">
                        <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 mb-1">
                            <span className="material-symbols-outlined text-lg">verified_user</span>
                            <span className="text-xs font-bold uppercase tracking-wide">Garantia de Compatibilidade</span>
                        </div>
                        <p className="text-slate-400 dark:text-slate-500 text-xs max-w-[400px] mx-auto leading-relaxed">
                            Se não se adaptar ao seu instrutor na primeira aula, nós trocamos o profissional para você sem custo adicional. Sua satisfação e aprendizado são nossa prioridade.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
