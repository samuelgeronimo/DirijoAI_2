"use client";

import { useState } from "react";

interface SliderProps {
    label: string;
    icon: string;
    value: number;
    onChange: (val: number) => void;
}

function Slider({ label, icon, value, onChange }: SliderProps) {
    return (
        <div className="flex flex-col gap-3 group">
            <div className="flex justify-between items-center">
                <label className="text-slate-700 dark:text-white text-base font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary text-xl">
                        {icon}
                    </span>
                    {label}
                </label>
                <span className="text-slate-900 dark:text-white text-sm font-bold bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded">
                    {value}/10
                </span>
            </div>
            <div className="relative w-full h-6 flex items-center">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 rounded-full accent-instructor-primary h-1 bg-gray-200 dark:bg-gray-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-instructor-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(19,236,91,0.5)]"
                />
            </div>
        </div>
    );
}

export function PerformanceSliders() {
    const [clutchControl, setClutchControl] = useState(8);
    const [spatialAwareness, setSpatialAwareness] = useState(6);
    const [lawRespect, setLawRespect] = useState(9);

    return (
        <div className="space-y-6">
            <Slider
                label="Controle de Embreagem"
                icon="settings_motion_mode"
                value={clutchControl}
                onChange={setClutchControl}
            />
            <Slider
                label="Noção de Espaço"
                icon="minor_crash"
                value={spatialAwareness}
                onChange={setSpatialAwareness}
            />
            <Slider
                label="Respeito às Leis"
                icon="gavel"
                value={lawRespect}
                onChange={setLawRespect}
            />
        </div>
    );
}
