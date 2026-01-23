"use client";

import { useState } from "react";

interface CalendarGridProps {
    availabilityPatterns: any[]; // { day_of_week, start_time, end_time }
    busySlots: string[]; // ISO strings of scheduled lessons
    scheduledLessons: Array<{ scheduled_at: string; status: string; id: string }>; // Student's own lessons
    selectedSlots: string[]; // Array of selected slot ISO strings for booking
    selectedLessonsToCancel: string[]; // Array of lesson IDs selected for cancellation
    onSelectSlot: (slot: string) => void;
    onToggleLessonToCancel: (lessonId: string) => void; // Toggle lesson selection for cancellation
    balance: number; // Student's remaining lesson balance
}

export function CalendarGrid({ availabilityPatterns, busySlots, scheduledLessons, selectedSlots, selectedLessonsToCancel, onSelectSlot, onToggleLessonToCancel, balance }: CalendarGridProps) {
    const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, 1 = next week, 2 = week after

    // Helper to generate 7 days for the current week offset (Sunday to Saturday)
    const getWeekDays = () => {
        const days = [];
        const today = new Date();

        // Find the Sunday of the current week
        const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const sundayOfCurrentWeek = new Date(today);
        sundayOfCurrentWeek.setDate(today.getDate() - currentDayOfWeek);

        // Calculate the Sunday of the target week based on offset
        const targetSunday = new Date(sundayOfCurrentWeek);
        targetSunday.setDate(sundayOfCurrentWeek.getDate() + (weekOffset * 7));

        // Generate 7 days starting from that Sunday
        for (let i = 0; i < 7; i++) {
            const date = new Date(targetSunday);
            date.setDate(targetSunday.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const days = getWeekDays();

    const canGoPrevious = weekOffset > 0;
    const canGoNext = weekOffset < 9; // Max 10 weeks (0-9)

    // Helper to generate slots for a specific date based on patterns
    const getSlotsForDate = (date: Date) => {
        const dayOfWeek = date.getDay(); // 0 = Sunday
        const pattern = availabilityPatterns.find(p => p.day_of_week === dayOfWeek);

        if (!pattern) return [];

        const slots = [];
        const [startH] = pattern.start_time.split(':');
        const [endH] = pattern.end_time.split(':');

        let currentH = parseInt(startH);
        const endHour = parseInt(endH);

        while (currentH < endHour) {
            const slotDate = new Date(date);
            slotDate.setHours(currentH, 0, 0, 0);

            // Check if passed
            const now = new Date();
            if (slotDate > now) {
                slots.push(slotDate.toISOString());
            }
            currentH++;
        }
        return slots;
    };

    const isBusy = (slotIso: string) => {
        return busySlots.some(busy => {
            const busyDate = new Date(busy);
            const slotDate = new Date(slotIso);
            // Simple hour match mechanism
            return Math.abs(busyDate.getTime() - slotDate.getTime()) < 1000 * 60 * 50; // overlap Check
        });
    };

    // Helper to check if two dates are on the same day
    const isSameDay = (date1: Date, date2: Date) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };

    // Helper to check if a day already has a selected slot
    const isDayAlreadySelected = (slotIso: string) => {
        const slotDate = new Date(slotIso);
        return selectedSlots.some(selectedSlot => {
            const selectedDate = new Date(selectedSlot);
            return isSameDay(slotDate, selectedDate);
        });
    };

    // Helper to check if a slot is a scheduled lesson
    const isScheduledLesson = (slotIso: string) => {
        return scheduledLessons.some(lesson => {
            const lessonDate = new Date(lesson.scheduled_at);
            const slotDate = new Date(slotIso);
            return Math.abs(lessonDate.getTime() - slotDate.getTime()) < 1000 * 60 * 30; // 30 min tolerance
        });
    };

    const formatDay = (date: Date) => {
        const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return weekdays[date.getDay()]; // Localized short day
    };

    // Get week range for display
    const getWeekRange = () => {
        if (days.length === 0) return '';
        const firstDay = days[0];
        const lastDay = days[days.length - 1];
        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        if (firstDay.getMonth() === lastDay.getMonth()) {
            return `${firstDay.getDate()}-${lastDay.getDate()} ${monthNames[firstDay.getMonth()]}`;
        } else {
            return `${firstDay.getDate()} ${monthNames[firstDay.getMonth()]} - ${lastDay.getDate()} ${monthNames[lastDay.getMonth()]}`;
        }
    };

    return (
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                        Selecione um horário
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {getWeekRange()}
                        {selectedSlots.length > 0 && (
                            <span className="ml-2 text-student-primary font-semibold">
                                • {selectedSlots.length} aula{selectedSlots.length > 1 ? 's' : ''} selecionada{selectedSlots.length > 1 ? 's' : ''}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Week Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setWeekOffset(prev => Math.max(0, prev - 1))}
                            disabled={!canGoPrevious}
                            className={`p-2 rounded-lg transition-all ${canGoPrevious
                                ? 'bg-student-primary/10 text-student-primary hover:bg-student-primary hover:text-white cursor-pointer'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                }`}
                            title="Semana anterior"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button
                            onClick={() => setWeekOffset(prev => Math.min(9, prev + 1))}
                            disabled={!canGoNext}
                            className={`p-2 rounded-lg transition-all ${canGoNext
                                ? 'bg-student-primary/10 text-student-primary hover:bg-student-primary hover:text-white cursor-pointer'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                }`}
                            title="Próxima semana"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                    {/* Clear All Button */}
                    {selectedSlots.length > 0 && (
                        <button
                            onClick={() => selectedSlots.forEach(slot => onSelectSlot(slot))}
                            className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 text-sm font-medium transition-colors"
                            title="Limpar seleção"
                        >
                            Limpar
                        </button>
                    )}
                    {/* Legend */}
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-student-primary"></span>{" "}
                            Livre
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>{" "}
                            Ocupado
                        </span>
                    </div>
                </div>
            </div>
            {/* Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {days.map((day) => {
                    const slots = getSlotsForDate(day);
                    return (
                        <div key={day.toISOString()} className="flex flex-col gap-3">
                            <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700">
                                <p className="text-xs text-slate-500 font-medium uppercase">{formatDay(day)}</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    {day.getDate()}
                                </p>
                            </div>

                            {slots.length === 0 ? (
                                <div className="text-xs text-center text-slate-400 py-4 italic">Sem horários</div>
                            ) : (
                                slots.map(slot => {
                                    const busy = isBusy(slot);
                                    const scheduled = isScheduledLesson(slot);
                                    const selected = selectedSlots.includes(slot);
                                    const dayHasSelection = isDayAlreadySelected(slot) && !selected;
                                    const timeLabel = new Date(slot).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                    const cannotSelect = dayHasSelection || selectedSlots.length >= balance;

                                    // Scheduled lesson - show with green styling and allow selection for cancellation
                                    if (scheduled) {
                                        const lesson = scheduledLessons.find(l => {
                                            const lessonDate = new Date(l.scheduled_at);
                                            const slotDate = new Date(slot);
                                            return Math.abs(lessonDate.getTime() - slotDate.getTime()) < 1000 * 60 * 30;
                                        });

                                        const isSelectedForCancellation = lesson && selectedLessonsToCancel.includes(lesson.id);

                                        return (
                                            <button
                                                key={slot}
                                                onClick={() => {
                                                    if (lesson) {
                                                        onToggleLessonToCancel(lesson.id);
                                                    }
                                                }}
                                                className={`
                                                    w-full py-3 px-2 rounded-lg border transition-all duration-200 cursor-pointer
                                                    ${isSelectedForCancellation
                                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700 ring-2 ring-red-500'
                                                        : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30'
                                                    }
                                                `}
                                                title={isSelectedForCancellation ? "Clique para desmarcar" : "Clique para selecionar para cancelamento"}
                                            >
                                                <div className="flex items-center justify-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        {isSelectedForCancellation ? 'cancel' : 'check_circle'}
                                                    </span>
                                                    <span className="text-sm font-bold">{timeLabel}</span>
                                                </div>
                                            </button>
                                        );
                                    }

                                    if (busy) {
                                        return (
                                            <button
                                                key={slot}
                                                className="w-full py-3 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-transparent cursor-not-allowed"
                                                disabled
                                            >
                                                <span className="text-sm font-medium line-through">{timeLabel}</span>
                                            </button>
                                        );
                                    }

                                    // Disabled state: day already has a selection OR balance is full
                                    if (cannotSelect) {
                                        return (
                                            <button
                                                key={slot}
                                                className="w-full py-3 px-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-50"
                                                disabled
                                                title={dayHasSelection ? "Apenas 1 aula por dia" : "Saldo de aulas esgotado"}
                                            >
                                                <span className="text-sm font-medium">{timeLabel}</span>
                                            </button>
                                        );
                                    }

                                    return (
                                        <button
                                            key={slot}
                                            onClick={() => onSelectSlot(slot)}
                                            className={`
                                                w-full py-3 px-2 rounded-lg border transition-all duration-200 cursor-pointer group
                                                ${selected
                                                    ? 'bg-student-primary text-white border-student-primary shadow-md transform scale-[1.02] ring-2 ring-offset-2 ring-student-primary'
                                                    : 'bg-student-primary/10 hover:bg-student-primary text-student-primary hover:text-white border-student-primary/20 hover:border-student-primary'
                                                }
                                            `}
                                        >
                                            <span className="text-sm font-bold">{timeLabel}</span>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
