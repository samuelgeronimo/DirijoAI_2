"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface DocumentFile {
    file: File | null;
    progress: number;
    status: 'empty' | 'uploading' | 'completed' | 'error';
    url?: string;
}

const DOC_TYPES = [
    { id: 'cnh_front', label: 'Frente da CNH', description: 'Foto legível da parte da frente', icon: 'id_card' },
    { id: 'cnh_back', label: 'Verso da CNH', description: 'Foto legível do verso com QR Code', icon: 'id_card' },
    { id: 'cnh_digital', label: 'CNH Digital (PDF)', description: 'Exportação original do app CNH Digital', icon: 'picture_as_pdf' },
    { id: 'instructor_credential', label: 'Credencial do Instrutor', description: 'Carteirinha de Instrutor do DETRAN', icon: 'badge' },
    { id: 'vehicle_crlv', label: 'Documento do Veículo (CRLV)', description: 'Certificado de Registro e Licenciamento', icon: 'directions_car' }
];

export default function InstructorOnboardingDocs() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form Fields State
    const [cpf, setCpf] = useState("");
    const [cfi, setCfi] = useState("");
    const [cnhNumber, setCnhNumber] = useState("");
    const [cnhCategory, setCnhCategory] = useState("");
    const [cnhState, setCnhState] = useState("");

    // File State: Keyed by doc id (e.g. 'cnh_front')
    const [files, setFiles] = useState<Record<string, DocumentFile>>({});

    useEffect(() => {
        const supabase = createClient();

        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setLoadingAuth(false);
            } else {
                setLoadingAuth(false);
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user);
                setLoadingAuth(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (!loadingAuth && !user) {
            router.push("/instructor/login");
        }
    }, [loadingAuth, user, router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docTypeId: string) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(prev => ({
                ...prev,
                [docTypeId]: {
                    file,
                    progress: 0,
                    status: 'uploading'
                }
            }));

            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setFiles(prev => ({
                    ...prev,
                    [docTypeId]: {
                        ...prev[docTypeId],
                        progress: Math.min(progress, 100),
                        status: progress >= 100 ? 'completed' : 'uploading'
                    }
                }));
                if (progress >= 100) clearInterval(interval);
            }, 200);
        }
    };

    const removeFile = (docTypeId: string) => {
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[docTypeId];
            return newFiles;
        });
    };

    const uploadFileToSupabase = async (fileObj: DocumentFile, docTypeId: string, userId: string) => {
        if (!fileObj.file) return;

        const supabase = createClient();
        const fileExt = fileObj.file.name.split('.').pop();
        const fileName = `${userId}/${docTypeId}_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(fileName, fileObj.file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(fileName);

        const { error: dbError } = await supabase
            .from('documents')
            .insert({
                owner_id: userId,
                type: 'cnh', // Keeping 'cnh' for now as generic type, or assume we expanded enum
                url: publicUrl,
                status: 'pending',
                metadata: { original_name: fileObj.file.name, doc_type: docTypeId }
            });

        if (dbError) throw dbError;
    };

    const handleContinue = async () => {
        const supabase = createClient();

        // Validate all required files are present
        const missingFiles = DOC_TYPES.filter(doc => !files[doc.id] || files[doc.id].status !== 'completed');

        if (missingFiles.length > 0 || !user) {
            alert(`Por favor, envie todos os documentos obrigatórios:\n${missingFiles.map(d => "- " + d.label).join("\n")}`);
            return;
        }

        setUploading(true);
        try {
            const { error: updateError } = await supabase
                .from('instructors')
                .update({
                    cpf: cpf,
                    cnh_number: cnhNumber,
                    cnh_category: cnhCategory,
                    cnh_issue_state: cnhState,
                    detran_registry_number: cfi,
                    current_onboarding_step: 3
                })
                .eq('id', user.id);

            if (updateError) throw updateError;

            // Upload all files in parallel
            await Promise.all(
                Object.entries(files).map(([docTypeId, fileObj]) =>
                    uploadFileToSupabase(fileObj, docTypeId, user.id)
                )
            );

            router.push("/instructor/onboarding/profile");
        } catch (error: any) {
            console.error("Upload error:", error);
            alert("Erro ao enviar dados: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loadingAuth) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
                <span className="material-symbols-outlined animate-spin text-4xl text-[#137fec]">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] min-h-screen flex flex-col font-display text-[#0d141b] dark:text-gray-100 transition-colors duration-200">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1e2936] border-b border-[#e7edf3] dark:border-[#2d3b4a] px-6 py-3 shadow-sm">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-[#137fec] flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">directions_car</span>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight">Onboarding Instrutor</h1>
                    </div>
                    <div className="flex gap-3">
                        {/* Header Actions */}
                        <div className="ml-2 flex items-center gap-3 pl-3 border-l border-[#e7edf3] dark:border-[#2d3b4a]">
                            <div className="h-8 w-8 rounded-full bg-[#137fec]/20 flex items-center justify-center text-[#137fec] font-bold text-xs overflow-hidden">
                                {user?.user_metadata?.avatar_url ? (
                                    <img alt="Avatar" className="w-full h-full object-cover" src={user.user_metadata.avatar_url} />
                                ) : (
                                    <span>{user?.email?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <span className="text-sm font-medium hidden sm:block">{user?.user_metadata?.full_name || "Instrutor"}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <main className="flex-1 w-full max-w-[960px] mx-auto p-6 md:p-10 flex flex-col gap-8">
                {/* Progress Bar Section */}
                <section className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[#137fec] text-sm font-semibold uppercase tracking-wide">Etapa 2 de 6</p>
                            <h2 className="text-xl font-bold mt-1 dark:text-white">Documentação e Credenciais</h2>
                        </div>
                        <span className="text-sm font-medium text-[#4c739a] dark:text-gray-400">33% Completo</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#e7edf3] dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#137fec] rounded-full transition-all duration-500 ease-out" style={{ width: "33%" }}></div>
                    </div>
                </section>

                {/* Content Card */}
                <div className="bg-white dark:bg-[#1e2936] rounded-xl shadow-sm border border-[#e7edf3] dark:border-[#2d3b4a] overflow-hidden">
                    {/* Page Heading */}
                    <div className="p-8 pb-4 border-b border-[#e7edf3] dark:border-[#2d3b4a]">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white">Valide sua Permissão de Trabalho</h3>
                            <p className="text-[#4c739a] dark:text-gray-400 text-sm md:text-base max-w-2xl">
                                Precisamos confirmar seu cadastro com documentação oficial. Envie fotos legíveis de cada documento solicitado abaixo.
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 flex flex-col gap-8">
                        {/* Personal Docs Row (CPF, CFI) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">CPF</span>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">badge</span>
                                    <input
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal"
                                        placeholder="000.000.000-00"
                                        type="text"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Número do Registro DETRAN (CFI)</span>
                                    <span className="material-symbols-outlined text-gray-400 text-[16px] cursor-help" title="Cadastro de Formação de Instrutores">help</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">assignment_ind</span>
                                    <input
                                        value={cfi}
                                        onChange={(e) => setCfi(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal"
                                        placeholder="Ex: 123456"
                                        type="text"
                                    />
                                </div>
                                <p className="text-xs text-[#4c739a] dark:text-gray-500">Número localizado no verso da sua credencial.</p>
                            </label>
                        </div>

                        {/* CNH Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <label className="flex flex-col gap-2 md:col-span-5">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Número da CNH</span>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">directions_car</span>
                                    <input
                                        value={cnhNumber}
                                        onChange={(e) => setCnhNumber(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal"
                                        placeholder="12345678900"
                                        type="text"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 md:col-span-3">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Categoria</span>
                                <div className="relative">
                                    <select
                                        value={cnhCategory}
                                        onChange={(e) => setCnhCategory(e.target.value)}
                                        className="w-full pl-4 pr-8 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium appearance-none"
                                    >
                                        <option disabled value="">Selecione</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 md:col-span-4">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">Estado de Emissão (UF)</span>
                                <div className="relative">
                                    <select
                                        value={cnhState}
                                        onChange={(e) => setCnhState(e.target.value)}
                                        className="w-full pl-4 pr-8 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium appearance-none"
                                    >
                                        <option disabled value="">Estado</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        {/* Add other states as needed */}
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                                </div>
                            </label>
                        </div>

                        {/* Granular Upload Section */}
                        <div className="flex flex-col gap-4 mt-2">
                            <h4 className="text-base font-semibold text-[#0d141b] dark:text-white">Upload de Documentos Obrigatórios</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {DOC_TYPES.map((doc) => {
                                    const fileObj = files[doc.id];
                                    const isUploaded = fileObj?.status === 'completed';
                                    const isUploading = fileObj?.status === 'uploading';

                                    return (
                                        <div key={doc.id} className={`relative flex flex-col p-4 rounded-xl border-2 transition-all ${isUploaded
                                            ? 'border-green-500/30 bg-green-50 dark:bg-green-900/10 dark:border-green-500/30'
                                            : 'border-dashed border-[#e7edf3] dark:border-slate-700 hover:border-[#137fec]/50 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}>
                                            {!isUploaded && !isUploading && (
                                                <input
                                                    type="file"
                                                    accept="image/*,application/pdf"
                                                    onChange={(e) => handleFileChange(e, doc.id)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                            )}

                                            <div className="flex items-start justify-between mb-3">
                                                <div className={`size-10 rounded-lg flex items-center justify-center ${isUploaded ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}>
                                                    <span className="material-symbols-outlined">{isUploaded ? 'check' : doc.icon}</span>
                                                </div>
                                                {isUploaded && (
                                                    <button
                                                        onClick={() => removeFile(doc.id)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors z-20"
                                                        title="Remover arquivo"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">close</span>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <h5 className={`font-semibold text-sm ${isUploaded ? 'text-green-700 dark:text-green-400' : 'text-[#0d141b] dark:text-white'}`}>
                                                    {doc.label}
                                                </h5>
                                                {isUploaded ? (
                                                    <p className="text-xs text-green-600/80 dark:text-green-400/80 truncate">
                                                        {fileObj.file?.name}
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {doc.description}
                                                    </p>
                                                )}
                                            </div>

                                            {isUploading && (
                                                <div className="mt-3 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#137fec] rounded-full transition-all duration-300" style={{ width: `${fileObj.progress}%` }}></div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 mt-2 border-t border-[#e7edf3] dark:border-[#2d3b4a]">
                            <button className="w-full md:w-auto px-6 py-3 rounded-lg text-[#0d141b] dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2" type="button">
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Voltar
                            </button>
                            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                                <div className="flex items-center gap-2 text-xs text-[#4c739a] dark:text-gray-500">
                                    <span className="material-symbols-outlined text-base">lock</span>
                                    <span className="whitespace-nowrap">Dados criptografados de ponta a ponta</span>
                                </div>
                                <button
                                    onClick={handleContinue}
                                    disabled={uploading}
                                    className="w-full md:w-auto px-8 py-3 rounded-lg bg-[#137fec] hover:bg-[#0f65bd] text-white font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    {uploading ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            Salvar e Continuar
                                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Help */}
                <div className="text-center pb-10">
                    <p className="text-sm text-[#4c739a] dark:text-gray-500">
                        Está tendo problemas com a documentação? <a className="text-[#137fec] hover:underline font-medium" href="#">Fale com nosso suporte</a>
                    </p>
                </div>
            </main>
        </div>
    );
}
