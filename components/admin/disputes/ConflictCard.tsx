"use client";

"use client";

import { DisputeDetail } from "@/types/admin-dispute";

interface ConflictCardProps {
    student: DisputeDetail['student'];
    instructor: DisputeDetail['instructor'];
    lesson: DisputeDetail['lesson'];
}

export function ConflictCard({ student, instructor, lesson }: ConflictCardProps) {
    // Determine instructor profile safely
    const instructorProfile = instructor?.profiles;
    const instructorName = instructorProfile?.full_name || 'Instrutor';
    const instructorAvatar = instructorProfile?.avatar_url;
    const instructorRating = instructor?.rating || 5.0;

    // Determine student profile
    const studentName = student?.full_name || 'Aluno';
    const studentAvatar = student?.avatar_url;
    // reputation_score is usually 0-100 or 0-5. Assuming 0-100, divide by 20 for 5-star scale.
    // If it's already 5, then just use it. Let's assume 0-100 for now based on 'reputation_score'.
    const studentRating = (student?.reputation_score || 100) / 20;

    const lessonTime = lesson?.scheduled_at ? new Date(lesson.scheduled_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--';

    return (
        <div className="bg-[#111a22] rounded-xl border border-[#324d67] shadow-lg overflow-hidden">
            <div className="p-5 flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex items-center justify-between md:justify-start gap-8 md:gap-16 relative">
                    <div className="hidden md:block absolute top-1/2 left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-emerald-500/20 via-[#324d67] to-[#137fec]/20 -z-10 transform -translate-y-1/2"></div>
                    {/* Instructor */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                        <div className="relative">
                            <div
                                className="size-16 rounded-full bg-cover bg-center border-2 border-[#324d67] shadow-xl"
                                style={{
                                    backgroundImage: `url("${instructorAvatar || 'https://via.placeholder.com/150'}")`,
                                }}
                            ></div>
                            <div className="absolute -bottom-1 -right-1 bg-[#137fec] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#111a22]">
                                INSTRUTOR
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">{instructorName}</p>
                            <div className="flex items-center justify-center gap-1 text-xs text-[#92adc9]">
                                <span
                                    className="material-symbols-outlined text-[12px] text-yellow-400"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    star
                                </span>
                                {Number(instructorRating).toFixed(1)}
                            </div>
                        </div>
                    </div>
                    {/* Middle Info */}
                    <div className="flex flex-col items-center gap-1 bg-[#1e293b] px-4 py-2 rounded-lg border border-[#324d67]">
                        <span className="text-xs text-[#92adc9] uppercase tracking-widest font-bold">
                            Aula
                        </span>
                        <span className="text-white font-mono text-lg font-bold">
                            {lessonTime}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">
                            {lesson?.status || 'Confirmada'}
                        </span>
                    </div>
                    {/* Student */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                        <div className="relative">
                            <div
                                className="size-16 rounded-full bg-cover bg-center border-2 border-[#324d67] shadow-xl"
                                style={{
                                    backgroundImage: `url("${studentAvatar || 'https://via.placeholder.com/150'}")`,
                                }}
                            ></div>
                            <div className="absolute -bottom-1 -left-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#111a22]">
                                ALUNO
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">{studentName}</p>
                            <div className="flex items-center justify-center gap-1 text-xs text-[#92adc9]">
                                <span
                                    className="material-symbols-outlined text-[12px] text-yellow-400"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    star
                                </span>
                                {studentRating.toFixed(1)}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map Preview */}
                <div className="w-full md:w-[320px] h-[120px] rounded-lg border border-[#324d67] bg-[#1a2632] relative overflow-hidden group">
                    {/* Keeping static map for now as coordinates logic is complex */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "radial-gradient(#4b6a88 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    ></div>
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-[#324d67]/50 transform -rotate-6"></div>
                    <div className="absolute top-0 left-1/3 h-full w-2 bg-[#324d67]/50 transform rotate-12"></div>
                    <div className="absolute top-[40%] left-[45%] flex flex-col items-center transform transition-transform group-hover:-translate-y-1">
                        <span
                            className="material-symbols-outlined text-red-500 text-3xl drop-shadow-lg"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            location_on
                        </span>
                        <div className="bg-[#101922]/90 text-white text-[10px] px-2 py-0.5 rounded shadow-lg border border-[#324d67] whitespace-nowrap">
                            {lesson?.pickup_address || "Ponto de Encontro"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
