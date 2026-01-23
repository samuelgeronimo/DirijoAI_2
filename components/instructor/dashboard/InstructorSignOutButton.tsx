"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function InstructorSignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/instructor/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="ml-auto text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Sair"
        >
            <span className="material-symbols-outlined font-light">
                logout
            </span>
        </button>
    );
}
