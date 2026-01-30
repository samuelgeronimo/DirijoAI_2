'use client';

import { ViewType } from "@/hooks/useScheduleNavigation";
import { isToday, getDayAbbreviation, getTimeSlots, getMonthDays } from "@/utils/scheduleHelpers";
import { formatTime } from "@/utils/instructorMetrics";
import { DraggableWeekCalendar } from "./DraggableWeekCalendar";

interface Lesson {
    id: string;
    scheduled_at: string;
    duration_minutes: number;
    status: string;
    price_cents: number;
    student?: {
        full_name: string;
        avatar_url?: string;
    };
    pickup_address?: string;
    student_notes?: string;
}

interface CalendarGridProps {
    lessons: Lesson[];
    view: ViewType;
    currentDate: Date;
    weekDays: Date[];
    loading: boolean;
    selectedLesson: Lesson | null;
    onLessonClick: (lesson: Lesson) => void;
    onReschedule?: (lessonId: string, newDate: Date, newHour: number) => void;
}

export function CalendarGrid({
    lessons,
    view,
    currentDate,
    weekDays,
    loading,
    selectedLesson,
    onLessonClick,
    onReschedule,
}: CalendarGridProps) {
    if (loading) {
        return (
            <div className="flex flex-col rounded-xl border border-instructor-surface-dark bg-instructor-bg-dark overflow-hidden shadow-2xl p-12">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-instructor-primary"></div>
                </div>
                <p className="text-center text-gray-400 mt-4">Carregando agenda...</p>
            </div>
        );
    }

    if (view === 'week') {
        if (onReschedule) {
            return (
                <DraggableWeekCalendar
                    lessons={lessons}
                    weekDays={weekDays}
                    onLessonClick={onLessonClick}
                    selectedLesson={selectedLesson}
                    onReschedule={onReschedule}
                />
            );
        }
        return <WeekView lessons={lessons} weekDays={weekDays} onLessonClick={onLessonClick} selectedLesson={selectedLesson} />;
    }

    if (view === 'day') {
        return <DayView lessons={lessons} currentDate={currentDate} onLessonClick={onLessonClick} selectedLesson={selectedLesson} />;
    }

    if (view === 'month') {
        return <MonthView lessons={lessons} currentDate={currentDate} onLessonClick={onLessonClick} />;
    }

    return null;
}

