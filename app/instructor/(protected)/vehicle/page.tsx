import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { VehicleForm } from "@/components/instructor/dashboard/VehicleForm";

export default async function InstructorVehiclePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/instructor/login");
    }

    const { data: profile, error } = await supabase
        .from("instructors")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Error fetching instructor profile:", error);
    }

    if (!profile) {
        console.log("No profile found for user:", user.id);
        return redirect("/instructor/onboarding");
    }

    const { data: vehicle } = await supabase
        .from("vehicles")
        .select("*")
        .eq("instructor_id", profile.id)
        .single();

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Meu Veículo</h1>
                <p className="text-gray-400">
                    Gerencie as informações do carro que seus alunos irão dirigir.
                </p>
            </header>

            <div className="bg-instructor-surface-dark border border-white/5 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-instructor-primary/10 flex items-center justify-center text-instructor-primary">
                        <span className="material-symbols-outlined text-3xl">
                            directions_car
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {vehicle ? `${vehicle.brand} ${vehicle.model}` : "Nenhum veículo cadastrado"}
                        </h2>
                        <p className="text-gray-400">
                            {vehicle ? `${vehicle.year} • ${vehicle.color} • ${vehicle.plate}` : "Cadastre seu veículo para começar a dar aulas."}
                        </p>
                    </div>
                    {vehicle && (
                        <div className="ml-auto px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-lg text-sm font-semibold border border-emerald-500/20">
                            Ativo
                        </div>
                    )}
                </div>

                <VehicleForm
                    initialData={vehicle}
                    instructorId={profile.id}
                />
            </div>
        </div>
    );
}
