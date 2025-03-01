import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'

import { PickupPage } from '@/components/others/import/pickup/pickup'


export const metadata: Metadata = {
    title: "CartTel Import . Pickup",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <PickupPage />
        </div>
    )
}

export default Page