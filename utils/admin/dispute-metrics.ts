

import { createAdminClient } from "@/utils/supabase/admin";
import { DisputeListSummary, DisputeDetail } from "@/types/admin-dispute";

export async function getAllDisputes(): Promise<DisputeListSummary[]> {
    const supabase = createAdminClient();

    const { data: disputes, error } = await supabase
        .from('disputes')
        .select(`
            id,
            reason,
            status,
            created_at,
            admin_notes,
            student:profiles!disputes_student_id_fkey(full_name),
            instructor:instructors!disputes_instructor_id_fkey(
                profiles(full_name)
            ),
            lesson:lessons(scheduled_at)
        `)
        .order('created_at', { ascending: false });

    if (error || !disputes) {
        console.error("Error fetching disputes:", error);
        return [];
    }

    return disputes.map((d) => {
        // Safe casting/checking for joined data
        const studentName = d.student && 'full_name' in d.student ? d.student.full_name : 'Aluno Desconhecido';

        // Instructor is nested: disputes -> instructors -> profiles
        // Supabase types might return array or single object depending on relationship.
        // Assuming One-to-One mostly, but verify.
        const instructorData = d.instructor;
        let instructorName = 'Instrutor Desconhecido';

        if (instructorData) {
            const profile = Array.isArray(instructorData.profiles) ? instructorData.profiles[0] : instructorData.profiles;
            if (profile?.full_name) instructorName = profile.full_name;
        }

        return {
            id: d.id,
            reason: d.reason,
            description: null,
            status: d.status as 'open' | 'analyzing' | 'resolved', // Strict casting
            created_at: d.created_at || new Date().toISOString(),
            lesson_date: d.lesson?.scheduled_at || null,
            admin_notes: d.admin_notes,
            student_name: studentName || 'Sem Nome',
            instructor_name: instructorName
        };
    });
}

export async function getDisputeDetails(id: string): Promise<DisputeDetail | null> {
    const supabase = createAdminClient();

    const { data: dispute, error } = await supabase
        .from('disputes')
        .select(`
            id,
            reason,
            status,
            created_at,
            admin_notes,
            verdict,
            student_id,
            instructor_id,
            lesson_id,
            student:profiles!disputes_student_id_fkey(
                full_name, avatar_url, reputation_score
            ),
            instructor:instructors!disputes_instructor_id_fkey(
                profiles(full_name, avatar_url),
                rating
            ),
            lesson:lessons(
                scheduled_at,
                pickup_address,
                price_cents,
                status
            ),
            messages:dispute_messages(
                content,
                created_at,
                sender_id,
                evidence_url,
                is_system_message,
                sender:profiles(full_name, avatar_url)
            )
        `)
        .eq('id', id)
        .single();

    if (error || !dispute) return null;

    // Normalize Instructor Profile structure
    let instructorProfile = null;
    if (dispute.instructor?.profiles) {
        instructorProfile = Array.isArray(dispute.instructor.profiles)
            ? dispute.instructor.profiles[0]
            : dispute.instructor.profiles;
    }

    // Sort messages to find the first one (description)
    const sortedMessages = (dispute.messages || []).sort((a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    return {
        ...dispute,
        description: sortedMessages[0]?.content || null,
        verdict: dispute.verdict || null,
        created_at: dispute.created_at || new Date().toISOString(),
        status: (dispute.status as any) || 'open', // Force cast or fallback
        lesson_id: dispute.lesson_id || '',
        student: dispute.student as any,

        instructor: dispute.instructor ? {
            rating: dispute.instructor.rating,
            profiles: instructorProfile
        } : null,

        lesson: dispute.lesson as any,
        messages: (dispute.messages || []) as any
    };
}
