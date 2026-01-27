'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function InstructorStatusGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function checkStatus() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/instructor/login');
                return;
            }

            const { data: instructor } = await supabase
                .from('instructors')
                .select('status')
                .eq('id', user.id)
                .single();

            if (instructor && instructor.status !== 'active') {
                router.push('/instructor/onboarding/confirmation');
            }
        }

        checkStatus();
    }, [router, supabase]);

    return <>{children}</>;
}
