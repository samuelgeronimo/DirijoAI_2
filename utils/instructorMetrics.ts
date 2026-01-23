/**
 * Utility functions for instructor dashboard metrics and calculations
 */

/**
 * Determines the instructor level based on rating, completed lessons, and membership duration
 */
export function calculateInstructorLevel(
    rating: number,
    completedLessons: number,
    memberSince: Date
): 'Ouro' | 'Prata' | 'Bronze' {
    const monthsActive = Math.floor(
        (Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    // Gold: Rating >= 4.7, 50+ lessons, or 6+ months active
    if (rating >= 4.7 && completedLessons >= 50) return 'Ouro';
    if (rating >= 4.8 && completedLessons >= 30) return 'Ouro';
    if (rating >= 4.9 && monthsActive >= 6) return 'Ouro';

    // Silver: Rating >= 4.3, 20+ lessons, or 3+ months active
    if (rating >= 4.3 && completedLessons >= 20) return 'Prata';
    if (rating >= 4.5 && completedLessons >= 10) return 'Prata';
    if (rating >= 4.6 && monthsActive >= 3) return 'Prata';

    // Bronze: Everyone else
    return 'Bronze';
}

/**
 * Calculates the percentile of an instructor based on their rating
 */
export function calculatePercentile(rating: number): number {
    // Simplified percentile calculation
    // In a real scenario, you'd compare against all instructors
    if (rating >= 4.9) return 5;
    if (rating >= 4.8) return 10;
    if (rating >= 4.7) return 15;
    if (rating >= 4.5) return 25;
    if (rating >= 4.3) return 35;
    return 50;
}

/**
 * Formats cents to Brazilian Real currency
 */
export function formatCurrency(cents: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(cents / 100);
}

/**
 * Returns a greeting based on the current time
 */
export function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
}

/**
 * Formats a date relative to today (Hoje, Amanhã, or day of week)
 */
export function formatRelativeDate(date: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';

    // Return day of week for dates within the next 7 days
    if (diffDays > 1 && diffDays < 7) {
        const daysOfWeek = [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
        ];
        return daysOfWeek[targetDate.getDay()];
    }

    // For dates further out, return formatted date
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
    }).format(targetDate);
}

/**
 * Formats time from a date object
 */
export function formatTime(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

/**
 * Formats a full date and time
 */
export function formatDateTime(date: Date): string {
    return `${formatRelativeDate(date)}, ${formatTime(date)}`;
}
