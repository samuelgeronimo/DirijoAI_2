"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getPlatformTakeRate } from "@/app/admin/actions";
import { logger } from "@/utils/logger";
import { LessonIdSchema, SalesFeedbackSchema, LedgerMetadataSchema, BankDetailsSchema, validateInput } from "@/utils/validation/schemas";
import type { SalesFeedback, LessonUpdatePayload } from "@/types/actions";

export async function startLesson(lessonId: string) {
    // Validate input
    const validatedId = validateInput(LessonIdSchema, lessonId);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/instructor/login');
    }

    logger.info('Starting lesson', { lessonId: validatedId, instructorId: user.id });

    const { error, data } = await supabase
        .from('lessons')
        .update({ status: 'in_progress', updated_at: new Date().toISOString() })
        .eq('id', validatedId)
        .eq('instructor_id', user.id)
        .select();

    if (error) {
        logger.error('Failed to start lesson', { lessonId: validatedId, error: error.message });
        throw new Error(`Failed to start lesson ${validatedId}: ${error.message}`);
    }

    if (!data || data.length === 0) {
        logger.warn('Lesson not found or unauthorized', { lessonId: validatedId, instructorId: user.id });
        throw new Error('Lesson not found or not yours');
    }

    logger.info('Lesson started successfully', { lessonId: validatedId });
    revalidatePath('/instructor/dashboard');
    redirect('/instructor/active-lesson');
}



export async function completeLesson(feedbackData?: SalesFeedback) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/instructor/login');
    }

    // Validate feedback if provided
    if (feedbackData) {
        validateInput(SalesFeedbackSchema, feedbackData);
    }

    // 1. Find the current active lesson
    const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .select('id, price_cents, student_id')
        .eq('instructor_id', user.id)
        .eq('status', 'in_progress')
        .single();

    if (lessonError || !lesson) {
        logger.error('No active lesson found', { instructorId: user.id, error: lessonError?.message });

        // DIAGNOSTIC: List recent lessons
        const { data: recentLessons } = await supabase
            .from('lessons')
            .select('id, status, scheduled_at')
            .eq('instructor_id', user.id)
            .order('scheduled_at', { ascending: false })
            .limit(5);

        logger.debug('Recent lessons', { recentLessons });
        redirect('/instructor/dashboard');
    }

    const priceCents = lesson.price_cents || 0;
    const platformTakeRate = await getPlatformTakeRate();
    const instructorRate = (100 - platformTakeRate) / 100;
    const instructorShare = Math.floor(priceCents * instructorRate);

    logger.info('Completing lesson', {
        lessonId: lesson.id,
        priceCents,
        platformTakeRate,
        instructorShare
    });

    // A. Update Lesson Status & Save Feedback
    const updatePayload: LessonUpdatePayload = {
        status: 'completed',
        updated_at: new Date().toISOString()
    };

    if (feedbackData) {
        updatePayload.instructor_score = feedbackData.score;
        updatePayload.skills_evaluation = feedbackData.skills;
    }

    const { error: updateError } = await supabase
        .from('lessons')
        .update(updatePayload)
        .eq('id', lesson.id);

    if (updateError) {
        logger.error('Failed to update lesson status', { lessonId: lesson.id, error: updateError.message });
        throw new Error(`Failed to complete lesson ${lesson.id}: ${updateError.message}`);
    }

    // B. Update Balance (ATOMIC RPC)
    // Note: After running migration 20260127_create_atomic_balance_rpc.sql
    try {
        const { data: newBalance, error: balanceError } = await supabase
            .rpc('increment_instructor_balance', {
                instructor_uuid: user.id,
                amount_cents: instructorShare
            });

        if (balanceError) {
            logger.error('Failed to update instructor balance', {
                instructorId: user.id,
                amount: instructorShare,
                error: balanceError.message
            });
            throw new Error('Failed to update balance');
        }

        logger.info('Balance updated', { instructorId: user.id, newBalance });
    } catch (error) {
        logger.error('RPC call failed', { error });
        throw error;
    }

    // C. Create Ledger Entry (with validation)
    const metadata = validateInput(LedgerMetadataSchema, {
        lesson_id: lesson.id,
        student_id: lesson.student_id
    });

    const { error: ledgerError } = await supabase.from('ledger_entries').insert({
        profile_id: user.id,
        amount_cents: instructorShare,
        operation_type: 'credit',
        category: 'lesson_payment',
        description: 'Pagamento por aula finalizada',
        metadata
    });

    if (ledgerError) {
        logger.error('Failed to create ledger entry', { error: ledgerError.message });
        // Don't throw - balance already updated
    }

    logger.info('Lesson completed successfully', { lessonId: lesson.id });

    revalidatePath('/student/performance');
    redirect('/instructor/dashboard');
}

export async function updateBankDetails(formData: {
    pix_key: string;
    bank_name: string;
    account_number: string;
    agency_number: string;
    account_type: string;
}) {
    const validated = validateInput(BankDetailsSchema, formData);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/instructor/login');
    }

    const { error, count } = await supabase
        .from('instructors')
        .update({
            pix_key: validated.pix_key,
            bank_name: validated.bank_name,
            account_number: validated.account_number,
            agency_number: validated.agency_number,
            account_type: validated.account_type,
            updated_at: new Date().toISOString()
        }, { count: 'exact' })
        .eq('id', user.id);

    if (error) {
        logger.error('Failed to update bank details', { instructorId: user.id, error: error.message });
        throw new Error(`Erro ao salvar dados bancários: ${error.message}`);
    }

    if (count === 0) {
        logger.error('No instructor record found to update', { instructorId: user.id });
        throw new Error('Perfil de instrutor não encontrado. Por favor, complete o onboarding.');
    }

    logger.info('Bank details updated successfully', { instructorId: user.id });
    revalidatePath('/instructor/wallet');
    return { success: true };
}

