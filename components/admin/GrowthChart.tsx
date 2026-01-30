"use client";

import { useMemo } from "react";

interface GrowthData {
    date: string;
    students: number;
    lessons: number;
}

interface GrowthChartProps {
    data?: GrowthData[];
}

export function GrowthChart({ data = [] }: GrowthChartProps) {
    const { studentPath, lessonPath, dates, gradientPath } = useMemo(() => {
        if (!data.length) return { studentPath: "", lessonPath: "", dates: [], gradientPath: "" };

        const width = 800;
        const height = 240;
        const padding = 20;
        const usableHeight = height - padding * 2;

        const maxVal = Math.max(...data.map(d => Math.max(d.students, d.lessons)), 10); // Minimum scale of 10
        const xStep = width / (data.length - 1 || 1);

        const pointsStudents = data.map((d, i) => {
            const x = i * xStep;
            const y = height - padding - (d.students / maxVal) * usableHeight;
            return `${x},${y}`;
        });

        const pointsLessons = data.map((d, i) => {
            const x = i * xStep;
            const y = height - padding - (d.lessons / maxVal) * usableHeight;
            return `${x},${y}`;
        });

        // Create smooth bezier curves (simplified as polyline for now for reliability, or simple curve)
        // For a simple "smooth" look without complex control point math, we'll use a standard polyline or basic curve.
        // Let's us basic catmull-rom or just straight lines with some smoothing if possible, 
        // but for simplicity in this artifact, straight lines with slight rounding or just direct SVG path is safest.
        // Actually, let's just do a polyline "L" join for now to ensure no rendering artifacts, 
        // or better, a simple smoothing function if we want it "premium".
        // Given requirements, let's stick to standard "L" commands for robustness.

        const studentPathCmd = `M ${pointsStudents.join(" L ")}`;
        const lessonPathCmd = `M ${pointsLessons.join(" L ")}`;

        // Gradient close path
        const gradientCmd = `${studentPathCmd} V ${height} H 0 Z`;

        // Format dates for X axis (take 5 evenly distributed dates)
        const dateLabels = data
            .filter((_, i) => i % Math.ceil(data.length / 5) === 0)
            .map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
            })
            .slice(0, 5);

        return {
            studentPath: studentPathCmd,
            lessonPath: lessonPathCmd,
            dates: dateLabels,
            gradientPath: gradientCmd
        };
    }, [data]);

    return (
        <div className="lg:col-span-2 rounded-xl bg-[#233648] border border-[#334b63] p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white text-base font-bold">Growth Metrics (30 Dias)</h3>
                    <p className="text-[#92adc9] text-sm">
                        Novos Alunos vs Aulas Agendadas
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#137fec]"></span>
                        <span className="text-[#92adc9]">Novos Alunos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#92adc9]"></span>
                        <span className="text-[#92adc9]">Aulas</span>
                    </div>
                </div>
            </div>
            {/* SVG Chart */}
            <div className="w-full h-[240px] flex items-end justify-between gap-1 mt-auto relative">
                {/* Grid lines background */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                    <div className="w-full h-px bg-[#334b63]/30 border-dashed border-b border-[#334b63]/30"></div>
                </div>
                {data.length > 0 ? (
                    <svg
                        className="absolute inset-0 w-full h-full z-10"
                        preserveAspectRatio="none"
                        viewBox="0 0 800 240"
                    >
                        <defs>
                            <linearGradient id="gradientPrimary" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#137fec" stopOpacity="0.3"></stop>
                                <stop offset="100%" stopColor="#137fec" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                        {/* Line 1: New Students */}
                        <path
                            d={studentPath}
                            fill="none"
                            stroke="#137fec"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                        ></path>
                        <path
                            className="opacity-40"
                            d={gradientPath}
                            fill="url(#gradientPrimary)"
                        ></path>
                        {/* Line 2: Classes */}
                        <path
                            d={lessonPath}
                            fill="none"
                            stroke="#92adc9"
                            strokeDasharray="5,5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        ></path>
                    </svg>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#92adc9]">
                        Sem dados para o período
                    </div>
                )}
            </div>
            <div className="flex justify-between mt-4 text-[#92adc9] text-xs font-medium uppercase tracking-wider">
                {dates.map((d, i) => (
                    <span key={i}>{d}</span>
                ))}
            </div>
        </div>
    );
}
