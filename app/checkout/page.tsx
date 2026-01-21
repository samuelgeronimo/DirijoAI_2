
import { Suspense } from 'react';
import CheckoutPage from '@/components/CheckoutPage';

export default function Page() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div></div>}>
            <CheckoutPage />
        </Suspense>
    );
}
