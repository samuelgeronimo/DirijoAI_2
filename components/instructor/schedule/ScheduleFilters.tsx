'use client';

interface ScheduleFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
}

export function ScheduleFilters({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
}: ScheduleFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search */}
            <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                    search
                </span>
                <input
                    type="text"
                    placeholder="Buscar por aluno..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-instructor-surface-dark-2 border border-instructor-surface-dark rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all"
                />
            </div>

            {/* Status Filter */}
            <div className="relative min-w-[180px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                    filter_list
                </span>
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-instructor-surface-dark-2 border border-instructor-surface-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all appearance-none cursor-pointer"
                >
                    <option value="all">Todos os Status</option>
                    <option value="scheduled">Agendadas</option>
                    <option value="in_progress">Em Andamento</option>
                    <option value="completed">Concluídas</option>
                    <option value="canceled">Canceladas</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] pointer-events-none">
                    expand_more
                </span>
            </div>
        </div>
    );
}
