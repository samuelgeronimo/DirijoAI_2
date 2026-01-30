import { createClient } from "@/utils/supabase/server";
import { SubmitDisputeForm } from "@/components/student/SubmitDisputeForm";
import { DisputeResponseForm } from "@/components/instructor/disputes/DisputeResponseForm";
import { redirect } from "next/navigation";

export default async function InstructorDisputePage({ params }: { params: Promise<{ lessonId: string }> }) {
    const supabase = await createClient();
    const { lessonId } = await params;
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/instructor/login');

    const { data: lesson } = await supabase
        .from('lessons')
        .select(`
            *,
            student:profiles!lessons_student_id_fkey(full_name)
        `)
        .eq('id', lessonId)
        .single();

    if (!lesson) {
        return <div>Aula não encontrada.</div>;
    }

    const isDisputedByStudent = lesson.status === 'disputed';
    let disputeData = null;

    if (isDisputedByStudent) {
        const { data: dispute } = await supabase
            .from('disputes')
            .select(`
                id,
                reason,
                status,
                created_at,
                dispute_messages (
                    id,
                    content,
                    sender_id,
                    created_at,
                    sender:profiles(full_name)
                )
            `)
            .eq('lesson_id', lessonId)
            .single();

        disputeData = dispute;
    }

    return (
        <div className="flex-1 w-full max-w-2xl mx-auto p-4 md:p-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-white">
                {isDisputedByStudent ? 'Responder Disputa' : 'Reportar Problema'}
            </h1>

            <div className="bg-[#111a22] p-6 rounded-xl border border-[#324d67]">
                <div className="mb-6 flex items-center justify-between border-b border-[#324d67] pb-4">
                    <div>
                        <p className="text-sm text-[#92adc9]">Aula com <strong className="text-white">{lesson.student?.full_name}</strong></p>
                        <p className="text-sm text-[#92adc9]">Data: {new Date(lesson.scheduled_at).toLocaleString('pt-BR')}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${lesson.status === 'disputed' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-500/10 text-gray-400'
                        }`}>
                        {lesson.status === 'disputed' ? 'EM DISPUTA' : 'NORMAL'}
                    </span>
                </div>

                {isDisputedByStudent && disputeData ? (
                    <DisputeResponseForm
                        disputeId={disputeData.id}
                        reason={disputeData.reason}
                        messages={disputeData.dispute_messages as any}
                        currentUserId={user.id}
                    />
                ) : (
                    <SubmitDisputeForm lessonId={lessonId} />
                )}
            </div>
        </div>
    );
}
