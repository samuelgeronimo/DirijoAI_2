"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface LearningPreferencesProps {
    preferences: Record<string, boolean> | null;
    profileId: string;
}

export function LearningPreferences({ preferences = {}, profileId }: LearningPreferencesProps) {
    // Default config ensuring we handle null/undefined
    const [prefs, setPrefs] = useState<Record<string, boolean>>({
        fear_highway: false,
        silent_instructor: false,
        intensive_classes: false,
        nervous_driver: true,
        ...preferences
    });

    const supabase = createClient();

    const handleToggle = async (key: string, value: boolean) => {
        const newPrefs = { ...prefs, [key]: value };
        setPrefs(newPrefs);

        // Auto-save on toggle
        try {
            await supabase
                .from('profiles')
                .update({ preferences: newPrefs })
                .eq('id', profileId);
        } catch (err) {
            console.error("Error saving preferences:", err);
        }
    };

    return (
        <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-student-primary">
                        <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Meu Jeito de Aprender
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Personalize sua experiência para reduzir a ansiedade.
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    {/* Toggle Item 1 */}
                    <PreferenceItem
                        icon="warning"
                        iconColor="text-red-500 bg-red-50 dark:bg-red-900/20"
                        title="Tenho medo de dirigir em rodovias"
                        description="Avisaremos seu instrutor automaticamente para evitar essas rotas inicialmente."
                        checked={prefs.fear_highway}
                        onChange={(v: boolean) => handleToggle('fear_highway', v)}
                    />

                    {/* Toggle Item 2 */}
                    <PreferenceItem
                        icon="volume_off"
                        iconColor="text-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        title="Prefiro instrutores mais silenciosos"
                        description="Foco total na condução, com menos conversa casual."
                        checked={prefs.silent_instructor}
                        onChange={(v: boolean) => handleToggle('silent_instructor', v)}
                    />

                    {/* Toggle Item 3 */}
                    <PreferenceItem
                        icon="schedule"
                        iconColor="text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
                        title="Tenho pressa (Aulas intensivas)"
                        description="Sinaliza que você deseja agendar aulas com maior frequência."
                        checked={prefs.intensive_classes}
                        onChange={(v: boolean) => handleToggle('intensive_classes', v)}
                    />

                    {/* Toggle Item 4 */}
                    <PreferenceItem
                        icon="spa"
                        iconColor="text-green-600 bg-green-50 dark:bg-green-900/20"
                        title="Sou uma pessoa tímida/nervosa ao volante"
                        description="Instruções mais calmas e reforço positivo."
                        checked={prefs.nervous_driver}
                        onChange={(v: boolean) => handleToggle('nervous_driver', v)}
                    />
                </div>
            </div>
        </div>
    );
}

function PreferenceItem({ icon, iconColor, title, description, checked, onChange }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <div className="flex gap-4 items-center">
                <div className={`${iconColor} p-2 rounded-full hidden sm:block`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                        {title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                </div>
            </div>
            <label className="inline-flex items-center cursor-pointer ml-4">
                <input
                    checked={!!checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only peer"
                    type="checkbox"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-student-primary relative"></div>
            </label>
        </div>
    )
}
