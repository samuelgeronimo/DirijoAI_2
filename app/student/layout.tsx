import { StudentSidebar } from "@/components/student/StudentSidebar";

export default function StudentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
