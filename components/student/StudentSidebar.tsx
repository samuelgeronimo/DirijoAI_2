import { createClient } from "@/utils/supabase/server";
import { SignOutButton } from "./SignOutButton";
import { StudentSidebarNav } from "./StudentSidebarNav";

export async function StudentSidebar() {
    const supabase = await createClient();

    // Fetch User Profile
    const { data: { user } } = await supabase.auth.getUser();

    let profile = null;
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('full_name, avatar_url, role')
            .eq('id', user.id)
            .single();
        profile = data;
    }

    return (
        <div className="w-64 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-4">
                <div className="flex flex-col gap-6">
                    {/* User Profile Snippet in Sidebar */}
                    <div className="flex items-center gap-3 px-2">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shadow-sm"
                            style={{
                                backgroundImage: `url("${profile?.avatar_url || 'https://via.placeholder.com/150'}")`,
                            }}
                        ></div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-white text-base font-semibold leading-normal truncate max-w-[150px]">
                                {profile?.full_name || 'Usuário'}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal capitalize">
                                {profile?.role === 'student' ? 'Aluno' : profile?.role || 'Visitante'}
                            </p>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <StudentSidebarNav />
                </div>
            </div>
            {/* Sidebar Footer */}
            <div className="p-4">
                <SignOutButton />
            </div>
        </div >
    );
}
