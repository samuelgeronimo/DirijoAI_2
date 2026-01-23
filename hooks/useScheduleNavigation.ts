'use client';

import { useState, useCallback } from 'react';
import { getWeekRange, getWeekDays } from '@/utils/scheduleHelpers';

export type ViewType = 'day' | 'week' | 'month';

export function useScheduleNavigation() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<ViewType>('week');

    const navigateNext = useCallback(() => {
        setCurrentDate(prev => {
            const next = new Date(prev);
            switch (view) {
                case 'day':
                    next.setDate(next.getDate() + 1);
                    break;
                case 'week':
                    next.setDate(next.getDate() + 7);
                    break;
                case 'month':
                    next.setMonth(next.getMonth() + 1);
                    break;
            }
            return next;
        });
    }, [view]);

    const navigatePrevious = useCallback(() => {
        setCurrentDate(prev => {
            const previous = new Date(prev);
            switch (view) {
                case 'day':
                    previous.setDate(previous.getDate() - 1);
                    break;
                case 'week':
                    previous.setDate(previous.getDate() - 7);
                    break;
                case 'month':
                    previous.setMonth(previous.getMonth() - 1);
                    break;
            }
            return previous;
        });
    }, [view]);

    const goToToday = useCallback(() => {
        setCurrentDate(new Date());
    }, []);

    const changeView = useCallback((newView: ViewType) => {
        setView(newView);
    }, []);

    // Get current range based on view
    const getCurrentRange = useCallback(() => {
        switch (view) {
            case 'day': {
                const start = new Date(currentDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(currentDate);
                end.setHours(23, 59, 59, 999);
                return { start, end };
            }
            case 'week':
                return getWeekRange(currentDate);
            case 'month': {
                const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                start.setHours(0, 0, 0, 0);
                const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                end.setHours(23, 59, 59, 999);
                return { start, end };
            }
        }
    }, [currentDate, view]);

    const weekDays = view === 'week' ? getWeekDays(currentDate) : [];

    return {
        currentDate,
        view,
        navigateNext,
        navigatePrevious,
        goToToday,
        changeView,
        getCurrentRange,
        weekDays,
    };
}