// Week View Component
function WeekView({ lessons, weekDays, onLessonClick, selectedLesson }: {
    lessons: Lesson[];
    weekDays: Date[];
    onLessonClick: (lesson: Lesson) => void;
    selectedLesson: Lesson | null;
}) {
    const timeSlots = getTimeSlots();

    // Group lessons by day and time
    const getLessonsForSlot = (day: Date, hour: number) => {
        return lessons.filter(lesson => {
            const lessonDate = new Date(lesson.scheduled_at);
            return (
                lessonDate.toDateString() === day.toDateString() &&
                lessonDate.getHours() === hour
            );
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'border-indigo-500 bg-[#2e3b52]';
            case 'in_progress':
                return 'border-instructor-primary bg-instructor-primary/20';
            case 'completed':
                return 'border-gray-500 bg-gray-700/50';
            case 'canceled':
                return 'border-red-500 bg-red-900/20';
            case 'disputed':
                return 'border-yellow-500 bg-yellow-900/20';
            default:
                return 'border-gray-500 bg-[#2e3b52]';
        }
    };

    return (
        <div className="flex flex-col rounded-xl border border-instructor-surface-dark bg-instructor-bg-dark overflow-hidden shadow-2xl">
            {/* Calendar Header Days */}
            <div className="grid grid-cols-8 border-b border-instructor-surface-dark bg-[#1a2333]">
                {/* Time Col Header */}
                <div className="h-14 border-r border-instructor-surface-dark p-3"></div>
                {/* Days */}
                {weekDays.map((day, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center justify-center border-r border-instructor-surface-dark h-14 ${isToday(day) ? 'bg-instructor-primary/10 relative overflow-hidden' : 'bg-instructor-surface-dark-2/50'
                            } ${index === 6 ? 'border-r-0' : ''}`}
                    >
                        {isToday(day) && <div className="absolute top-0 w-full h-1 bg-instructor-primary"></div>}
                        <span className={`text-xs font-${isToday(day) ? 'bold' : 'medium'} ${isToday(day) ? 'text-instructor-primary' : 'text-[#92a4c9]'}`}>
                            {isToday(day) ? `${getDayAbbreviation(day)} (Hoje)` : getDayAbbreviation(day)}
                        </span>
                        <span className="text-lg font-bold text-white">{day.getDate()}</span>
                    </div>
                ))}
            </div>

            {/* Calendar Body */}
            <div className="grid grid-cols-8 relative overflow-y-auto max-h-[600px] custom-scrollbar">
                {timeSlots.map((time, timeIndex) => {
                    const hour = parseInt(time.split(':')[0]);
                    return (
                        <div key={timeIndex} className="contents">
                            {/* Time Label */}
                            <div className="border-r border-b border-instructor-surface-dark p-2 text-xs font-medium text-[#92a4c9] text-center h-28 relative">
                                <span className="-top-2.5 relative bg-instructor-bg-dark px-1">
                                    {time}
                                </span>
                            </div>
                            {/* Day Slots */}
                            {weekDays.map((day, dayIndex) => {
                                const dayLessons = getLessonsForSlot(day, hour);
                                const isTodayCol = isToday(day);

                                return (
                                    <div
                                        key={dayIndex}
                                        className={`border-r border-b border-instructor-surface-dark p-1 h-28 ${isTodayCol ? 'bg-instructor-primary/5' : ''
                                            } ${dayIndex === 6 ? 'border-r-0' : ''}`}
                                    >
                                        {dayLessons.length > 0 ? (
                                            dayLessons.map(lesson => (
                                                <div
                                                    key={lesson.id}
                                                    onClick={() => onLessonClick(lesson)}
                                                    className={`h-full w-full rounded border-l-4 p-2 cursor-pointer hover:opacity-80 transition-all ${getStatusColor(lesson.status)} ${selectedLesson?.id === lesson.id ? 'ring-2 ring-white/20' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div
                                                            className="h-6 w-6 rounded-full bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: `url('${lesson.student?.avatar_url || 'https://via.placeholder.com/150'}')`,
                                                            }}
                                                        ></div>
                                                        <span className="text-xs font-bold text-white truncate">
                                                            {lesson.student?.full_name?.split(' ')[0] || 'Aluno'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px] text-gray-400">
                                                            schedule
                                                        </span>
                                                        <span className="text-[10px] text-gray-300 truncate">
                                                            {lesson.duration_minutes}min
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Day View Component
function DayView({ lessons, currentDate, onLessonClick, selectedLesson }: {
    lessons: Lesson[];
    currentDate: Date;
    onLessonClick: (lesson: Lesson) => void;
    selectedLesson: Lesson | null;
}) {
    const timeSlots = getTimeSlots();

    const getLessonsForHour = (hour: number) => {
        return lessons.filter(lesson => {
            const lessonDate = new Date(lesson.scheduled_at);
            return lessonDate.getHours() === hour;
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'border-indigo-500 bg-[#2e3b52]';
            case 'in_progress':
                return 'border-instructor-primary bg-instructor-primary/20';
            case 'completed':
                return 'border-gray-500 bg-gray-700/50';
            case 'canceled':
                return 'border-red-500 bg-red-900/20';
            case 'disputed':
                return 'border-yellow-500 bg-yellow-900/20';
            default:
                return 'border-gray-500 bg-[#2e3b52]';
        }
    };

    return (
        <div className="flex flex-col rounded-xl border border-instructor-surface-dark bg-instructor-bg-dark overflow-hidden shadow-2xl">
            <div className="border-b border-instructor-surface-dark bg-[#1a2333] p-4">
                <h3 className="text-xl font-bold text-white">
                    {new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(currentDate)}
                </h3>
            </div>
            <div className="overflow-y-auto max-h-[600px] custom-scrollbar p-4 space-y-2">
                {timeSlots.map((time, index) => {
                    const hour = parseInt(time.split(':')[0]);
                    const hourLessons = getLessonsForHour(hour);

                    return (
                        <div key={index} className="flex gap-4">
                            <div className="w-20 flex-shrink-0 text-sm font-medium text-[#92a4c9] pt-2">
                                {time}
                            </div>
                            <div className="flex-1 min-h-[80px] border-l-2 border-instructor-surface-dark pl-4">
                                {hourLessons.length > 0 ? (
                                    <div className="space-y-2">
                                        {hourLessons.map(lesson => (
                                            <div
                                                key={lesson.id}
                                                onClick={() => onLessonClick(lesson)}
                                                className={`rounded-lg border-l-4 p-4 cursor-pointer hover:opacity-80 transition-all ${getStatusColor(lesson.status)} ${selectedLesson?.id === lesson.id ? 'ring-2 ring-white/20' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div
                                                        className="h-10 w-10 rounded-full bg-cover bg-center"
                                                        style={{
                                                            backgroundImage: `url('${lesson.student?.avatar_url || 'https://via.placeholder.com/150'}')`,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">
                                                            {lesson.student?.full_name || 'Aluno'}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {formatTime(new Date(lesson.scheduled_at))} • {lesson.duration_minutes}min
                                                        </p>
                                                    </div>
                                                </div>
                                                {lesson.pickup_address && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-300">
                                                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                        <span className="truncate">{lesson.pickup_address}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                        Sem aulas agendadas
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Month View Component
function MonthView({ lessons, currentDate, onLessonClick }: {
    lessons: Lesson[];
    currentDate: Date;
    onLessonClick: (lesson: Lesson) => void;
}) {
    const monthDays = getMonthDays(currentDate);
    const currentMonth = currentDate.getMonth();

    const getLessonsForDay = (day: Date) => {
        return lessons.filter(lesson => {
            const lessonDate = new Date(lesson.scheduled_at);
            return lessonDate.toDateString() === day.toDateString();
        });
    };

    return (
        <div className="flex flex-col rounded-xl border border-instructor-surface-dark bg-instructor-bg-dark overflow-hidden shadow-2xl">
            {/* Month Header */}
            <div className="grid grid-cols-7 border-b border-instructor-surface-dark bg-[#1a2333]">
                {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((day, index) => (
                    <div key={index} className="p-3 text-center text-xs font-medium text-[#92a4c9] border-r border-instructor-surface-dark last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>
            {/* Month Grid */}
            <div className="grid grid-cols-7">
                {monthDays.map((day, index) => {
                    const dayLessons = getLessonsForDay(day);
                    const isCurrentMonth = day.getMonth() === currentMonth;
                    const isTodayDay = isToday(day);

                    return (
                        <div
                            key={index}
                            className={`min-h-[100px] border-r border-b border-instructor-surface-dark p-2 ${!isCurrentMonth ? 'bg-instructor-surface-dark-2/30 opacity-50' : ''
                                } ${isTodayDay ? 'bg-instructor-primary/10' : ''} ${index % 7 === 6 ? 'border-r-0' : ''}`}
                        >
                            <div className={`text-sm font-medium mb-1 ${isTodayDay ? 'text-instructor-primary font-bold' : 'text-white'}`}>
                                {day.getDate()}
                            </div>
                            <div className="space-y-1">
                                {dayLessons.slice(0, 3).map(lesson => (
                                    <div
                                        key={lesson.id}
                                        onClick={() => onLessonClick(lesson)}
                                        className="text-xs bg-instructor-primary/20 border-l-2 border-instructor-primary px-2 py-1 rounded cursor-pointer hover:bg-instructor-primary/30 transition-colors truncate"
                                    >
                                        <span className="font-medium text-white">
                                            {formatTime(new Date(lesson.scheduled_at))}
                                        </span>
                                        <span className="text-gray-300 ml-1">
                                            {lesson.student?.full_name?.split(' ')[0] || 'Aluno'}
                                        </span>
                                    </div>
                                ))}
                                {dayLessons.length > 3 && (
                                    <div className="text-xs text-instructor-primary font-medium">
                                        +{dayLessons.length - 3} mais
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
