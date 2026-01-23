import { createClient } from "@/utils/supabase/server";
import { StudentProfileForm } from "@/components/student/profile/StudentProfileForm";
import { LearningPreferences } from "@/components/student/profile/LearningPreferences";
import { AddressList } from "@/components/student/profile/AddressList";
import { OrderHistoryList } from "@/components/student/profile/OrderHistoryList";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function StudentProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });

    let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile && !error) {
        // Start Self-healing: Create profile if missing but no DB error
        // (Usually single() returns error if no rows, likely error code PGRST116)
    }

    // Check specifically for "Row not found" error from single()
    if (error && (error.code === 'PGRST116' || error.message.includes('JSON object requested, multiple (or no) rows returned'))) {
        console.log("Profile not found, attempting to create...");
        const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                email: user.email!,
                role: 'student',
                full_name: user.user_metadata?.full_name || 'Novo Aluno',
                avatar_url: user.user_metadata?.avatar_url
            })
            .select()
            .single();

        if (createError) {
            console.error("Failed to create profile:", createError);
            // Let the error fall through to the UI
        } else {
            profile = newProfile;
            error = null;
        }
    }

    if (error || !profile) {
        console.error("Error fetching profile:", error);
        return (
            <div className="p-10 text-center text-red-500">
                <h2 className="text-xl font-bold">Erro ao carregar perfil</h2>
                <p>{error?.message || "Perfil não encontrado"}</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 mt-4 rounded text-left text-xs overflow-auto max-w-lg mx-auto">
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full max-w-[1000px] mx-auto p-4 md:p-10 flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">
                    Meu Perfil
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                    Gerencie seus dados pessoais e personalize sua jornada de aprendizado
                    para se sentir mais seguro.
                </p>
            </div>

            {/* Profile & Personal Data Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <StudentProfileForm profile={profile} />
                <LearningPreferences preferences={profile.preferences} profileId={profile.id} />
                <AddressList addresses={profile.saved_addresses} profileId={profile.id} />
            </section>

            {/* Orders Section */}
            <section className="grid grid-cols-1">
                <OrderHistoryList orders={orders || []} />
            </section>

            {/* Footer Actions */}
            <div className="flex flex-col items-center gap-6 mt-4 pb-10">
                <Link
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium flex items-center gap-1"
                    href="#"
                >
                    Solicitar Reembolso / Cancelar Conta
                </Link>
            </div>
        </div>
    );
}
