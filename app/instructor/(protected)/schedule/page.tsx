'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { AgendaControls } from "@/components/instructor/schedule/AgendaControls";
import { CalendarGrid } from "@/components/instructor/schedule/CalendarGrid";
import { KPIStats } from "@/components/instructor/schedule/KPIStats";
import { LessonDetailsModal } from "@/components/instructor/schedule/LessonDetailsModal";
import { ScheduleFilters } from "@/components/instructor/schedule/ScheduleFilters";
import { useScheduleNavigation } from "@/hooks/useScheduleNavigation";
import { calculateTrend } from "@/utils/scheduleHelpers";

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
    pickup_lat?: number;
    pickup_lng?: number;
}

export default function InstructorSchedulePage() {
    const {
        currentDate,
        view,
        navigateNext,
        navigatePrevious,
        goToToday,
        changeView,
        getCurrentRange,
        weekDays,
    } = useScheduleNavigation();

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [previousWeekLessons, setPreviousWeekLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const supabase = createClient();

    // Fetch lessons for current range
    useEffect(() => {
        async function fetchLessons() {
            setLoading(true);
            const { start, end } = getCurrentRange();

            const { data: user } = await supabase.auth.getUser();
            if (!user.user) return;

            // Fetch current period lessons
            const { data: currentLessons } = await supabase
                .from('lessons')
                .select(`
                    *,
                    student:profiles!lessons_student_id_fkey(full_name, avatar_url)
                `)
                .eq('instructor_id', user.user.id)
                .gte('scheduled_at', start.toISOString())
                .lte('scheduled_at', end.toISOString())
                .order('scheduled_at', { ascending: true });

            setLessons(currentLessons || []);

            // Fetch previous period for trend calculation
            const periodDiff = end.getTime() - start.getTime();
            const prevStart = new Date(start.getTime() - periodDiff);
            const prevEnd = new Date(end.getTime() - periodDiff);

            const { data: prevLessons } = await supabase
                .from('lessons')
                .select('*')
                .eq('instructor_id', user.user.id)
                .gte('scheduled_at', prevStart.toISOString())
                .lte('scheduled_at', prevEnd.toISOString());

            setPreviousWeekLessons(prevLessons || []);
            setLoading(false);
        }

        fetchLessons();
    }, [currentDate, view]);

    // Filter lessons based on search and status
    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = searchTerm === '' ||
            lesson.student?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Calculate KPIs
    const scheduledLessons = filteredLessons.filter(l => l.status === 'scheduled' || l.status === 'in_progress');
    const totalHours = scheduledLessons.reduce((sum, l) => sum + (l.duration_minutes / 60), 0);
    const totalRevenue = scheduledLessons.reduce((sum, l) => sum + (l.price_cents || 0), 0);

    // Assuming 40 hours available per week (8 hours/day * 5 days)
    const availableHours = view === 'week' ? 40 : view === 'day' ? 8 : 160; // month = 4 weeks
    const occupancyRate = availableHours > 0 ? Math.round((totalHours / availableHours) * 100) : 0;

    // Calculate trends
    const prevTotalHours = previousWeekLessons.reduce((sum, l) => sum + (l.duration_minutes / 60), 0);
    const prevRevenue = previousWeekLessons.reduce((sum, l) => sum + (l.price_cents || 0), 0);
    const prevOccupancy = availableHours > 0 ? Math.round((prevTotalHours / availableHours) * 100) : 0;

    const occupancyTrend = calculateTrend(occupancyRate, prevOccupancy);
    const hoursTrend = calculateTrend(totalHours, prevTotalHours);
    const revenueTrend = calculateTrend(totalRevenue, prevRevenue);

    // Action handlers
    const handleStartLesson = async (lessonId: string) => {
        const { error } = await supabase
            .from('lessons')
            .update({ status: 'in_progress' })
            .eq('id', lessonId);

        if (!error) {
            setLessons(prev => prev.map(l =>
                l.id === lessonId ? { ...l, status: 'in_progress' } : l
            ));
        }
    };

    const handleCancelLesson = async (lessonId: string) => {
        const { error } = await supabase
            .from('lessons')
            .update({ status: 'canceled' })
            .eq('id', lessonId);

        if (!error) {
            setLessons(prev => prev.map(l =>
                l.id === lessonId ? { ...l, status: 'canceled' } : l
            ));
        }
    };

    const handleReschedule = (lessonId: string) => {
        // TODO: Implement reschedule modal
        alert('Funcionalidade de reagendamento será implementada em breve!');
    };

    return (
        <div className="flex-1 overflow-y-auto bg-instructor-bg-dark custom-scrollbar p-6 relative h-full">
            <div className="mx-auto max-w-7xl flex flex-col gap-6">
                <AgendaControls
                    currentDate={currentDate}
                    view={view}
                    onNext={navigateNext}
                    onPrevious={navigatePrevious}
                    onToday={goToToday}
                    onViewChange={changeView}
                    weekDays={weekDays}
                />

                <KPIStats
                    occupancyRate={occupancyRate}
                    occupancyTrend={occupancyTrend}
                    hoursSold={totalHours}
                    hoursTrend={hoursTrend}
                    revenue={totalRevenue}
                    revenueTrend={revenueTrend}
                />

                <ScheduleFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                />

                <CalendarGrid
                    lessons={filteredLessons}
                    view={view}
                    currentDate={currentDate}
                    weekDays={weekDays}
                    loading={loading}
                    selectedLesson={selectedLesson}
                    onLessonClick={setSelectedLesson}
                />

                {/* Spacer for scroll */}
                <div className="h-24"></div>
            </div>

            <LessonDetailsModal
                lesson={selectedLesson}
                onClose={() => setSelectedLesson(null)}
                onStartLesson={handleStartLesson}
                onCancelLesson={handleCancelLesson}
                onReschedule={handleReschedule}
            />
        </div>
    );
}
