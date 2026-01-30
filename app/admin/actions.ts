"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/utils/auth";
import { PlatformTakeRateSchema, validateInput } from "@/utils/validation/schemas";
import { logger } from "@/utils/logger";
import type { PlatformSetting } from "@/types/actions";

export async function updatePlatformTakeRate(percentage: number) {
    // Validate input
    const validated = validateInput(PlatformTakeRateSchema, { percentage });

    // Require admin authorization
    const user = await requireAdmin();

    const supabase = await createClient();

    // Note: platform_settings table will be available after running migration 20260127_create_platform_settings.sql
    // After migration, regenerate types with: npm run gen:types
    const { error } = await supabase
        .from('platform_settings' as any)
        .upsert({
            key: 'platform_take_rate',
            value: { percentage: validated.percentage },
            description: 'Porcentagem de comissão da plataforma por aula'
        });

    if (error) {
        logger.error('Failed to update platform take rate', {
            error: error.message,
            userId: user.id,
            percentage: validated.percentage
        });
        throw new Error('Failed to update settings');
    }

    logger.info('Platform take rate updated', {
        userId: user.id,
        newPercentage: validated.percentage
    });

    revalidatePath('/admin/finance');
}

export async function getPlatformTakeRate(): Promise<number> {
    const supabase = await createClient();

    // Note: platform_settings table will be available after running migration 20260127_create_platform_settings.sql
    const { data, error } = await supabase
        .from('platform_settings' as any)
        .select('value')
        .eq('key', 'platform_take_rate')
        .single();

    if (error) {
        logger.error('Failed to fetch platform_take_rate, using default 15%', {
            error: error.message
        });
        return 15;
    }

    if (!data) {
        logger.warn('Platform take rate not configured, using default 15%');
        return 15;
    }

    const setting = data as unknown as PlatformSetting;
    return setting.value?.percentage ?? 15;
}

export async function resolveDispute(disputeId: string, verdict: 'student_fault' | 'instructor_fault' | 'force_majeure', notes?: string) {
    const supabase = await createClient();

    // 1. Fetch Dispute & Lesson Details
    const { data: dispute, error: fetchError } = await supabase
        .from('disputes')
        .select(`
            *,
            lesson:lessons(id, price_cents, instructor_id, student_id)
        `)
        .eq('id', disputeId)
        .single();

    if (fetchError || !dispute) {
        throw new Error("Dispute not found");
    }

    if (dispute.status === 'resolved') {
        throw new Error("Dispute already resolved");
    }

    if (!dispute.lesson) {
        throw new Error("Lesson data not found");
    }

    const { lesson } = dispute;
    const amount = lesson.price_cents;

    // 2. Perform Financial Actions based on Verdict
    const ledgerEntries: {
        profile_id: string;
        amount_cents: number;
        operation_type: "credit" | "debit";
        description: string;
        category: string;
        metadata: any;
    }[] = [];

    if (verdict === 'student_fault') {
        ledgerEntries.push({
            profile_id: lesson.instructor_id,
            amount_cents: amount,
            operation_type: 'credit',
            description: `Aula disputada (Culpa do Aluno) - #${lesson.id}`,
            category: 'lesson_fee',
            metadata: { dispute_id: disputeId, lesson_id: lesson.id }
        });
    } else if (verdict === 'instructor_fault') {
        ledgerEntries.push({
            profile_id: lesson.student_id,
            amount_cents: amount,
            operation_type: 'credit',
            description: `Reembolso de disputa (Culpa Instrutor) - #${lesson.id}`,
            category: 'refund',
            metadata: { dispute_id: disputeId, lesson_id: lesson.id }
        });
    } else if (verdict === 'force_majeure') {
        ledgerEntries.push({
            profile_id: lesson.student_id,
            amount_cents: amount,
            operation_type: 'credit',
            description: `Reembolso (Força Maior) - #${lesson.id}`,
            category: 'refund',
            metadata: { dispute_id: disputeId, lesson_id: lesson.id }
        });
    }

    // Insert Ledger Entries
    if (ledgerEntries.length > 0) {
        const { error: ledgerError } = await supabase.from('ledger_entries').insert(ledgerEntries);
        if (ledgerError) {
            console.error("Ledger Error:", ledgerError);
            throw new Error("Failed to process financial transaction");
        }
    }

    // 3. Update Dispute Status
    const { error: updateError } = await supabase
        .from('disputes')
        .update({
            status: 'resolved',
            verdict: verdict,
            admin_notes: notes,
        })
        .eq('id', disputeId);

    if (updateError) {
        throw new Error("Failed to update dispute status");
    }

    // 4. Update Lesson Status
    await supabase.from('lessons').update({ status: 'canceled' }).eq('id', lesson.id);

    revalidatePath(`/admin/disputes/${disputeId}`);
    revalidatePath(`/admin/disputes`);
}
