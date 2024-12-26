import { Metadata } from 'next';
import React, { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner/Spinner';
import ResetPassword from '@/components/others/resetPassword/resetPassword';
import apiClient from '@/config/api-clients';


export const metadata: Metadata = {
    title: 'CarTtel . Reset Password',
    icons: '/images/Logo/CARTEL-ICONMARK-HIGHER.png',
    openGraph: {
        images: ['https://app.carttel.africa/images/Logo/CARTEL.png'],
    },
};

// Dynamic params fetching
type ResetProps = {
    params: {
        id: string;
    };
};


async function Reset({ params }: ResetProps) {
    const { id } = params;

    return (
        <Suspense fallback={<Spinner />}>
            <ResetPassword userId={id} /> {/* Pass the token data to ResetPassword */}
        </Suspense>
    );
}

export default Reset;
