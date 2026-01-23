import { formatCurrency } from "@/utils/instructorMetrics";

interface KPIStatsProps {
    occupancyRate: number;
    occupancyTrend: number;
    hoursSold: number;
    hoursTrend: number;
    revenue: number;
    revenueTrend: number;
}

export function KPIStats({
    occupancyRate,
    occupancyTrend,
    hoursSold,
    hoursTrend,
    revenue,
    revenueTrend,
}: KPIStatsProps) {
    const getTrendIcon = (trend: number) => {
        if (trend > 0) return 'trending_up';
        if (trend < 0) return 'trending_down';
        return 'trending_flat';
    };

    const getTrendColor = (trend: number) => {
        if (trend > 0) return 'text-green-500';
        if (trend < 0) return 'text-red-500';
        return 'text-gray-500';
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl border border-instructor-surface-dark bg-instructor-surface-dark-2 p-5">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#92a4c9]">
                        Taxa de Ocupação
                    </p>
                    <span className="material-symbols-outlined text-instructor-primary">
                        pie_chart
                    </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">{occupancyRate}%</p>
                    {occupancyTrend !== 0 && (
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${getTrendColor(occupancyTrend)}`}>
                            <span className="material-symbols-outlined text-[12px]">
                                {getTrendIcon(occupancyTrend)}
                            </span>
                            {Math.abs(occupancyTrend)}%
                        </span>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-instructor-primary transition-all" style={{ width: `${occupancyRate}%` }}></div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-instructor-surface-dark bg-instructor-surface-dark-2 p-5">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#92a4c9]">Horas Vendidas</p>
                    <span className="material-symbols-outlined text-purple-400">
                        schedule
                    </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">{hoursSold.toFixed(1)}h</p>
                    {hoursTrend !== 0 && (
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${getTrendColor(hoursTrend)}`}>
                            <span className="material-symbols-outlined text-[12px]">
                                {getTrendIcon(hoursTrend)}
                            </span>
                            {Math.abs(hoursTrend)}%
                        </span>
                    )}
                </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-instructor-surface-dark bg-instructor-surface-dark-2 p-5">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#92a4c9]">Faturamento</p>
                    <span className="material-symbols-outlined text-green-400">
                        attach_money
                    </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">{formatCurrency(revenue)}</p>
                    {revenueTrend !== 0 && (
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${getTrendColor(revenueTrend)}`}>
                            <span className="material-symbols-outlined text-[12px]">
                                {getTrendIcon(revenueTrend)}
                            </span>
                            {Math.abs(revenueTrend)}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
