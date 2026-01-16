import { StudentProfileForm } from "@/components/student/profile/StudentProfileForm";
import { LearningPreferences } from "@/components/student/profile/LearningPreferences";
import { AddressList } from "@/components/student/profile/AddressList";
import Link from "next/link";

export default function StudentProfilePage() {
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
                <StudentProfileForm />
                <LearningPreferences />
                <AddressList />
            </section>

            {/* Footer Actions */}
            <div className="flex flex-col items-center gap-6 mt-4 pb-10">
                <button className="w-full max-w-sm bg-student-primary hover:bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-student-primary/30 transition-all transform hover:-translate-y-0.5 cursor-pointer">
                    Salvar Alterações
                </button>
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
