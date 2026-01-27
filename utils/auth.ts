// Authorization utilities
// Fixes: Weak authorization checks (Issue #3)

import { createClient } from "@/utils/supabase/server";

export class AuthorizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthorizationError';
    }
}

export async function requireAuth() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new AuthorizationError('Authentication required');
    }

    return user;
}

export async function requireAdmin() {
    const user = await requireAuth();
    const supabase = await createClient();

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (error) {
        throw new AuthorizationError('Failed to verify user role');
    }

    if (profile?.role !== 'admin') {
        throw new AuthorizationError('Admin access required');
    }

    return user;
}

export async function requireInstructor() {
    const user = await requireAuth();
    const supabase = await createClient();

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (error) {
        throw new AuthorizationError('Failed to verify user role');
    }

    if (profile?.role !== 'instructor') {
        throw new AuthorizationError('Instructor access required');
    }

    return user;
}
