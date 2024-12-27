import { Metadata } from 'next';
import React, { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner/Spinner';
import ResetPassword from '@/components/others/resetPassword/resetPassword';
import ConfirmAccount from '@/components/others/confirmAccount/confirmAccount';


export const metadata: Metadata = {
    title: 'CarTtel . Reset Password',
    icons: '/images/Logo/CARTEL-ICONMARK-HIGHER.png',
    openGraph: {
        images: ['https://app.carttel.africa/images/Logo/CARTEL.png'],
    },
};


async function Confirm() {
    return (
        <Suspense fallback={<Spinner />}>
            <ConfirmAccount /> {/* Pass the token data to ResetPassword */}
        </Suspense>
    );
}

export default Confirm;
