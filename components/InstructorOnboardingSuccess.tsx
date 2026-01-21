"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from 'next/link';

interface DocumentFile {
    file: File;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    previewUrl?: string;
}

export default function InstructorOnboardingSuccess() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [files, setFiles] = useState<DocumentFile[]>([]);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUser(data.user);
            } else {
                router.push("/instructor/login");
            }
        });
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map(file => ({
                file,
                progress: 0,
                status: 'uploading' as const,
                previewUrl: URL.createObjectURL(file)
            }));
            setFiles(prev => [...prev, ...newFiles]);

            // Simulate upload progress for UX (real upload happens on Verify/Continue)
            newFiles.forEach((fileObj, index) => {
                setTimeout(() => {
                    setFiles(prev => prev.map(f => f.file === fileObj.file ? { ...f, progress: 100, status: 'completed' } : f));
                }, 800 + index * 300);
            });
        }
    };

    const removeFile = (fileToRemove: File) => {
        setFiles(prev => prev.filter(f => f.file !== fileToRemove));
    };

    const uploadFiles = async () => {
        if (!user) return;
        const supabase = createClient();

        const uploadPromises = files.map(async (docFile) => {
            const fileExt = docFile.file.name.split('.').pop();
            const fileName = `${user.id}/success_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('success_gallery')
                .upload(fileName, docFile.file);

            if (uploadError) throw uploadError;

            // Here we could get publicUrl and save to a separate table 'instructor_gallery' if we had one.
            // For now, just uploading to the bucket is enough to "save" them.
            return fileName;
        });

        await Promise.all(uploadPromises);
    };

    const handleContinue = async () => {
        if (!user) return;
        setLoading(true);
        const supabase = createClient();

        try {
            // 1. Upload files
            if (files.length > 0) {
                await uploadFiles();
            }

            // 2. Save progress to Step 6
            const { error } = await supabase
                .from('instructors')
                .update({ current_onboarding_step: 7 })
                .eq('id', user.id);

            if (error) throw error;

            router.push("/instructor/onboarding/schedule");
        } catch (error: any) {
            console.error("Error saving progress:", error);
            alert("Erro ao salvar dados: " + error.message);
            setLoading(false);
        }
    };

    return (
        <div className="font-display bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-white min-h-screen flex flex-col overflow-x-hidden antialiased transition-colors duration-200">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-[#2a3b4d] px-6 py-4 bg-white dark:bg-[#1a2632]">
                <div className="flex items-center gap-4 text-[#0d141b] dark:text-white">
                    <div className="size-6 text-[#137fec] flex items-center justify-center">
                        <span className="material-symbols-outlined">directions_car</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Onboard Instrutores</h2>
                </div>
                {/* ... Header Right with Avatar placeholder ... */}
            </header>

            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
                    <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-8">
                        {/* Progress Bar */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-6 justify-between items-end">
                                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Etapa 6 de 8</p>
                                <span className="text-[#137fec] text-sm font-bold">75% Concluído</span>
                            </div>
                            <div className="rounded-full bg-[#cfdbe7] dark:bg-slate-700 h-2 w-full overflow-hidden">
                                <div className="h-full rounded-full bg-[#137fec]" style={{ width: '75%' }}></div>
                            </div>
                        </div>

                        {/* Page Content */}
                        <div className="flex flex-col gap-3">
                            <h1 className="text-[#0d141b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                                Seu Histórico de Aprovação
                            </h1>
                            <p className="text-[#4c739a] dark:text-slate-400 text-lg font-normal leading-relaxed max-w-2xl">
                                Mostre suas conquistas! Adicione fotos de ex-alunos com a CNH para ganhar a confiança de novos clientes.
                            </p>
                        </div>

                        {/* Upload Zone */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#cfdbe7] dark:border-slate-600 bg-white dark:bg-[#1a2632] px-6 py-12 transition-all hover:border-[#137fec] hover:bg-slate-50 dark:hover:bg-[#1e2c3a] group cursor-pointer relative overflow-hidden">
                                <input
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    multiple
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#137fec] group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                                </div>
                                <div className="flex max-w-[480px] flex-col items-center gap-2 z-0">
                                    <p className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                                        Arraste suas fotos aqui
                                    </p>
                                    <p className="text-[#4c739a] dark:text-slate-400 text-sm font-normal text-center">
                                        ou clique para buscar na galeria (JPG, PNG)
                                    </p>
                                </div>
                            </div>

                            {/* Gamification Banner */}
                            {files.length > 0 && (
                                <div className="flex items-start sm:items-center gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
                                    <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-200">
                                        <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                                        <div>
                                            <p className="text-emerald-900 dark:text-emerald-100 font-bold text-base">Destaque-se na busca!</p>
                                            <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                                                {files.length >= 5
                                                    ? "Parabéns! Você alcançou o nível máximo de visibilidade."
                                                    : "Ótimo! Instrutores com +5 fotos aparecem no topo da busca."}
                                            </p>
                                        </div>
                                        <div className="shrink-0 bg-white dark:bg-emerald-950 px-3 py-1 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-100 dark:border-emerald-800">
                                            {files.length}/5 fotos adicionadas
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preview Grid */}
                            {files.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
                                    {files.map((fileObj, index) => (
                                        <div key={index} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
                                            <img src={fileObj.previewUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => removeFile(fileObj.file)}
                                                    className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110"
                                                    title="Remover"
                                                >
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                            {fileObj.status === 'uploading' && (
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                                                    <div className="h-full bg-green-500 animate-pulse w-full"></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#e7edf3] dark:border-[#2a3b4d] mt-4 mb-12">
                            <Link href="/instructor/onboarding/video" className="w-full sm:w-auto h-12 px-8 rounded-lg border-2 border-[#e7edf3] dark:border-slate-600 bg-transparent text-[#0d141b] dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">arrow_back</span>
                                Voltar
                            </Link>
                            <button
                                onClick={handleContinue}
                                disabled={loading}
                                className="w-full sm:w-auto h-12 px-8 rounded-lg bg-[#137fec] text-white text-base font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                            >
                                {loading ? "Salvando..." : "Continuar para Agenda"}
                                {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
