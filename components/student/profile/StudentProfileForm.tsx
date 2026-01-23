"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Profile {
    id: string;
    full_name: string | null;
    email: string | null;
    phone: string | null;
    avatar_url: string | null;
    role: string;
}

interface StudentProfileFormProps {
    profile: Profile;
}

export function StudentProfileForm({ profile }: StudentProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const supabase = createClient();

    const [formData, setFormData] = useState({
        full_name: profile.full_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
    });

    // Helper to extract first name
    const getFirstName = (fullName: string | null) => {
        if (!fullName) return "Aluno";
        return fullName.split(' ')[0];
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.full_name,
                    phone: formData.phone,
                })
                .eq('id', profile.id);

            if (error) throw error;
            setMessage("Perfil atualizado com sucesso!");
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error(error);
            setMessage("Erro ao atualizar perfil.");
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${profile.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        setLoading(true);
        setMessage(null);

        try {
            // 1. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars') // Ensure this bucket exists
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // 3. Update Profile
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', profile.id);

            if (updateError) throw updateError;

            // Update local state to show new image immediately
            setFormData(prev => ({ ...prev })); // Force re-render if needed, but better to update a specific avatar state
            // Actually better to refresh the page or update a prop? 
            // Since profile is a prop, we can't mutate it deep, but we can fake it or use router.refresh()
            window.location.reload(); // Simple refresh to fetch new data

        } catch (error: any) {
            console.error("Upload error:", error);
            setMessage(`Erro ao enviar foto: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4 mx-auto md:mx-0 min-w-[200px]">
                    <div className="relative group cursor-pointer">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 ring-4 ring-slate-50 dark:ring-slate-900 shadow-md"
                            style={{
                                backgroundImage: `url("${profile.avatar_url || 'https://via.placeholder.com/150'}")`,
                            }}
                        ></div>
                        <label className="absolute bottom-0 right-0 bg-student-primary hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors flex items-center justify-center cursor-pointer">
                            <span className="material-symbols-outlined text-[20px]">
                                edit
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                                disabled={loading}
                            />
                        </label>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {getFirstName(formData.full_name)}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                            {profile.role === 'student' ? 'Aluno(a)' : profile.role}
                        </p>
                    </div>
                </div>
                {/* Form Fields */}
                <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                                Nome Completo
                            </span>
                            <input
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-student-primary/50 focus:border-student-primary px-4 py-3 text-base"
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                                E-mail
                            </span>
                            <input
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-student-primary/50 focus:border-student-primary px-4 py-3 text-base opacity-70 cursor-not-allowed"
                                type="email"
                                value={formData.email}
                                disabled
                                title="Para alterar o e-mail, entre em contato com o suporte."
                            />
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                            <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                                WhatsApp
                            </span>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">
                                        chat
                                    </span>
                                </span>
                                <input
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-student-primary/50 focus:border-student-primary pl-11 pr-4 py-3 text-base"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        let v = e.target.value.replace(/\D/g, '');
                                        v = v.substring(0, 11); // Limit to 11 digits

                                        if (v.length > 2) v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
                                        if (v.length > 9) v = `${v.substring(0, 10)}-${v.substring(10)}`;

                                        setFormData({ ...formData, phone: v });
                                    }}
                                    maxLength={15}
                                />
                            </div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        {message && (
                            <span className="text-sm font-medium text-green-600 animate-fade-in">
                                {message}
                            </span>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="ml-auto bg-student-primary hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all disabled:opacity-50"
                        >
                            {loading ? "Salvando..." : "Salvar Dados"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
