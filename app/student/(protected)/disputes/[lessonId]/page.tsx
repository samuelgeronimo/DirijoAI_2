
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitDisputeForm } from "@/components/student/SubmitDisputeForm";

export default async function DisputeSubmissionPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const supabase = await createClient();
    const { lessonId } = await params;

    const { data: lesson, error } = await supabase
        .from('lessons')
        .select(`
            *,
            instructors (
                profiles (full_name)
            )
        `)
        .eq('id', lessonId)
        .single();

    if (error) {
        console.error("Error fetching lesson:", error);
    }

    if (!lesson) {
        console.log("Lesson ID:", lessonId);
        return <div>Aula não encontrada. ID: {lessonId}. Erro: {error?.message}</div>;
    }

    return (
        <div className="flex-1 w-full max-w-lg mx-auto p-4 md:p-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-white">Reportar Problema</h1>

            <div className="bg-[#111a22] p-6 rounded-xl border border-[#324d67]">
                <div className="mb-6">
                    <p className="text-sm text-[#92adc9]">Aula com <strong className="text-white">{lesson.instructors?.profiles?.full_name}</strong></p>
                    <p className="text-sm text-[#92adc9]">Data: {new Date(lesson.scheduled_at).toLocaleString('pt-BR')}</p>
                </div>

                <SubmitDisputeForm lessonId={lessonId} />
            </div>
        </div>
    );
}
