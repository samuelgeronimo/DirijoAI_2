'use client';

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import { ViewType } from "@/hooks/useScheduleNavigation";
import { isToday, getDayAbbreviation, getTimeSlots } from "@/utils/scheduleHelpers";
import { formatTime } from "@/utils/instructorMetrics";

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

interface DraggableCalendarProps {
    lessons: Lesson[];
    weekDays: Date[];
    onLessonClick: (lesson: Lesson) => void;
    selectedLesson: Lesson | null;
    onReschedule: (lessonId: string, newDate: Date, newHour: number) => void;
}

export function DraggableWeekCalendar({
    lessons,
    weekDays,
    onLessonClick,
    selectedLesson,
    onReschedule,
}: DraggableCalendarProps) {
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const timeSlots = getTimeSlots();

    const handleDragStart = (event: DragStartEvent) => {
        const lesson = lessons.find(l => l.id === event.active.id);
        setActiveLesson(lesson || null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const [dayIndex, hour] = (over.id as string).split('-').map(Number);
            const newDate = new Date(weekDays[dayIndex]);
            newDate.setHours(hour, 0, 0, 0);

            onReschedule(active.id as string, newDate, hour);
        }

        setActiveLesson(null);
    };

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
            default:
                return 'border-gray-500 bg-[#2e3b52]';
        }
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex flex-col rounded-xl border border-instructor-surface-dark bg-instructor-bg-dark overflow-hidden shadow-2xl">
                {/* Calendar Header Days */}
                <div className="grid grid-cols-8 border-b border-instructor-surface-dark bg-[#1a2333]">
                    <div className="h-14 border-r border-instructor-surface-dark p-3"></div>
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
                                        <DroppableSlot
                                            key={dayIndex}
                                            id={`${dayIndex}-${hour}`}
                                            isTodayCol={isTodayCol}
                                            isLast={dayIndex === 6}
                                        >
                                            {dayLessons.length > 0 ? (
                                                dayLessons.map(lesson => (
                                                    <DraggableLesson
                                                        key={lesson.id}
                                                        lesson={lesson}
                                                        statusColor={getStatusColor(lesson.status)}
                                                        isSelected={selectedLesson?.id === lesson.id}
                                                        onClick={() => onLessonClick(lesson)}
                                                    />
                                                ))
                                            ) : null}
                                        </DroppableSlot>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeLesson ? (
                    <div className={`h-full w-full rounded border-l-4 p-2 opacity-80 ${getStatusColor(activeLesson.status)}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className="h-6 w-6 rounded-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${activeLesson.student?.avatar_url || 'https://via.placeholder.com/150'}')`,
                                }}
                            ></div>
                            <span className="text-xs font-bold text-white truncate">
                                {activeLesson.student?.full_name?.split(' ')[0] || 'Aluno'}
                            </span>
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

// Draggable Lesson Component
function DraggableLesson({
    lesson,
    statusColor,
    isSelected,
    onClick,
}: {
    lesson: Lesson;
    statusColor: string;
    isSelected: boolean;
    onClick: () => void;
}) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: lesson.id,
        disabled: lesson.status !== 'scheduled', // Only allow dragging scheduled lessons
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onClick={onClick}
            className={`h-full w-full rounded border-l-4 p-2 cursor-${lesson.status === 'scheduled' ? 'grab' : 'pointer'} hover:opacity-80 transition-all ${statusColor} ${isSelected ? 'ring-2 ring-white/20' : ''
                } ${isDragging ? 'opacity-50' : ''}`}
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
    );
}

// Droppable Slot Component
function DroppableSlot({
    id,
    children,
    isTodayCol,
    isLast,
}: {
    id: string;
    children: React.ReactNode;
    isTodayCol: boolean;
    isLast: boolean;
}) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`border-r border-b border-instructor-surface-dark p-1 h-28 ${isTodayCol ? 'bg-instructor-primary/5' : ''
                } ${isLast ? 'border-r-0' : ''} ${isOver ? 'bg-instructor-primary/20 ring-2 ring-instructor-primary' : ''}`}
        >
            {children}
        </div>
    );
}
