import { ApprovalHeader } from "@/components/admin/approvals/ApprovalHeader";
import { ApprovalsWorkflow } from "@/components/admin/approvals/ApprovalsWorkflow";
import { createClient } from "@/utils/supabase/server";

export default async function AdminApprovalsPage() {
    const supabase = await createClient();

    // Fetch pending instructors
    const { data: rawInstructors, error } = await supabase
        .from('instructors')
        .select(`
            id,
            status,
            phone,
            cpf,
            cnh_number,
            cnh_category,
            cnh_issue_state,
            detran_registry_number,
            bio,
            superpowers,
            video_url,
            service_city,
            service_mode,
            city,
            state,
            zip_code,
            street,
            number,
            complement,
            neighborhood,
            vehicles(*),
            success_stories(*),
            profiles: profiles!instructors_id_fkey(
                full_name,
                avatar_url,
                email,
                documents(*)
            )
            `)
        .eq('status', 'pending_docs')
        .eq('current_onboarding_step', 8)
        .order('created_at', { ascending: true });

    console.log("Admin Approvals Debug:");
    console.log("Error:", error);
    console.log("Instructors Found:", rawInstructors?.length);
    if (rawInstructors && rawInstructors.length > 0) {
        console.log("Sample Instructor Success Stories:", JSON.stringify(rawInstructors[0].success_stories, null, 2));
    }
    if (rawInstructors?.length === 0) {
        // Debug: try fetching without filters to see if any exist
        const { count } = await supabase.from('instructors').select('*', { count: 'exact', head: true });
        console.log("Total Instructors in DB:", count);
    }

    if (error) {
        console.error("Error fetching approvals:", JSON.stringify(error, null, 2));
    }

    // Transform data: Hoist documents from profiles up to instructor level
    const instructors = (rawInstructors || []).map((inst: any) => {
        const profile = Array.isArray(inst.profiles) ? inst.profiles[0] : inst.profiles;
        return {
            ...inst,
            profiles: profile, // usage in UI expects profile details here
            documents: profile?.documents || [] // Hoist documents
        };
    });

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] h-screen w-full overflow-hidden flex flex-col text-slate-900 dark:text-white">
            <ApprovalHeader />
            <main className="flex-1 flex overflow-hidden">
                <ApprovalsWorkflow instructors={instructors as any} />
            </main>
        </div>
    );
}
