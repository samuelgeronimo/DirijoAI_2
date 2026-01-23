"use client";

interface CancelConfirmationModalProps {
    isOpen: boolean;
    lessonCount: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export function CancelConfirmationModal({ isOpen, lessonCount, onConfirm, onCancel }: CancelConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-4xl">
                            cancel
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                    Cancelar {lessonCount} aula{lessonCount > 1 ? 's' : ''}?
                </h3>

                {/* Message */}
                <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                    {lessonCount > 1
                        ? `Você está prestes a cancelar ${lessonCount} aulas agendadas.`
                        : 'Você está prestes a cancelar esta aula agendada.'
                    }
                    <br />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Cancelamento grátis até 24h antes.
                    </span>
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors shadow-lg shadow-red-600/30"
                    >
                        Confirmar Cancelamento
                    </button>
                </div>
            </div>
        </div>
    );
}
