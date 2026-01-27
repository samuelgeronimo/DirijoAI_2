import { useRef, useEffect } from "react";

interface StudentPreferencesModalProps {
    studentName: string;
    preferences: Record<string, boolean> | null;
    onClose: () => void;
}

export function StudentPreferencesModal({ studentName, preferences, onClose }: StudentPreferencesModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!studentName) return null;

    const preferenceItems = [
        {
            key: 'home_pickup',
            icon: 'home',
            iconColor: 'bg-blue-500/10 text-blue-500',
            label: 'Busca em Casa',
            description: 'Aluno prefere ser buscado em casa.'
        },
        {
            key: 'fear_highway',
            icon: 'warning',
            iconColor: 'bg-red-500/10 text-red-500',
            label: 'Medo de Rodovias',
            description: 'Evitar rotas de alta velocidade inicialmente.'
        },
        {
            key: 'silent_instructor',
            icon: 'volume_off',
            iconColor: 'bg-purple-500/10 text-purple-500',
            label: 'Preferência por Silêncio',
            description: 'Aluno foca melhor com menos conversa.'
        },
        {
            key: 'intensive_classes',
            icon: 'schedule',
            iconColor: 'bg-yellow-500/10 text-yellow-600',
            label: 'Aulas Intensivas',
            description: 'Aluno tem pressa e quer agendar com frequência.'
        },
        {
            key: 'nervous_driver',
            icon: 'spa',
            iconColor: 'bg-green-500/10 text-green-600',
            label: 'Aluno Tímido/Nervoso',
            description: 'Requer instruções calmas e reforço positivo.'
        }
    ];

    const activePreferences = preferenceItems.filter(item => preferences?.[item.key]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div ref={modalRef} className="bg-instructor-surface-dark rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10 animate-slide-up">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-instructor-surface-dark-2">
                    <div>
                        <h3 className="font-bold text-xl text-white">Preferências do Aluno</h3>
                        <p className="text-sm text-gray-400 mt-1">{studentName}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6">
                    {activePreferences.length > 0 ? (
                        <div className="space-y-4">
                            {activePreferences.map((pref) => (
                                <div key={pref.key} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className={`p-2 rounded-lg shrink-0 ${pref.iconColor}`}>
                                        <span className="material-symbols-outlined">{pref.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{pref.label}</h4>
                                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{pref.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-gray-500 text-3xl">psychology</span>
                            </div>
                            <p className="text-gray-400 text-sm">Este aluno não definiu nenhuma preferência específica.</p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/10 bg-instructor-surface-dark-2">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
