import { formatWeekRange, formatMonthYear, getDayAbbreviation } from "@/utils/scheduleHelpers";
import { ViewType } from "@/hooks/useScheduleNavigation";

interface AgendaControlsProps {
    currentDate: Date;
    view: ViewType;
    onNext: () => void;
    onPrevious: () => void;
    onToday: () => void;
    onViewChange: (view: ViewType) => void;
    weekDays: Date[];
}

export function AgendaControls({
    currentDate,
    view,
    onNext,
    onPrevious,
    onToday,
    onViewChange,
    weekDays,
}: AgendaControlsProps) {
    // Format date range based on view
    const getDateRangeText = () => {
        switch (view) {
            case 'day':
                return new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }).format(currentDate);
            case 'week':
                if (weekDays.length > 0) {
                    return formatWeekRange(weekDays[0], weekDays[6]);
                }
                return '';
            case 'month':
                return formatMonthYear(currentDate);
        }
    };

    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Sua Agenda
                    </h2>
                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500 border border-green-500/20">
                        Online
                    </span>
                </div>
                <p className="text-[#92a4c9]">
                    Gerencie suas aulas e visualize sua disponibilidade.
                </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
                {/* Date Navigation */}
                <div className="flex items-center rounded-lg bg-instructor-surface-dark-2 border border-instructor-surface-dark p-1">
                    <button
                        onClick={onPrevious}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 text-[#92a4c9] cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            chevron_left
                        </span>
                    </button>
                    <button
                        onClick={onToday}
                        className="px-3 text-sm font-medium text-white min-w-[140px] text-center hover:text-instructor-primary transition-colors cursor-pointer"
                    >
                        {getDateRangeText()}
                    </button>
                    <button
                        onClick={onNext}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 text-[#92a4c9] cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            chevron_right
                        </span>
                    </button>
                </div>
                {/* View Switcher */}
                <div className="flex h-10 items-center rounded-lg bg-instructor-surface-dark-2 p-1 border border-instructor-surface-dark">
                    <button
                        onClick={() => onViewChange('day')}
                        className={`flex h-full items-center justify-center rounded px-3 text-sm font-medium transition-colors cursor-pointer ${view === 'day'
                                ? 'bg-instructor-bg-dark text-white shadow-sm ring-1 ring-black/5'
                                : 'text-[#92a4c9] hover:text-white'
                            }`}
                    >
                        Dia
                    </button>
                    <button
                        onClick={() => onViewChange('week')}
                        className={`flex h-full items-center justify-center rounded px-3 text-sm font-medium transition-colors cursor-pointer ${view === 'week'
                                ? 'bg-instructor-bg-dark text-white shadow-sm ring-1 ring-black/5'
                                : 'text-[#92a4c9] hover:text-white'
                            }`}
                    >
                        Semana
                    </button>
                    <button
                        onClick={() => onViewChange('month')}
                        className={`flex h-full items-center justify-center rounded px-3 text-sm font-medium transition-colors cursor-pointer ${view === 'month'
                                ? 'bg-instructor-bg-dark text-white shadow-sm ring-1 ring-black/5'
                                : 'text-[#92a4c9] hover:text-white'
                            }`}
                    >
                        Mês
                    </button>
                </div>
            </div>
        </div>
    );
}
