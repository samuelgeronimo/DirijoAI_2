"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

interface DocumentFile {
    id: string; // Unique temp ID for React keys
    file: File;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    previewUrl: string;
    studentName: string;
    badge: string;
}

const BADGE_OPTIONS = [
    { value: 'first_try', label: 'Passou de primeira', icon: 'check_circle', color: 'bg-green-100 text-green-700' },
    { value: 'perfect_parking', label: 'Baliza perfeita', icon: 'local_parking', color: 'bg-blue-100 text-blue-700' },
    { value: 'fear_lost', label: 'Perdeu o medo', icon: 'psychology', color: 'bg-purple-100 text-purple-700' },
    { value: '20_lessons', label: '20 aulas', icon: 'timer', color: 'bg-orange-100 text-orange-700' },
];

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
                id: Math.random().toString(36).substr(2, 9),
                file,
                progress: 0,
                status: 'uploading' as const,
                previewUrl: URL.createObjectURL(file),
                studentName: '',
                badge: 'first_try' // Default
            }));
            setFiles(prev => [...prev, ...newFiles]);

            // Simulate upload progress
            newFiles.forEach((fileObj, index) => {
                setTimeout(() => {
                    setFiles(prev => prev.map(f => f.id === fileObj.id ? {
                        ...f,
                        progress: 100,
                        status: 'completed',
                        studentName: f.studentName,
                        badge: f.badge
                    } : f));
                }, 800 + index * 300);
            });
        }
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const updateFileMetadata = (id: string, field: 'studentName' | 'badge', value: string) => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
    };

    const handleContinue = async () => {
        if (!user) return;

        // Validate Data
        const missingNames = files.some(f => !f.studentName.trim());
        if (missingNames) {
            alert("Por favor, preencha o nome do aluno em todas as fotos.");
            return;
        }

        setLoading(true);
        const supabase = createClient();

        try {
            // 1. Upload files and Insert Records
            if (files.length > 0) {
                const uploadPromises = files.map(async (docFile) => {
                    const fileExt = docFile.file.name.split('.').pop();
                    const fileName = `${user.id}/success_${Date.now()}_${docFile.id}.${fileExt}`;

                    // Upload Image
                    const { error: uploadError } = await supabase.storage
                        .from('success_gallery')
                        .upload(fileName, docFile.file);

                    if (uploadError) throw uploadError;

                    const { data: publicUrlData } = supabase.storage
                        .from('success_gallery')
                        .getPublicUrl(fileName);

                    // Insert Record
                    const { error: dbError } = await supabase.from('success_stories').insert({
                        instructor_id: user.id,
                        photo_url: publicUrlData.publicUrl,
                        student_name: docFile.studentName,
                        badge: docFile.badge
                    });
                    if (dbError) throw dbError;
                });

                await Promise.all(uploadPromises);
            }

            // 2. Save progress to Step 6 (Schedule)
            const { error } = await supabase
                .from('instructors')
                .update({ current_onboarding_step: 7 })
                .eq('id', user.id);

            if (error) throw error;

            router.push("/instructor/onboarding/schedule");
        } catch (error: any) {
            console.error("Error saving progress:", error);
            alert("Erro ao salvar dados: " + error.message);
        } finally {
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
                                Adicione fotos de ex-alunos e celebre suas conquistas. Identifique o aluno e o marco alcançado.
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

                            {/* Files Editor List */}
                            {files.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                                    {files.map((fileObj) => (
                                        <div key={fileObj.id} className="flex flex-col gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm relative group">
                                            <button
                                                onClick={() => removeFile(fileObj.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors z-10"
                                                title="Remover"
                                            >
                                                <span className="material-symbols-outlined text-base">close</span>
                                            </button>

                                            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900">
                                                <Image
                                                    src={fileObj.previewUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                                {fileObj.status === 'uploading' && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                                                        <div className="h-full bg-green-500 animate-pulse w-full"></div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 block">Nome do Aluno</label>
                                                    <input
                                                        type="text"
                                                        value={fileObj.studentName}
                                                        onChange={(e) => updateFileMetadata(fileObj.id, 'studentName', e.target.value)}
                                                        placeholder="Ex: Ana Souza"
                                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 block">Conquista (Badge)</label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {BADGE_OPTIONS.map(opt => (
                                                            <div
                                                                key={opt.value}
                                                                onClick={() => updateFileMetadata(fileObj.id, 'badge', opt.value)}
                                                                className={`
                                                                    cursor-pointer p-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center gap-1 text-center select-none
                                                                    ${fileObj.badge === opt.value
                                                                        ? 'border-[#137fec] bg-[#137fec]/5 text-[#137fec]'
                                                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                                                                    }
                                                                `}
                                                            >
                                                                <span className="material-symbols-outlined text-lg">{opt.icon}</span>
                                                                {opt.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
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
