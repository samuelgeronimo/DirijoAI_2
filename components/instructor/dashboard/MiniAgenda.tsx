import Link from "next/link";
import { formatDateTime } from "@/utils/instructorMetrics";

interface Lesson {
    id: string;
    scheduled_at: string;
    student?: {
        full_name: string;
        avatar_url?: string;
    };
}

interface MiniAgendaProps {
    lessons: Lesson[];
}

export function MiniAgenda({ lessons }: MiniAgendaProps) {
    return (
        <div className="bg-instructor-surface-dark rounded-3xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-bold">Próximos</h4>
                <Link
                    href="/instructor/schedule"
                    className="text-instructor-primary text-sm font-medium hover:underline cursor-pointer"
                >
                    Ver tudo
                </Link>
            </div>
            {lessons.length === 0 ? (
                <div className="text-center py-8">
                    <span className="material-symbols-outlined text-4xl text-gray-600 mb-2 block">
                        event_available
                    </span>
                    <p className="text-gray-400 text-sm">Nenhuma aula agendada</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {lessons.map((lesson) => {
                        const studentName = lesson.student?.full_name || 'Aluno';
                        const studentFirstName = studentName.split(' ')[0];
                        const avatarUrl = lesson.student?.avatar_url || 'https://via.placeholder.com/150';
                        const scheduledDate = new Date(lesson.scheduled_at);

                        return (
                            <div key={lesson.id} className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full bg-gray-700 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('${avatarUrl}')`,
                                    }}
                                ></div>
                                <div className="flex-1">
                                    <p className="text-white text-sm font-bold">{studentFirstName}</p>
                                    <p className="text-gray-500 text-xs">{formatDateTime(scheduledDate)}</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-instructor-primary"></div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
