import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#111a22] text-slate-900 dark:text-white font-display overflow-hidden h-screen flex">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {children}
            </div>
        </div>
    );
}
