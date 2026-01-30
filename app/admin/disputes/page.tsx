
import { getAllDisputes } from "@/utils/admin/dispute-metrics";
import Link from "next/link";
import { DisputesHeader } from "@/components/admin/disputes/DisputesHeader";

export default async function AdminDisputesListPage() {
    const disputes = await getAllDisputes();

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f7f8] dark:bg-[#0d141b]">
            <DisputesHeader />

            <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-[#0d141b]">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">

                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Disputas em Aberto ({disputes.filter(d => d.status === 'open').length})</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Buscar por nome..."
                                className="bg-[#111a22] border border-[#324d67] rounded-lg px-4 py-2 text-sm text-white focus:border-[#137fec] outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-[#111a22] rounded-xl border border-[#324d67] overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#1a2632] text-xs uppercase text-[#92adc9]">
                                <tr>
                                    <th className="p-4">Data</th>
                                    <th className="p-4">Aluno</th>
                                    <th className="p-4">Instrutor</th>
                                    <th className="p-4">Motivo</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#324d67]">
                                {disputes.map((dispute) => (
                                    <tr key={dispute.id} className="hover:bg-[#1a2632]/50 transition-colors">
                                        <td className="p-4 text-white">
                                            {new Date(dispute.created_at).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="p-4 text-white font-medium">{dispute.student_name}</td>
                                        <td className="p-4 text-[#92adc9]">{dispute.instructor_name}</td>
                                        <td className="p-4">
                                            <span className="bg-[#1e293b] text-white text-xs px-2 py-1 rounded border border-[#324d67]">
                                                {dispute.reason}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                                                ${dispute.status === 'resolved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    dispute.status === 'analyzing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                        'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                                {dispute.status === 'open' ? 'Aberto' :
                                                    dispute.status === 'analyzing' ? 'Em Análise' : 'Resolvido'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/admin/disputes/${dispute.id}`}
                                                className="text-xs font-bold text-[#137fec] hover:underline"
                                            >
                                                VER DETALHES
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {disputes.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-[#92adc9]">
                                            Nenhuma disputa encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}
