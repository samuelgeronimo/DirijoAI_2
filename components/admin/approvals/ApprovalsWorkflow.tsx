"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { DocumentVisualizer } from "./DocumentVisualizer";

// Local types for now, or import from central types
type Document = {
    id: string;
    type: string; // 'cnh', 'crlv', etc.
    url: string;
    status: 'pending' | 'valid' | 'rejected';
    metadata: any;
};

type Vehicle = {
    id: string;
    model: string;
    brand: string;
    year: number;
    plate: string;
    color: string;
    photo_url: string | null; // Legacy support
    photo_urls: string[] | null;
    features: string[] | null;
};

type SuccessStory = {
    id: string;
    photo_url: string;
    student_name: string;
    badge: string;
    created_at: string;
};

type InstructorWithDetails = {
    id: string;
    status: string;
    phone: string;
    cpf: string;
    bio: string;
    video_url: string | null;
    superpowers: string[] | null;
    cnh_number: string;
    cnh_category: string;
    cnh_issue_state: string;
    detran_registry_number: string; // CFI
    service_city: string | null;
    service_mode: string | null;
    city: string | null;
    state: string | null;
    neighborhood: string | null;
    street: string | null;
    number: string | null;
    complement: string | null;
    zip_code: string | null;
    created_at: string;
    vehicles: Vehicle[];
    success_stories: SuccessStory[];
    profiles: {
        full_name: string;
        avatar_url: string;
        email: string;
    };
    documents: Document[];
};

interface ApprovalsWorkflowProps {
    instructors: InstructorWithDetails[];
}

const BADGE_INFO: Record<string, { label: string, icon: string, color: string }> = {
    'first_try': { label: 'Passou de 1ª', icon: 'check_circle', color: 'bg-green-100 text-green-700' },
    'perfect_parking': { label: 'Baliza Perfeita', icon: 'local_parking', color: 'bg-blue-100 text-blue-700' },
    'fear_lost': { label: 'Perdeu o Medo', icon: 'psychology', color: 'bg-purple-100 text-purple-700' },
    '20_lessons': { label: '20 Aulas', icon: 'timer', color: 'bg-orange-100 text-orange-700' },
    'default': { label: 'Conquista', icon: 'emoji_events', color: 'bg-slate-100 text-slate-700' }
};

