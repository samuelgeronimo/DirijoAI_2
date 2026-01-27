"use client";
import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface InstructorCardProps {
    instructor: {
        id: string;
        rating?: number | null;
        bio?: string | null;
        video_url?: string | null;
        service_mode?: string | null;
        meeting_point_name?: string | null;
        superpowers?: string[] | null;
        profiles: {
            full_name: string | null;
            avatar_url: string | null;
        } | null;
        vehicles?: Array<{
            model?: string | null;
            year?: number | null;
            color?: string | null;
            photo_urls?: string[] | null;
        }>;
        instructor_availability?: Array<{
            hourly_rate_cents?: number | null;
        }>;
        reviews?: Array<{ id: string }>;
    };
}

const InstructorCard = memo(({ instructor }: InstructorCardProps) => {
    const priceCents = instructor.instructor_availability?.[0]?.hourly_rate_cents || 0;
    const priceFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceCents / 100);
    const vehicle = instructor.vehicles?.[0];

    return (
        <Link
            href={`/instructor/${instructor.id}`}
            className="group flex flex-col md:flex-row gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#137fec] hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300"
        >
            {/* Thumbnail / Video Indicator */}
            <div className="relative w-full md:w-48 aspect-video md:aspect-[4/3] shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                {vehicle?.photo_urls?.[0] ? (
                    <Image
                        src={vehicle.photo_urls[0]}
                        alt="Veículo"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 192px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800">
                        <span className="material-symbols-outlined text-4xl">directions_car</span>
                    </div>
                )}

                {/* Video Tag Overlay */}
                {instructor.video_url && (
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                        <span className="material-symbols-outlined text-xs fill-current">play_circle</span>
                        VÍDEO
                    </div>
                )}

                {/* Avatar Overlay */}
                <div className="absolute bottom-2 left-2 size-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 overflow-hidden shadow-md z-10">
                    {instructor.profiles?.avatar_url ? (
                        <Image
                            src={instructor.profiles.avatar_url}
                            alt={instructor.profiles.full_name || 'Instrutor'}
                            fill
                            className="object-cover"
                            sizes="40px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xs">
                            {instructor.profiles?.full_name?.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">
                                {instructor.profiles?.full_name}
                            </h3>
                            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm mt-0.5">
                                <span>{instructor.rating || "5.0"}</span>
                                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                <span className="text-slate-400 font-normal ml-1 text-xs">({instructor.reviews?.length || 0} avaliações)</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Hora/Aula</div>
                            <div className="text-xl font-black text-slate-900 dark:text-white text-[#137fec]">
                                {priceFormatted}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {instructor.superpowers?.slice(0, 3).map((power: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-100 dark:border-blue-900/50">
                                {power}
                            </span>
                        ))}
                        {instructor.superpowers && instructor.superpowers.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-500 text-xs border border-slate-100 dark:border-slate-700">
                                +{instructor.superpowers.length - 3}
                            </span>
                        )}
                    </div>

                    {vehicle && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg w-fit">
                            <span className="material-symbols-outlined text-[18px]">directions_car</span>
                            <span className="font-medium">{vehicle.model} {vehicle.year}</span>
                            <span className="text-slate-400">•</span>
                            <span>{vehicle.color}</span>
                        </div>
                    )}

                    {/* Service Mode Info */}
                    <div className="mt-3">
                        {(instructor.service_mode === 'student_home' || instructor.service_mode === 'both') ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-100 dark:border-green-800/30">
                                <span className="material-symbols-outlined text-[14px]">home</span>
                                🏠 Vou até você
                            </span>
                        ) : instructor.service_mode === 'meeting_point' && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                                <span className="material-symbols-outlined text-[14px] text-instructor-primary">location_on</span>
                                📍 {instructor.meeting_point_name || 'Ponto de encontro'}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
});

InstructorCard.displayName = 'InstructorCard';

export default InstructorCard;
