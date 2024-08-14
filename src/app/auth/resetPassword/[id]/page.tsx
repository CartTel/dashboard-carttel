

import { Metadata } from 'next'
import React, { Suspense } from 'react'
import Spinner from '@/components/ui/Spinner/Spinner';
import ResetPassword from '@/components/others/resetPassword/resetPassword';




export const metadata: Metadata = {
    title: "CarTtel . Reset Password",
    icons: '/images/Logo/CARTEL-ICONMARK-HIGHER.png',
    openGraph: {
        images: ['https://app.carttel.africa/images/Logo/CARTEL.png']
    }
}

export async function generateStaticParams() {
    try {
        return [
            { id: '595793er9ri908' },
        ];
    } catch (error) {
        console.error("Error generating static params:", error);
        return []; // Return an empty array or handle as needed
    }
}


function Reset() {
    return (
        <Suspense fallback={<Spinner/>}>
            <ResetPassword/>
        </Suspense>
    )
}

export default Reset;