export function ApprovalsWorkflow({ instructors: initialInstructors }: ApprovalsWorkflowProps) {
    const [instructors, setInstructors] = useState(initialInstructors);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'personal' | 'vehicle' | 'docs' | 'stories'>('personal');

    // State to override the main visualizer (e.g. when clicking a vehicle photo)
    const [overrideImage, setOverrideImage] = useState<{ url: string; type: string } | null>(null);

    const currentInstructor = instructors[currentIndex];

    // Derived state for current document (defaults to 0)
    const [currentDocIndex, setCurrentDocIndex] = useState(0);

    // Reset states when changing instructor
    const handleNextInstructor = (newIndex: number) => {
        setCurrentIndex(newIndex);
        setCurrentDocIndex(0);
        setOverrideImage(null);
        setActiveTab('personal');
    };

    if (!currentInstructor) {
        return (
            <div className="flex-1 flex items-center justify-center flex-col gap-4 text-slate-500">
                <span className="material-symbols-outlined text-6xl">check_circle</span>
                <p className="text-xl font-medium">Não há cadastros pendentes!</p>
            </div>
        );
    }

    // Determine what to show in Visualizer
    // If override is set (e.g. vehicle photo), use it.
    // Otherwise use the currently selected document.
    const currentDoc = currentInstructor.documents && currentInstructor.documents.length > 0
        ? currentInstructor.documents[currentDocIndex]
        : null;

    const visualizerUrl = overrideImage?.url || currentDoc?.url;
    const visualizerType = overrideImage?.type || currentDoc?.type || "Sem Documento";

    const handleNext = () => {
        if (currentIndex < instructors.length - 1) {
            handleNextInstructor(currentIndex + 1);
        } else {
            alert("Você chegou ao fim da fila!");
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            handleNextInstructor(currentIndex - 1);
        }
    };

    const handleApprove = async () => {
        if (!currentInstructor) return;
        if (!confirm(`Aprovar ${currentInstructor.profiles.full_name}?`)) return;

        setLoading(true);
        const supabase = createClient();

        // Update Instructor Status
        const { error } = await supabase
            .from('instructors')
            .update({ status: 'active' })
            .eq('id', currentInstructor.id);

        if (error) {
            alert("Erro ao aprovar: " + error.message);
        } else {
            setInstructors(prev => prev.filter(i => i.id !== currentInstructor.id));
            if (currentIndex >= instructors.length - 1) {
                handleNextInstructor(Math.max(0, instructors.length - 2));
            }
        }
        setLoading(false);
    };

    const handleReject = async () => {
        if (!currentInstructor) return;
        const reason = prompt("Motivo da rejeição:");
        if (!reason) return;

        setLoading(true);
        const supabase = createClient();

        const { error } = await supabase
            .from('instructors')
            .update({ status: 'suspended' })
            .eq('id', currentInstructor.id);

        if (error) {
            alert("Erro ao rejeitar: " + error.message);
        } else {
            setInstructors(prev => prev.filter(i => i.id !== currentInstructor.id));
            if (currentIndex >= instructors.length - 1) {
                handleNextInstructor(Math.max(0, instructors.length - 2));
            }
        }
        setLoading(false);
    };

    // Helper to render field
    const Field = ({ label, value }: { label: string, value: string | number | null | undefined }) => (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white break-words">{value || "--"}</span>
        </div>
    );

    const vehicle = currentInstructor.vehicles?.[0]; // Assuming 1 vehicle for now

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Visualizer */}
            <DocumentVisualizer
                documentUrl={visualizerUrl}
                documentType={visualizerType}
            />

            {/* Right: Dashboard/Sidebar */}
            <aside className="w-[450px] bg-white dark:bg-[#111a22] border-l border-gray-200 dark:border-[#233648] flex flex-col shrink-0 overflow-y-auto">
                {/* Context Header */}
                <div className="p-6 pb-2 border-b border-gray-200 dark:border-[#233648]">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-3">
                            <div
                                className="size-12 rounded-full bg-cover bg-center ring-2 ring-[#137fec]/50"
                                style={{
                                    backgroundImage: `url('${currentInstructor.profiles.avatar_url || "https://ui-avatars.com/api/?name=" + currentInstructor.profiles.full_name}')`,
                                }}
                            ></div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                    {currentInstructor.profiles.full_name}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {currentInstructor.profiles.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10">
                                Pendente: {instructors.length}
                            </span>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex border-b border-gray-100 dark:border-gray-800">
                        <button
                            onClick={() => setActiveTab('personal')}
                            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'personal' ? 'border-[#137fec] text-[#137fec]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Dados
                        </button>
                        <button
                            onClick={() => setActiveTab('vehicle')}
                            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'vehicle' ? 'border-[#137fec] text-[#137fec]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Veículo
                        </button>
                        <button
                            onClick={() => setActiveTab('docs')}
                            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'docs' ? 'border-[#137fec] text-[#137fec]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Docs
                        </button>
                        <button
                            onClick={() => setActiveTab('stories')}
                            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stories' ? 'border-[#137fec] text-[#137fec]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Histórico
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {activeTab === 'personal' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">Informações Pessoais</h3>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                <Field label="CPF" value={currentInstructor.cpf} />
                                <Field label="Celular" value={currentInstructor.phone} />
                                <Field label="Registro DETRAN (CFI)" value={currentInstructor.detran_registry_number} />
                                <Field label="CNH" value={currentInstructor.cnh_number} />
                                <Field label="Categoria" value={currentInstructor.cnh_category} />
                                <Field label="Estado Emissor" value={currentInstructor.cnh_issue_state} />
                                <Field label="Cidade de Atuação" value={currentInstructor.service_city} />
                                <Field
                                    label="Modo de Atendimento"
                                    value={
                                        currentInstructor.service_mode === 'student_home' ? 'Busca em Casa' :
                                            currentInstructor.service_mode === 'meeting_point' ? 'Ponto de Encontro' :
                                                currentInstructor.service_mode === 'both' ? 'Ambos (Flexível)' :
                                                    '--'
                                    }
                                />
                                <div className="col-span-2">
                                    <Field label="Data de Cadastro" value={new Date(currentInstructor.created_at).toLocaleString('pt-BR')} />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Endereço</h4>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                    <Field label="CEP" value={currentInstructor.zip_code} />
                                    <Field label="Logradouro" value={currentInstructor.street} />
                                    <Field label="Número" value={currentInstructor.number} />
                                    <Field label="Complemento" value={currentInstructor.complement} />
                                    <Field label="Bairro" value={currentInstructor.neighborhood} />
                                    <Field label="Cidade/UF" value={`${currentInstructor.city || ''} - ${currentInstructor.state || ''}`} />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                                <Field label="Bio" value={currentInstructor.bio} />
                            </div>

                            {currentInstructor.superpowers && currentInstructor.superpowers.length > 0 && (
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Superpoderes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {currentInstructor.superpowers.map(power => (
                                            <span key={power} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-[#137fec] text-xs rounded-full border border-blue-100 dark:border-blue-900/30">
                                                {power}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentInstructor.video_url && (
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Apresentação</h4>
                                    <button
                                        onClick={() => setOverrideImage({ url: currentInstructor.video_url!, type: 'Vídeo de Apresentação' })}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-100 dark:border-red-900/30"
                                    >
                                        <span className="material-symbols-outlined">play_circle</span>
                                        Assistir Vídeo de Apresentação
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'vehicle' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">Dados do Veículo</h3>
                            {vehicle ? (
                                <>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                        <Field label="Modelo" value={vehicle.model} />
                                        <Field label="Marca" value={vehicle.brand} />
                                        <Field label="Ano" value={vehicle.year} />
                                        <Field label="Placa" value={vehicle.plate} />
                                        <Field label="Cor" value={vehicle.color} />
                                        <div className="col-span-2">
                                            <Field label="ID Veículo" value={vehicle.id} />
                                        </div>
                                    </div>

                                    {vehicle.features && vehicle.features.length > 0 && (
                                        <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Conforto e Segurança</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {vehicle.features.map(feature => (
                                                    <span key={feature} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Fotos do Veículo</h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            {/* Legacy single photo */}
                                            {/* @ts-ignore */}
                                            {vehicle.photo_url && (
                                                <button
                                                    onClick={() => setOverrideImage({ url: vehicle.photo_url!, type: 'Foto Principal' })}
                                                    className="aspect-square rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:ring-2 hover:ring-[#137fec] transition-all relative"
                                                >
                                                    <Image
                                                        src={vehicle.photo_url}
                                                        alt="Foto principal do veículo"
                                                        fill
                                                        className="object-cover"
                                                        sizes="100px"
                                                    />
                                                </button>
                                            )}
                                            {/* Array photos */}
                                            {vehicle.photo_urls?.map((url, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setOverrideImage({ url, type: `Foto do Veículo ${idx + 1}` })}
                                                    className="aspect-square rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:ring-2 hover:ring-[#137fec] transition-all relative"
                                                >
                                                    <Image
                                                        src={url}
                                                        alt={`Foto do veículo ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="100px"
                                                    />
                                                </button>
                                            ))}
                                            {(!vehicle.photo_urls || vehicle.photo_urls.length === 0) && !vehicle['photo_url' as keyof Vehicle] && (
                                                <p className="text-xs text-slate-400 col-span-3">Nenhuma foto cadastrada.</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-slate-500 text-sm">Nenhum veículo cadastrado.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'docs' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">Documentos Enviados</h3>
                            <div className="flex flex-col gap-2">
                                {currentInstructor.documents?.map((doc, idx) => (
                                    <button
                                        key={doc.id}
                                        onClick={() => {
                                            setOverrideImage(null); // Clear override to show doc
                                            setCurrentDocIndex(idx);
                                        }}
                                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${!overrideImage && idx === currentDocIndex
                                            ? 'bg-blue-50 dark:bg-blue-900/20 border-[#137fec] ring-1 ring-[#137fec]'
                                            : 'bg-white dark:bg-[#1e2936] border-slate-200 dark:border-slate-700 hover:border-[#137fec]/50'
                                            }`}
                                    >
                                        <div className="size-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                            <span className="material-symbols-outlined text-lg">description</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{doc.type}</p>
                                            <p className="text-xs text-slate-500 truncate">{new Date().toLocaleDateString()}</p>
                                        </div>
                                        {doc.status === 'valid' && <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>}
                                    </button>
                                ))}
                                {(!currentInstructor.documents || currentInstructor.documents.length === 0) && (
                                    <p className="text-slate-500 text-sm text-center py-4">Nenhum documento enviado.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'stories' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-yellow-500">emoji_events</span>
                                Histórico de Aprovação
                            </h3>
                            <div className="flex flex-col gap-3">
                                {currentInstructor.success_stories && currentInstructor.success_stories.length > 0 ? (
                                    currentInstructor.success_stories.map((story, idx) => {
                                        const badgeData = BADGE_INFO[story.badge] || BADGE_INFO['default'];
                                        return (
                                            <div
                                                key={story.id}
                                                onClick={() => setOverrideImage({ url: story.photo_url, type: `Histórico: ${story.student_name}` })}
                                                className="group flex gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2936] hover:border-[#137fec] hover:ring-1 hover:ring-[#137fec] transition-all cursor-pointer"
                                            >
                                                <div className="size-16 rounded-md overflow-hidden shrink-0 bg-slate-100">
                                                    <Image
                                                        src={story.photo_url}
                                                        alt={story.student_name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{story.student_name}</p>
                                                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded text-xs font-semibold w-fit ${badgeData.color}`}>
                                                        <span className="material-symbols-outlined text-[14px]">{badgeData.icon}</span>
                                                        {badgeData.label}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2 text-slate-400">
                                            <span className="material-symbols-outlined">hide_image</span>
                                        </div>
                                        <p className="text-sm text-slate-500">Nenhum histórico de aprovação enviado.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Footer */}
                <div className="p-6 bg-gray-50 dark:bg-[#0f151b] border-t border-gray-200 dark:border-[#233648]">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <button
                            onClick={handleReject}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-[#1e2936] border border-gray-300 dark:border-gray-600 px-4 py-3.5 text-sm font-semibold text-[#ef4444] shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined">thumb_down</span>
                            REJEITAR
                        </button>
                        <button
                            onClick={handleApprove}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#10b981] hover:bg-green-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined">thumb_up</span>
                            APROVAR
                        </button>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                        <button onClick={handlePrev} disabled={currentIndex === 0} className="hover:text-white disabled:opacity-30 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">arrow_back</span> Anterior
                        </button>
                        <span className="font-medium bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                            {currentIndex + 1} / {instructors.length}
                        </span>
                        <button onClick={handleNext} disabled={currentIndex === instructors.length - 1} className="hover:text-white disabled:opacity-30 flex items-center gap-1">
                            Próximo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
