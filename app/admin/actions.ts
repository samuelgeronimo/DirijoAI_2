"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
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
