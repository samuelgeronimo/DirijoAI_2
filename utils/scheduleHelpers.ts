/**
 * Helper functions for schedule management
 */

/**
 * Get array of 7 days for the week containing the given date
 */
export function getWeekDays(date: Date): Date[] {
    const days: Date[] = [];
    const current = new Date(date);

    // Get to Monday (day 1)
    const dayOfWeek = current.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days
    current.setDate(current.getDate() + diff);

    // Get all 7 days
    for (let i = 0; i < 7; i++) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return days;
}

/**
 * Get start and end of week for the given date
 */
export function getWeekRange(date: Date): { start: Date; end: Date } {
    const days = getWeekDays(date);
    const start = new Date(days[0]);
    start.setHours(0, 0, 0, 0);

    const end = new Date(days[6]);
    end.setHours(23, 59, 59, 999);

    return { start, end };
}

/**
 * Format week range for display (e.g., "12 - 18 Fev, 2024")
 */
export function formatWeekRange(start: Date, end: Date): string {
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(end);
    const year = end.getFullYear();

    return `${startDay} - ${endDay} ${month}, ${year}`;
}

/**
 * Calculate occupancy rate
 */
export function calculateOccupancyRate(
    scheduledHours: number,
    availableHours: number
): number {
    if (availableHours === 0) return 0;
    return Math.round((scheduledHours / availableHours) * 100);
}

/**
 * Group lessons by day
 */
export function groupLessonsByDay(lessons: any[]): Map<string, any[]> {
    const grouped = new Map<string, any[]>();

    lessons.forEach(lesson => {
        const date = new Date(lesson.scheduled_at);
        const dateKey = date.toISOString().split('T')[0];

        if (!grouped.has(dateKey)) {
            grouped.set(dateKey, []);
        }
        grouped.get(dateKey)!.push(lesson);
    });

    return grouped;
}

/**
 * Get lesson grid position (row and column)
 */
export function getLessonGridPosition(
    lesson: any,
    weekDays: Date[]
): { row: number; col: number; span: number } {
    const lessonDate = new Date(lesson.scheduled_at);
    const lessonHour = lessonDate.getHours();

    // Row: based on hour (8:00 = row 0, 9:00 = row 1, etc.)
    const row = lessonHour - 8;

    // Column: based on day of week (0 = Monday, 6 = Sunday)
    const col = weekDays.findIndex(day =>
        day.toDateString() === lessonDate.toDateString()
    );

    // Span: based on duration (50 minutes = 1 row, 100 minutes = 2 rows)
    const span = Math.ceil(lesson.duration_minutes / 60);

    return { row, col, span };
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

/**
 * Get day name abbreviation (SEG, TER, QUA, etc.)
 */
export function getDayAbbreviation(date: Date): string {
    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    return days[date.getDay()];
}

/**
 * Get month days for calendar view
 */
export function getMonthDays(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Date[] = [];

    // Add days from previous month to start on Monday
    const firstDayOfWeek = firstDay.getDay();
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    for (let i = daysFromPrevMonth; i > 0; i--) {
        const day = new Date(year, month, 1 - i);
        days.push(day);
    }

    // Add all days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(year, month, i));
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
    }

    return days;
}

/**
 * Format month name (e.g., "Janeiro 2024")
 */
export function formatMonthYear(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric'
    }).format(date);
}

/**
 * Get time slots for day view (8:00 - 18:00)
 */
export function getTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 8; hour <= 18; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
}

/**
 * Calculate trend percentage
 */
export function calculateTrend(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}
