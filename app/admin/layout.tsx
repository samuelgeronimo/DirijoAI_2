import { getOpenDisputesCount } from "@/utils/admin/dashboard-metrics";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/instructor/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || profile.role !== "admin") {
        return redirect("/");
    }

    const openDisputesCount = await getOpenDisputesCount();

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#111a22] text-slate-900 dark:text-white font-display overflow-hidden h-screen flex">
            <AdminSidebar openDisputesCount={openDisputesCount} />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {children}
            </div>
        </div>
    );
}
