"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors cursor-pointer"
        >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium leading-normal">Sair</span>
        </button>
    );
}
