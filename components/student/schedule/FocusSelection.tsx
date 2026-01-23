interface FocusSelectionProps {
    selectedSlots: string[];
    instructorName: string;
    onConfirm: (focus: string) => void;
    isBooking: boolean;
    balance: number;
}

export function FocusSelection({ selectedSlots, instructorName, onConfirm, isBooking, balance }: FocusSelectionProps) {
    // Helper to format iso string
    const formatSlot = (iso: string) => {
        const date = new Date(iso);
        const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const day = weekdays[date.getDay()];
        const dayNum = date.getDate();
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return `${day}, ${dayNum} às ${time}`;
    };

    const formatShortSlot = (iso: string) => {
        const date = new Date(iso);
        const dayNum = date.getDate();
        const month = date.getMonth() + 1;
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return `${dayNum}/${month} às ${time}`;
    };

    const hasSelection = selectedSlots.length > 0;
    const exceedsBalance = selectedSlots.length > balance;

    return (
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
            {/* Focus Selection */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">
                    O que vamos praticar?
                </h3>
                <div className="flex flex-col gap-3">
                    {/* Option 1: Treino Livre */}
                    <label className="relative flex items-center p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors has-[:checked]:border-student-primary has-[:checked]:bg-student-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-student-primary">
                        <input
                            defaultChecked
                            className="peer sr-only"
                            name="focus"
                            type="radio"
                            value="general"
                        />
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-student-primary mr-4">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                                Treino Livre
                            </h4>
                            <p className="text-sm text-slate-500">
                                Prática geral de direção
                            </p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-slate-300 peer-checked:border-student-primary peer-checked:bg-student-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">
                                check
                            </span>
                        </div>
                    </label>
                    {/* Option 2: Baliza */}
                    <label className="relative flex items-center p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors has-[:checked]:border-student-primary has-[:checked]:bg-student-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-student-primary">
                        <input
                            className="peer sr-only"
                            name="focus"
                            type="radio"
                            value="parking"
                        />
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mr-4">
                            <span className="material-symbols-outlined">local_parking</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                                Baliza
                            </h4>
                            <p className="text-sm text-slate-500">Foco em estacionamento</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-slate-300 peer-checked:border-student-primary peer-checked:bg-student-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">
                                check
                            </span>
                        </div>
                    </label>
                    {/* Option 3: Simulado (Upsell) */}
                    <label className="relative flex items-center p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10 cursor-pointer hover:bg-amber-100/50 transition-colors has-[:checked]:border-amber-500 has-[:checked]:bg-amber-100/30 has-[:checked]:ring-1 has-[:checked]:ring-amber-500">
                        <input
                            className="peer sr-only"
                            name="focus"
                            type="radio"
                            value="mock_test"
                        />
                        <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                + R$ 50,00
                            </span>
                        </div>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 mr-4">
                            <span className="material-symbols-outlined">star</span>
                        </div>
                        <div className="flex-1 pr-12">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                                Simulado Prático
                            </h4>
                            <p className="text-sm text-slate-500">
                                Avaliação completa tipo DETRAN
                            </p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-slate-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">
                                check
                            </span>
                        </div>
                    </label>
                </div>
            </div>
            {/* Sticky Bottom for Mobile / Normal for Desktop */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex-1">
                        <p className="text-sm text-slate-500">Resumo</p>
                        {hasSelection ? (
                            <>
                                <p className="font-bold text-lg text-slate-900 dark:text-white">
                                    {selectedSlots.length} aula{selectedSlots.length > 1 ? 's' : ''} selecionada{selectedSlots.length > 1 ? 's' : ''}
                                </p>
                                <div className="mt-2 max-h-24 overflow-y-auto">
                                    {selectedSlots.slice(0, 3).map((slot, idx) => (
                                        <p key={slot} className="text-xs text-slate-600 dark:text-slate-400">
                                            {idx + 1}. {formatShortSlot(slot)}
                                        </p>
                                    ))}
                                    {selectedSlots.length > 3 && (
                                        <p className="text-xs text-slate-500 italic">
                                            +{selectedSlots.length - 3} mais...
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="font-bold text-lg text-slate-900 dark:text-white">
                                Selecione um horário
                            </p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Instrutor</p>
                        <p className="font-medium text-slate-900 dark:text-white">
                            {instructorName}
                        </p>
                    </div>
                </div>
                {exceedsBalance && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                            ⚠️ Você selecionou mais aulas ({selectedSlots.length}) do que seu saldo disponível ({balance})
                        </p>
                    </div>
                )}
                <button
                    onClick={() => {
                        // Get selected focus
                        const focus = (document.querySelector('input[name="focus"]:checked') as HTMLInputElement)?.value || 'general';
                        onConfirm(focus);
                    }}
                    disabled={!hasSelection || isBooking || exceedsBalance}
                    className="w-full bg-student-primary hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-student-primary/30 transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isBooking ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Agendando...</span>
                        </>
                    ) : (
                        <>
                            <span>
                                {hasSelection
                                    ? `Confirmar ${selectedSlots.length} Aula${selectedSlots.length > 1 ? 's' : ''}`
                                    : 'Selecione um horário'
                                }
                            </span>
                            {hasSelection && <span className="material-symbols-outlined">arrow_forward</span>}
                        </>
                    )}
                </button>
                <p className="text-center text-xs text-slate-400">
                    {hasSelection && selectedSlots.length > 1
                        ? `Ao confirmar, ${selectedSlots.length} aulas serão debitadas do seu pacote.`
                        : 'Ao confirmar, uma aula será debitada do seu pacote.'
                    }
                    <br />
                    Cancelamento grátis até 24h antes.
                </p>
            </div>
        </div>
    );
}
