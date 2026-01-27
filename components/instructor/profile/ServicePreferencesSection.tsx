"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface ServicePreferencesSectionProps {
    instructor: any;
    instructorId: string;
}

export function ServicePreferencesSection({ instructor, instructorId }: ServicePreferencesSectionProps) {
    const [serviceMode, setServiceMode] = useState(instructor?.service_mode || 'both');
    const [loadingCep, setLoadingCep] = useState(false);
    const [form, setForm] = useState({
        meeting_point_name: instructor?.meeting_point_name || '',
        zip_code: instructor?.zip_code || '',
        street: instructor?.street || '',
        number: instructor?.number || '',
        complement: instructor?.complement || '',
        neighborhood: instructor?.neighborhood || '',
        city: instructor?.city || '',
        state: instructor?.state || ''
    });

    const supabase = createClient();

    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    const handleServiceModeChange = async (mode: string) => {
        setServiceMode(mode);
        setSaveStatus('saving');
        try {
            const { error } = await supabase.from('instructors').update({ service_mode: mode }).eq('id', instructorId);
            if (error) throw error;
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err) {
            console.error("Error saving service mode:", err);
            setSaveStatus('error');
        }
    };

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let cep = e.target.value.replace(/\D/g, '');
        if (cep.length > 8) cep = cep.substring(0, 8);

        let formattedCep = cep;
        if (cep.length > 5) {
            formattedCep = `${cep.substring(0, 5)}-${cep.substring(5)}`;
        }

        setForm(prev => ({ ...prev, zip_code: formattedCep }));

        if (cep.length === 8) {
            setLoadingCep(true);
            setSaveStatus('saving');
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    const newAddress = {
                        zip_code: formattedCep,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    };
                    setForm(prev => ({ ...prev, ...newAddress }));
                    const { error } = await supabase.from('instructors').update(newAddress).eq('id', instructorId);
                    if (error) throw error;
                    setSaveStatus('saved');
                    setTimeout(() => setSaveStatus('idle'), 2000);
                }
            } catch (err) {
                console.error("Erro ao buscar CEP:", err);
                setSaveStatus('error');
            } finally {
                setLoadingCep(false);
            }
        }
    };

    const handleInputChange = async (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
        setSaveStatus('saving');
        try {
            const { error } = await supabase.from('instructors').update({ [key]: value }).eq('id', instructorId);
            if (error) {
                console.error(`Supabase error saving ${key}:`, error);
                setSaveStatus('error');
                if (error.message.includes('column') && error.message.includes('not found')) {
                    alert(`Erro: A coluna "${key}" não foi encontrada no banco de dados. Por favor, verifique se as migrações foram aplicadas.`);
                }
            } else {
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000);
            }
        } catch (err) {
            console.error(`Unexpected error saving ${key}:`, err);
            setSaveStatus('error');
        }
    };

    return (
        <section className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary">
                        settings_accessibility
                    </span>
                    Preferências de Atendimento
                </h2>
                <div className="flex items-center gap-2 text-xs font-medium">
                    {saveStatus === 'saving' && (
                        <span className="text-slate-400 flex items-center gap-1">
                            <span className="size-2 bg-yellow-500 rounded-full animate-pulse"></span>
                            Salvando...
                        </span>
                    )}
                    {saveStatus === 'saved' && (
                        <span className="text-instructor-primary flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Alterações salvas
                        </span>
                    )}
                    {saveStatus === 'error' && (
                        <span className="text-red-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            Erro ao salvar
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a3324] p-6 rounded-xl border border-slate-200 dark:border-[#2f5c3e] shadow-sm flex flex-col gap-8">
                {/* Service Mode Selection */}
                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-slate-500 dark:text-[#92c9a4] uppercase tracking-wider">
                        Como você atende seus alunos?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ServiceModeCard
                            active={serviceMode === 'meeting_point'}
                            onClick={() => handleServiceModeChange('meeting_point')}
                            icon="location_on"
                            title="Ponto de Encontro"
                            description="O aluno vem até o local combinado."
                        />
                        <ServiceModeCard
                            active={serviceMode === 'student_home'}
                            onClick={() => handleServiceModeChange('student_home')}
                            icon="home"
                            title="Vou até o Aluno"
                            description="Busco o aluno no endereço dele."
                        />
                        <ServiceModeCard
                            active={serviceMode === 'both'}
                            onClick={() => handleServiceModeChange('both')}
                            icon="sync_alt"
                            title="Ambos"
                            description="Flexibilidade para você e seu aluno."
                        />
                    </div>
                </div>

                {/* Meeting Point Address - Only if not 'student_home' only */}
                {serviceMode !== 'student_home' && (
                    <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 dark:border-[#23482f] animate-fade-in">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-instructor-primary">place</span>
                            <h3 className="font-bold text-white">Endereço do Ponto de Encontro</h3>
                        </div>

                        <div className="mb-4">
                            <label className="text-xs font-bold text-slate-500 uppercase">Apelido do Ponto de Encontro (Ex: Posto Ipiranga, Em frente ao Metrô)</label>
                            <input
                                placeholder="Dê um nome fácil para o aluno encontrar"
                                className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-instructor-primary/20 outline-none mt-1"
                                value={form.meeting_point_name}
                                onChange={e => handleInputChange('meeting_point_name', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">CEP</label>
                                <div className="relative">
                                    <input
                                        placeholder="00000-000"
                                        className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-instructor-primary/20 outline-none"
                                        value={form.zip_code}
                                        onChange={handleCepChange}
                                        maxLength={9}
                                    />
                                    {loadingCep && (
                                        <div className="absolute right-2 top-2.5 animate-spin h-4 w-4 border-2 border-instructor-primary border-t-transparent rounded-full"></div>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Rua</label>
                                <input
                                    placeholder="Nome da rua ou avenida"
                                    className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm"
                                    value={form.street}
                                    onChange={e => handleInputChange('street', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Número</label>
                                <input
                                    placeholder="Nº"
                                    className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm"
                                    value={form.number}
                                    onChange={e => handleInputChange('number', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Bairro</label>
                                <input
                                    placeholder="Bairro"
                                    className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm"
                                    value={form.neighborhood}
                                    onChange={e => handleInputChange('neighborhood', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Complemento (Opcional)</label>
                                <input
                                    placeholder="Próximo ao metrô, praça, etc"
                                    className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm"
                                    value={form.complement}
                                    onChange={e => handleInputChange('complement', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Cidade</label>
                                <input
                                    placeholder="Cidade"
                                    className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm opacity-70"
                                    value={form.city}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">UF</label>
                                <input
                                    placeholder="UF"
                                    className="w-full bg-slate-50 dark:bg-[#0d1a11] border border-slate-200 dark:border-[#2f5c3e] rounded-lg p-2.5 text-sm opacity-70 text-center"
                                    value={form.state}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function ServiceModeCard({ active, onClick, icon, title, description }: any) {
    return (
        <label
            onClick={onClick}
            className={`flex flex-col gap-3 p-5 rounded-xl border-2 transition-all cursor-pointer group ${active
                ? 'bg-instructor-primary/10 border-instructor-primary'
                : 'bg-slate-50/50 dark:bg-[#0d1a11] border-slate-200 dark:border-[#23482f] hover:border-slate-300 dark:hover:border-[#2f5c3e]'
                }`}
        >
            <div className={`p-2 rounded-lg w-fit transition-colors ${active ? 'bg-instructor-primary text-[#102216]' : 'bg-slate-100 dark:bg-[#112217] text-slate-500 dark:text-[#92c9a4]'
                }`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <p className={`font-bold transition-colors ${active ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {title}
                </p>
                <p className="text-xs text-slate-500 dark:text-[#92c9a4] leading-snug">
                    {description}
                </p>
            </div>
        </label>
    );
}
