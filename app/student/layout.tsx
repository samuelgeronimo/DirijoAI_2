import { StudentSidebar } from "@/components/student/StudentSidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function StudentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // RBAC Check
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    // If user is an instructor, they shouldn't be here
    if (profile?.role === 'instructor') {
        return redirect('/instructor/dashboard'); // Redirect to their correct dashboard
    }

    return (
        <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
            {/* Sidebar */}
            <StudentSidebar />
            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 w-full h-full min-h-screen flex flex-col">
                {children}
            </main>
        </div>
    );
}
