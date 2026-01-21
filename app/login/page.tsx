
import { Suspense } from 'react';
import AuthPage from '@/components/AuthPage';

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div></div>}>
            <AuthPage />
        </Suspense>
    );
}
