"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function fixOrder10004() {
    const supabase = await createClient();

    // 0. Get Current User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "No user logged in." };

    const v_target_date = '2026-01-26T12:00:00+00:00'; // 9:00 Brasilia

    console.log("Attempting fix for 10004 for user:", user.id);

    // 1. Claim the order (Force update owner to current user for debugging)
    const { error: updateOrderError } = await supabase
        .from('orders')
        .update({ student_id: user.id })
        .eq('order_number', 10004);

    if (updateOrderError) {
        console.error("Failed to claim order", updateOrderError);
    }

    // 2. Find the order (now should be ours)
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', 10004)
        .single();

    if (orderError || !order) {
        console.error("Order 10004 not found", orderError);
        return { success: false, message: "Order 10004 not found." };
    }

    const { instructor_id, amount_cents, metadata } = order;

    // 3. Calculate clean lesson price (exclude manual)
    let lessonPriceCents = amount_cents;
    if (metadata && typeof metadata === 'object' && 'manual_included' in metadata) {
        const orderMetadata = metadata as { manual_included?: boolean; manual_price?: number };
        if (orderMetadata.manual_included && orderMetadata.manual_price) {
            lessonPriceCents = amount_cents - Math.round(orderMetadata.manual_price * 100);
        }
    }

    // 4. Check if lesson exists for THIS user
    const { data: existingLesson } = await supabase
        .from('lessons')
        .select('*')
        .eq('student_id', user.id)
        .eq('scheduled_at', v_target_date)
        .single();

    if (existingLesson) {
        // Ensure status is scheduled so it counts
        if (existingLesson.status !== 'scheduled') {
            await supabase.from('lessons').update({ status: 'scheduled' }).eq('id', existingLesson.id);
            revalidatePath('/student/dashboard');
            return { success: true, message: "Fixed existing lesson status." };
        }
        console.log("Lesson already exists and is valid.");
        return { success: true, message: "Lesson already exists." };
    }

    // 5. Insert Lesson
    const { error: insertError } = await supabase
        .from('lessons')
        .insert({
            student_id: user.id, // Explicitly use current user
            instructor_id,
            scheduled_at: v_target_date,
            duration_minutes: 50,
            status: 'scheduled',
            price_cents: lessonPriceCents
        });

    if (insertError) {
        console.error("Insert failed", insertError);
        return { success: false, message: `Insert failed: ${insertError.message}` };
    }

    revalidatePath('/student/dashboard');
    return { success: true, message: "Order claimed & Lesson inserted!" };
}
