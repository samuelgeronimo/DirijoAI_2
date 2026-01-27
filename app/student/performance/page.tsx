import { SkillsList } from "@/components/student/skills/SkillsList";
import { UpsellCard } from "@/components/student/skills/UpsellCard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function StudentPerformancePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch Skills Evaluation from completed lessons
    const { data: lessons } = await supabase
        .from('lessons')
        .select('skills_evaluation')
        .eq('student_id', user.id)
        .eq('status', 'completed')
        .not('skills_evaluation', 'is', null);

    // Calculate Average Skills
    let averageSkills = null;
    if (lessons && lessons.length > 0) {
        const totals = { clutchControl: 0, spatialAwareness: 0, lawRespect: 0 };
        let count = 0;

        lessons.forEach((l: any) => {
            const skills = l.skills_evaluation;
            if (skills && typeof skills.clutchControl === 'number') {
                totals.clutchControl += skills.clutchControl;
                totals.spatialAwareness += skills.spatialAwareness || 0;
                totals.lawRespect += skills.lawRespect || 0;
                count++;
            }
        });

        if (count > 0) {
            averageSkills = {
                clutchControl: totals.clutchControl / count,
                spatialAwareness: totals.spatialAwareness / count,
                lawRespect: totals.lawRespect / count
            };
        }
    }

    return (
        <div className="w-full max-w-[1120px] px-4 md:px-8 lg:px-12 py-8 md:py-12 flex flex-col gap-10">
            {/* Header Section */}
            <header className="flex flex-col gap-3 md:gap-4">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                    Seu Mapa de Evolução
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal max-w-2xl">
                    Veja onde você já domina e onde precisamos focar para sua aprovação.
                    Identificamos seus pontos fortes e áreas de atenção.
                </p>
            </header>
            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <SkillsList skills={averageSkills} />
                <UpsellCard />
            </div>
            {/* Footer Summary (Optional visual element) */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <p>© 2024 Dirijo.ai - Plataforma de Ensino Inteligente</p>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                        Dominado
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span> Atenção
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span> Crítico
                    </span>
                </div>
            </div>
        </div>
    );
}
