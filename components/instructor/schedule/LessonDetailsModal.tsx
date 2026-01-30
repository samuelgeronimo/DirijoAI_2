import Link from "next/link";

import { formatCurrency } from "@/utils/instructorMetrics";
import { formatTime, formatDateTime } from "@/utils/instructorMetrics";

interface Lesson {
    id: string;
    scheduled_at: string;
    duration_minutes: number;
    status: string;
    price_cents: number;
    student?: {
        full_name: string;
        avatar_url?: string;
    };
    pickup_address?: string;
    student_notes?: string;
    pickup_lat?: number;
    pickup_lng?: number;
}

interface LessonDetailsModalProps {
    lesson: Lesson | null;
    onClose: () => void;
    onStartLesson?: (lessonId: string) => void;
    onCancelLesson?: (lessonId: string) => void;
    onReschedule?: (lessonId: string) => void;
}

export function LessonDetailsModal({
    lesson,
    onClose,
    onStartLesson,
    onCancelLesson,
    onReschedule,
}: LessonDetailsModalProps) {
    if (!lesson) return null;

    const getStatusBadge = (status: string) => {
        const badges = {
            scheduled: { text: 'Agendada', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
            in_progress: { text: 'Em Andamento', color: 'bg-instructor-primary/20 text-instructor-primary border-instructor-primary/30' },
            completed: { text: 'Concluída', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
            canceled: { text: 'Cancelada', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
            disputed: { text: 'Em Disputa', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' },
        };
        const badge = badges[status as keyof typeof badges] || badges.scheduled;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
                {badge.text}
            </span>
        );
    };

    const getWazeLink = () => {
        if (lesson.pickup_lat && lesson.pickup_lng) {
            return `https://waze.com/ul?ll=${lesson.pickup_lat},${lesson.pickup_lng}&navigate=yes`;
        }
        if (lesson.pickup_address) {
            return `https://waze.com/ul?q=${encodeURIComponent(lesson.pickup_address)}&navigate=yes`;
        }
        return null;
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-instructor-surface-dark-2 rounded-2xl border border-instructor-surface-dark shadow-2xl max-w-lg w-full pointer-events-auto animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-instructor-surface-dark">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-instructor-primary text-2xl">
                                event
                            </span>
                            <h2 className="text-xl font-bold text-white">Detalhes da Aula</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Student Info */}
                        <div className="flex items-center gap-4">
                            <div
                                className="h-16 w-16 rounded-full bg-cover bg-center border-2 border-instructor-primary/30"
                                style={{
                                    backgroundImage: `url('${lesson.student?.avatar_url || 'https://via.placeholder.com/150'}')`,
                                }}
                            ></div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">
                                    {lesson.student?.full_name || 'Aluno'}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {getStatusBadge(lesson.status)}
                                </div>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-instructor-bg-dark rounded-lg p-4 border border-instructor-surface-dark">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-instructor-primary text-[18px]">
                                        schedule
                                    </span>
                                    <span className="text-xs font-medium text-gray-400">Horário</span>
                                </div>
                                <p className="text-sm font-bold text-white">
                                    {formatDateTime(new Date(lesson.scheduled_at))}
                                </p>
                            </div>
                            <div className="bg-instructor-bg-dark rounded-lg p-4 border border-instructor-surface-dark">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-instructor-primary text-[18px]">
                                        timer
                                    </span>
                                    <span className="text-xs font-medium text-gray-400">Duração</span>
                                </div>
                                <p className="text-sm font-bold text-white">{lesson.duration_minutes} minutos</p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-instructor-bg-dark rounded-lg p-4 border border-instructor-surface-dark">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-green-400 text-[18px]">
                                    attach_money
                                </span>
                                <span className="text-xs font-medium text-gray-400">Valor da Aula</span>
                            </div>
                            <p className="text-lg font-bold text-white">{formatCurrency(lesson.price_cents)}</p>
                        </div>

                        {/* Pickup Address */}
                        {lesson.pickup_address && (
                            <div className="bg-instructor-bg-dark rounded-lg p-4 border border-instructor-surface-dark">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-instructor-primary text-[18px]">
                                        location_on
                                    </span>
                                    <span className="text-xs font-medium text-gray-400">Local de Encontro</span>
                                </div>
                                <p className="text-sm text-white mb-3">{lesson.pickup_address}</p>
                                {getWazeLink() && (
                                    <a
                                        href={getWazeLink()!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-[#33CCFF] hover:bg-[#2BB8E6] text-white text-xs font-medium rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">navigation</span>
                                        Abrir no Waze
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Student Notes */}
                        {lesson.student_notes && (
                            <div className="bg-instructor-bg-dark rounded-lg p-4 border border-instructor-surface-dark">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-instructor-primary text-[18px]">
                                        note
                                    </span>
                                    <span className="text-xs font-medium text-gray-400">Observações do Aluno</span>
                                </div>
                                <p className="text-sm text-gray-300">{lesson.student_notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 p-6 border-t border-instructor-surface-dark">
                        {lesson.status === 'scheduled' && onStartLesson && (
                            <button
                                onClick={() => {
                                    onStartLesson(lesson.id);
                                    onClose();
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-instructor-primary hover:bg-instructor-primary/90 text-white font-medium rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                                Iniciar Aula
                            </button>
                        )}
                        {lesson.status === 'scheduled' && onReschedule && (
                            <button
                                onClick={() => {
                                    onReschedule(lesson.id);
                                    onClose();
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-instructor-surface-dark hover:bg-instructor-surface-dark/80 text-white font-medium rounded-lg transition-colors border border-instructor-surface-dark"
                            >
                                <span className="material-symbols-outlined text-[20px]">event_repeat</span>
                                Reagendar
                            </button>
                        )}
                        {lesson.status === 'scheduled' && onCancelLesson && (
                            <button
                                onClick={() => {
                                    if (confirm('Tem certeza que deseja cancelar esta aula?')) {
                                        onCancelLesson(lesson.id);
                                        onClose();
                                    }
                                }}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-lg transition-colors border border-red-500/30"
                            >
                                <span className="material-symbols-outlined text-[20px]">cancel</span>
                                Cancelar
                            </button>
                        )}

                        {/* Report Issue Action */}
                        {lesson.status !== 'disputed' ? (
                            <Link
                                href={`/instructor/disputes/${lesson.id}`}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 font-medium rounded-lg transition-colors border border-gray-500/30 ml-auto"
                                title="Reportar Problema"
                            >
                                <span className="material-symbols-outlined text-[20px]">report_problem</span>
                            </Link>
                        ) : (
                            <Link
                                href={`/instructor/disputes/${lesson.id}`}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 font-medium rounded-lg transition-colors border border-yellow-500/30 ml-auto"
                                title="Ver Disputa"
                            >
                                <span className="material-symbols-outlined text-[20px]">gavel</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
