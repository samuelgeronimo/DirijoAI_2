
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function StudentHistoryPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // Fetch all lessons
    const { data: lessons } = await supabase
        .from('lessons')
        .select(`
            id,
            status,
            scheduled_at,
            price_cents,
            duration_minutes,
            instructors (
                profiles (full_name, avatar_url)
            )
        `)
        .eq('student_id', user.id)
        .order('scheduled_at', { ascending: false });

    return (
        <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Histórico de Aulas</h1>
                <Link href="/student/dashboard" className="text-sm text-[#92adc9] hover:text-white">
                    Voltar ao Dashboard
                </Link>
            </div>

            <div className="bg-[#111a22] rounded-xl border border-[#324d67] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#1a2632] text-xs uppercase text-[#92adc9]">
                        <tr>
                            <th className="p-4">Data</th>
                            <th className="p-4">Instrutor</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#324d67]">
                        {lessons?.map((lesson: any) => (
                            <tr key={lesson.id} className="hover:bg-[#1a2632]/50">
                                <td className="p-4 text-white">
                                    {new Date(lesson.scheduled_at).toLocaleDateString('pt-BR')} <br />
                                    <span className="text-xs text-[#92adc9]">
                                        {new Date(lesson.scheduled_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 bg-cover"
                                            style={{ backgroundImage: `url(${lesson.instructors?.profiles?.avatar_url || ''})` }} />
                                        <span className="text-sm text-white">{lesson.instructors?.profiles?.full_name}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold
                                        ${lesson.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                                            lesson.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' :
                                                lesson.status === 'disputed' ? 'bg-red-500/10 text-red-400' :
                                                    'bg-gray-500/10 text-gray-400'}`}>
                                        {lesson.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {['completed', 'no_show'].includes(lesson.status) && (
                                        <Link
                                            href={`/student/disputes/${lesson.id}`}
                                            className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Reportar Problema
                                        </Link>
                                    )}
                                    {lesson.status === 'disputed' && (
                                        <span className="text-xs text-yellow-500">Em Análise</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
