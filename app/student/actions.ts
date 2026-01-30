
"use server";

import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";

export async function createDispute(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const lessonId = formData.get("lessonId") as string;
    const reason = formData.get("reason") as string;
    const description = formData.get("description") as string;
    const evidenceUrlsStr = formData.get("evidenceUrls") as string;
    const evidenceUrls = evidenceUrlsStr ? JSON.parse(evidenceUrlsStr) : [];

    if (!lessonId || !reason || !description) {
        throw new Error("Missing fields");
    }

    // 1. Fetch Lesson to verify participation and get IDs
    const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .select('student_id, instructor_id')
        .eq('id', lessonId)
        .single();

    if (lessonError || !lesson) {
        throw new Error("Lesson not found");
    }

    const isStudent = user.id === lesson.student_id;
    const isInstructor = user.id === lesson.instructor_id;

    if (!isStudent && !isInstructor) {
        throw new Error("Unauthorized: You are not a participant in this lesson");
    }

    // 2. Create Dispute using Admin Client (Bypass RLS for Insert)
    const adminSupabase = createAdminClient();

    const { data: dispute, error: disputeError } = await adminSupabase
        .from('disputes')
        .insert({
            student_id: lesson.student_id,
            instructor_id: lesson.instructor_id,
            lesson_id: lessonId,
            reason: reason,
            status: 'open',
            created_at: new Date().toISOString()
        })
        .select()
        .single();

    if (disputeError) {
        console.error("Error creating dispute:", disputeError);
        throw new Error("Failed to create dispute");
    }

    // 2b. Insert Description as First Message
    await adminSupabase.from('dispute_messages').insert({
        dispute_id: dispute.id,
        sender_id: user.id,
        content: description,
        is_system_message: false
    });

    // 3. Update Lesson Status
    await supabase
        .from('lessons')
        .update({ status: 'disputed' })
        .eq('id', lessonId);

    // 4. Save Evidence Documents
    if (evidenceUrls.length > 0) {
        const documents = evidenceUrls.map((url: string) => ({
            owner_id: user.id,
            type: 'dispute_evidence',
            url: url,
            status: 'pending',
            metadata: { dispute_id: dispute.id }
        }));

        const { error: docError } = await supabase
            .from('documents')
            .insert(documents);

        if (docError) console.error("Error saving documents:", docError);
    }

    if (isInstructor) {
        redirect("/instructor/schedule");
    } else {
        redirect("/student/history");
    }
}
