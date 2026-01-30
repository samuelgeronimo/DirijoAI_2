"use client";

interface ActionItem {
    type: 'dispute' | 'payout';
    id: string;
    title: string;
    description: string;
    user: string;
    severity: 'critical' | 'high' | 'medium';
    createdAt: string;
    displayType: string;
}

interface ActionTableProps {
    actions?: ActionItem[];
}

function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
}

export function ActionTable({ actions = [] }: ActionTableProps) {
    const criticalCount = actions.filter(a => a.severity === 'critical' || a.severity === 'high').length;

    return (
        <div className="rounded-xl bg-[#233648] border border-l-4 border-l-[#ef4444] border-t-[#334b63] border-r-[#334b63] border-b-[#334b63] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#334b63] flex justify-between items-center bg-[#2a1f1f]">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ef4444]">
                        local_fire_department
                    </span>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                        Incêndios (Action Required)
                    </h3>
                </div>
                <span className="bg-[#ef4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {criticalCount} Urgent
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[#92adc9]">
                    <thead className="bg-[#1c2a38] text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">ID / Descrição</th>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3">Severidade</th>
                            <th className="px-6 py-3">Tempo Decorrido</th>
                            <th className="px-6 py-3 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334b63]">
                        {actions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-[#92adc9]/60">
                                    Nenhum item urgente pendente.
                                </td>
                            </tr>
                        ) : (
                            actions.map((action) => (
                                <tr key={action.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">
                                        {action.title}
                                        <div className="text-xs text-[#92adc9] font-normal mt-0.5">
                                            {action.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{action.displayType}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-1 rounded
                        ${action.severity === 'critical' ? 'text-[#ef4444] bg-[#ef4444]/10' :
                                                action.severity === 'high' ? 'text-[#eab308] bg-[#eab308]/10' :
                                                    'text-[#0bda5b] bg-[#0bda5b]/10'}`}
                                        >
                                            {action.severity === 'critical' ? 'Crítico' :
                                                action.severity === 'high' ? 'Alto' : 'Médio'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {timeAgo(action.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#137fec] hover:text-white font-medium text-xs border border-[#137fec]/30 hover:bg-[#137fec] hover:border-[#137fec] px-3 py-1.5 rounded transition-all cursor-pointer">
                                            Resolver
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
