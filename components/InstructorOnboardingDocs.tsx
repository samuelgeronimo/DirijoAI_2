"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { formatCPF, validateCPF } from "@/utils/validators";

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
    const [cpfError, setCpfError] = useState<string | null>(null);
    const [cfi, setCfi] = useState("");
    const [cnhNumber, setCnhNumber] = useState("");
    const [cnhCategory, setCnhCategory] = useState("");
    const [cnhState, setCnhState] = useState("");

    // File State: Keyed by doc id (e.g. 'cnh_front')
    const [files, setFiles] = useState<Record<string, DocumentFile>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

        // Validate CPF
        if (!validateCPF(cpf)) {
            setCpfError("CPF Inválido");
            alert("Por favor, corrija o CPF antes de continuar.");
            return;
        }

        // CNH Validation: Either (front + back) OR digital
        const hasCnhFront = files['cnh_front']?.status === 'completed';
        const hasCnhBack = files['cnh_back']?.status === 'completed';
        const hasCnhDigital = files['cnh_digital']?.status === 'completed';
        const hasPhysicalCnh = hasCnhFront && hasCnhBack;
        const hasValidCnh = hasPhysicalCnh || hasCnhDigital;

        if (!hasValidCnh) {
            alert("Por favor, envie:\n- Frente E Verso da CNH física, OU\n- CNH Digital (PDF)");
            return;
        }

        // Validate other required documents (excluding cnh_digital which is now optional)
        const otherRequiredDocs = DOC_TYPES.filter(doc =>
            doc.id !== 'cnh_front' &&
            doc.id !== 'cnh_back' &&
            doc.id !== 'cnh_digital'
        );
        const missingOtherDocs = otherRequiredDocs.filter(doc =>
            !files[doc.id] || files[doc.id].status !== 'completed'
        );

        if (missingOtherDocs.length > 0 || !user) {
            alert(`Por favor, envie todos os documentos obrigatórios:\n${missingOtherDocs.map(d => "- " + d.label).join("\n")}`);
            return;
        }

        setUploading(true);
        try {
            // 0. Ensure Profile Exists (Self-healing)
            const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();
            if (!profile) {
                await supabase.from('profiles').insert({
                    id: user.id,
                    email: user.email,
                    role: 'instructor',
                    full_name: user.user_metadata?.full_name || 'Instrutor',
                    avatar_url: user.user_metadata?.avatar_url
                });
            }

            const { error: updateError } = await supabase
                .from('instructors')
                .upsert({
                    id: user.id,
                    cpf: cpf,
                    cnh_number: cnhNumber,
                    cnh_category: cnhCategory,
                    cnh_issue_state: cnhState,
                    detran_registry_number: cfi,
                    current_onboarding_step: 4,
                    status: 'pending_docs' // Ensure status is set for new records
                }, { onConflict: 'id' });

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

    const renderUploadCard = (docId: string, label: string, desc: string, icon: string) => {
        const fileState = files[docId];
        const isCompleted = fileState?.status === 'completed';

        return (
            <div className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all ${isCompleted
                ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-[#137fec] hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                {isCompleted ? (
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-green-500 mb-2">check_circle</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center">{label}</span>
                        <span className="text-xs text-green-600 dark:text-green-400 mt-1">Enviado com sucesso</span>
                        <button
                            onClick={() => removeFile(docId)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                            title="Remover arquivo"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            type="file"
                            id={docId}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => handleFileChange(e, docId)}
                            accept="image/*,.pdf"
                        />
                        <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">{icon}</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center">{label}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1 px-2">{desc}</span>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans text-slate-900 dark:text-slate-100 flex flex-col items-center py-10">
            <div className="w-full max-w-3xl px-4">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Documentação</h1>
                    <p className="text-slate-500 dark:text-slate-400">Envie fotos legíveis dos seus documentos para validação.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                    <div className="flex flex-col gap-8">

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="text-sm font-bold text-[#137fec] mb-1">Confidencialidade</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Seus documentos são armazenados com criptografia de ponta e acessíveis apenas pela equipe de verificação.</p>
                        </div>

                        {/* Personal Docs Row (CPF, CFI) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-[#0d141b] dark:text-gray-200">CPF</span>
                                <div className="relative">
                                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined ${cpfError ? 'text-red-500' : 'text-gray-400'}`}>badge</span>
                                    <input
                                        value={cpf}
                                        onChange={(e) => {
                                            const formatted = formatCPF(e.target.value);
                                            setCpf(formatted);
                                            if (formatted.length >= 14) {
                                                const isValid = validateCPF(formatted);
                                                setCpfError(isValid ? null : "CPF Inválido");
                                            } else {
                                                setCpfError(null);
                                            }
                                        }}
                                        onBlur={() => {
                                            if (cpf.length > 0) {
                                                const isValid = validateCPF(cpf);
                                                setCpfError(isValid ? null : "CPF Inválido");
                                            }
                                        }}
                                        className={`w-full pl-11 pr-4 py-3 rounded-lg border bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 transition-all font-medium placeholder:font-normal ${cpfError
                                            ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                                            : 'border-[#e7edf3] dark:border-slate-600 focus:ring-[#137fec]/50 focus:border-[#137fec]'
                                            }`}
                                        placeholder="000.000.000-00"
                                        type="text"
                                        maxLength={14}
                                    />
                                </div>
                                {cpfError && <span className="text-xs text-red-500 font-medium ml-1">{cpfError}</span>}
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
                                        onChange={(e) => setCfi(e.target.value.replace(/\D/g, ''))}
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal"
                                        placeholder="Ex: 123456"
                                        type="text"
                                        maxLength={10}
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
                                        onChange={(e) => setCnhNumber(e.target.value.replace(/\D/g, ''))}
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7edf3] dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-800 text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all font-medium placeholder:font-normal"
                                        placeholder="12345678900"
                                        type="text"
                                        maxLength={11}
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
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                                </div>
                            </label>
                        </div>


                        <section>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Validar CNH</h2>
                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renderUploadCard('cnh_front', 'Frente da CNH', 'Foto legível da parte da frente', 'id_card')}
                                    {renderUploadCard('cnh_back', 'Verso da CNH', 'Foto legível do verso com QR Code', 'id_card')}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                                    <span className="text-sm font-bold text-slate-400">OU</span>
                                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                                </div>
                                <div>
                                    {renderUploadCard('cnh_digital', 'CNH Digital (PDF)', 'Exportação original do app CNH Digital', 'picture_as_pdf')}
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Outros Documentos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderUploadCard('instructor_credential', 'Credencial do Instrutor', 'Carteirah de Instrutor do DETRAN', 'badge')}
                                {renderUploadCard('vehicle_crlv', 'Documento do Veículo', 'Certificado de Registro e Licenciamento', 'directions_car')}
                            </div>
                        </section>

                        {errorMessage && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg flex items-center gap-3">
                                <span className="material-symbols-outlined text-red-500">error</span>
                                <span className="text-sm font-medium text-red-600 dark:text-red-400">{errorMessage}</span>
                            </div>
                        )}

                        <div className="pt-2">
                            <button
                                onClick={handleContinue}
                                disabled={uploading}
                                className="w-full bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {uploading ? "Enviando..." : "Enviar Documentos"}
                                {!uploading && <span className="material-symbols-outlined">arrow_forward</span>}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Steps Indicator */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="h-1.5 w-8 rounded-full bg-[#137fec]"></div>
                    <div className="h-1.5 w-8 rounded-full bg-[#137fec]"></div>
                    <div className="h-1.5 w-8 rounded-full bg-[#137fec]"></div>
                    <div className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>
            </div>
        </div>
    );
}


