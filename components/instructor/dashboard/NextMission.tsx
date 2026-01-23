import Link from "next/link";
import { formatTime } from "@/utils/instructorMetrics";

interface Lesson {
    id: string;
    scheduled_at: string;
    pickup_address?: string;
    pickup_lat?: number;
    pickup_lng?: number;
    student_notes?: string;
    student?: {
        full_name: string;
        avatar_url?: string;
    };
}

interface NextMissionProps {
    lesson: Lesson | null;
}

export function NextMission({ lesson }: NextMissionProps) {
    // Empty state when no lesson is scheduled
    if (!lesson) {
        return (
            <div className="xl:col-span-2 flex flex-col gap-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary">
                        location_on
                    </span>
                    Próxima Missão
                </h3>
                <div className="bg-instructor-surface-dark rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">
                        event_busy
                    </span>
                    <h3 className="text-white font-bold text-xl mb-2">Nenhuma aula agendada</h3>
                    <p className="text-gray-400 mb-6">
                        Você não tem aulas agendadas no momento. Relaxe ou aproveite para organizar sua agenda!
                    </p>
                    <Link
                        href="/instructor/schedule"
                        className="inline-flex items-center gap-2 bg-instructor-primary/10 hover:bg-instructor-primary/20 text-instructor-primary px-6 py-3 rounded-xl transition-all border border-instructor-primary/20"
                    >
                        <span className="material-symbols-outlined">calendar_month</span>
                        Ver Agenda
                    </Link>
                </div>
            </div>
        );
    }

    const scheduledDate = new Date(lesson.scheduled_at);
    const studentName = lesson.student?.full_name || 'Aluno';
    const studentFirstName = studentName.split(' ')[0];
    const avatarUrl = lesson.student?.avatar_url || 'https://via.placeholder.com/150';
    const address = lesson.pickup_address || 'Endereço não informado';

    // Generate Waze URL if coordinates are available
    const wazeUrl = lesson.pickup_lat && lesson.pickup_lng
        ? `https://waze.com/ul?ll=${lesson.pickup_lat},${lesson.pickup_lng}&navigate=yes`
        : '#';

    return (
        <div className="xl:col-span-2 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-instructor-primary">
                    location_on
                </span>
                Próxima Missão
            </h3>
            <div className="bg-instructor-surface-dark rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                {/* Map Preview Header */}
                <div
                    className="h-32 bg-cover bg-center relative"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtZHNgCgywNeAmJRprS3i1eakKoBTNIKJYLFgLoZYwLxFQY2k90KQb76sjwDZxb6VrtXcWSr3Z1pPfjkZyIOA2Fy01FKc8B-ctKvDEZ8oH9pX9zuNMSKgKnjlDfWst8EAMqx6yVzIYXw1n3e6votO1x8i817im1dIkoQrvcerw8VkwHznVgIJqk7TwHkpZjkKnqoNK5zSepV3VoE9vo3rO_MFIjCUiTXr1i3qg7RuwW9M6OX1diWCLWwe83lizFGG1aUtpado4-vas')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-instructor-surface-dark"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <a
                            href={wazeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open Waze"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-lg transition-colors border border-white/10 cursor-pointer"
                        >
                            <span className="material-symbols-outlined">near_me</span>
                        </a>
                        <button
                            aria-label="Open Chat"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-lg transition-colors border border-white/10 cursor-pointer"
                        >
                            <span className="material-symbols-outlined">chat_bubble</span>
                        </button>
                    </div>
                </div>
                <div className="p-6 sm:p-8 -mt-12 relative z-10">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
                        <div className="relative">
                            <div
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cover bg-center shadow-xl border-4 border-instructor-surface-dark"
                                style={{
                                    backgroundImage: `url('${avatarUrl}')`,
                                }}
                            ></div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-instructor-bg-dark text-xs font-bold px-2 py-1 rounded-full border-2 border-instructor-surface-dark">
                                ALUNO
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                {studentFirstName}
                            </h2>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 text-gray-300">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-instructor-primary font-light text-lg">
                                        schedule
                                    </span>
                                    <span className="font-medium">{formatTime(scheduledDate)}</span>
                                </div>
                                <div className="hidden sm:block text-gray-600">•</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-instructor-primary font-light text-lg">
                                        pin_drop
                                    </span>
                                    <span className="truncate max-w-[300px]">{address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {lesson.student_notes && (
                        <div className="bg-instructor-surface-dark-2/50 rounded-xl p-4 mb-8 border border-white/5">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-instructor-secondary mt-0.5">
                                    lightbulb
                                </span>
                                <div>
                                    <p className="text-white font-semibold text-sm">
                                        Observações do aluno
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {lesson.student_notes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <Link
                        href="/instructor/active-lesson"
                        className="w-full bg-instructor-primary hover:bg-instructor-primary-hover text-instructor-bg-dark text-lg font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(19,236,91,0.2)] hover:shadow-[0_0_40px_rgba(19,236,91,0.4)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
                    >
                        <span className="material-symbols-outlined fill-current">
                            play_circle
                        </span>
                        INICIAR AULA
                    </Link>
                </div>
            </div>
        </div>
    );
}
