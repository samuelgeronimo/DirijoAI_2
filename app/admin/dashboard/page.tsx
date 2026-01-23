import { ActionTable } from "@/components/admin/ActionTable";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GrowthChart } from "@/components/admin/GrowthChart";
import { SupplyAlertWidget } from "@/components/admin/SupplyAlertWidget";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // Fetch recent orders
    const { data: orders } = await supabase
        .from('orders')
        .select(`
            *,
            student:student_id(full_name, email),
            instructor:instructor_id(
                profiles(full_name)
            )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

    // Transform for table
    const formattedOrders = orders?.map(o => ({
        ...o,
        student: o.student,
        instructor: o.instructor
    })) || [];

    return (
        <>
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
                    {/* KPI Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* GMV Card */}
                        <div className="flex flex-col gap-2 rounded-xl p-5 bg-[#233648] border border-[#334b63] shadow-sm relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-[#0bda5b]">
                                    payments
                                </span>
                            </div>
                            <p className="text-[#92adc9] text-sm font-medium">GMV Total</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-white text-2xl font-bold tracking-tight">
                                    R$ 1.2M
                                </p>
                                <span className="text-[#0bda5b] text-xs font-bold bg-[#0bda5b]/10 px-1.5 py-0.5 rounded">
                                    +12%
                                </span>
                            </div>
                            <p className="text-[#92adc9] text-xs">
                                Volume Bruto de Mercadorias
                            </p>
                        </div>
                        {/* Net Revenue Card */}
                        <div className="flex flex-col gap-2 rounded-xl p-5 bg-[#233648] border border-[#334b63] shadow-sm">
                            <p className="text-[#92adc9] text-sm font-medium">Net Revenue</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-white text-2xl font-bold tracking-tight">
                                    R$ 240k
                                </p>
                                <span className="text-[#0bda5b] text-xs font-bold bg-[#0bda5b]/10 px-1.5 py-0.5 rounded">
                                    +8%
                                </span>
                            </div>
                            <p className="text-[#92adc9] text-xs">
                                Lucro Real (Taxas + Ebooks)
                            </p>
                        </div>
                        {/* Float Risk Card */}
                        <div className="flex flex-col gap-2 rounded-xl p-5 bg-[#233648] border border-[#eab308]/30 shadow-sm relative">
                            <div className="absolute right-4 top-4">
                                <span className="material-symbols-outlined text-[#eab308] animate-pulse">
                                    warning
                                </span>
                            </div>
                            <p className="text-[#92adc9] text-sm font-medium">
                                Float (Risco)
                            </p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-[#eab308] text-2xl font-bold tracking-tight">
                                    R$ 45k
                                </p>
                            </div>
                            <p className="text-[#eab308]/80 text-xs">
                                ! Caixa de instrutores pendente
                            </p>
                        </div>
                        {/* CAC Card */}
                        <div className="flex flex-col gap-2 rounded-xl p-5 bg-[#233648] border border-[#334b63] shadow-sm">
                            <p className="text-[#92adc9] text-sm font-medium">CAC Médio</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-white text-2xl font-bold tracking-tight">
                                    R$ 32,00
                                </p>
                                <span className="text-[#0bda5b] text-xs font-bold bg-[#0bda5b]/10 px-1.5 py-0.5 rounded">
                                    -5%
                                </span>
                            </div>
                            <p className="text-[#92adc9] text-xs">
                                Custo de Aquisição (Eficiente)
                            </p>
                        </div>
                    </div>

                    {/* Middle Section: Chart & Supply Alert */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <GrowthChart />
                        <SupplyAlertWidget />
                    </div>

                    {/* Recent Orders Table */}
                    <RecentOrdersTable orders={formattedOrders} />

                    {/* Fire Table (Action Required) */}
                    <ActionTable />
                </div>
            </main>
        </>
    );
}
