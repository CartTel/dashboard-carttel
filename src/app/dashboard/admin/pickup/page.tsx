import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'

import { MainPickup } from '@/components/others/admin/pickup/main-pickup'


export const metadata: Metadata = {
    title: "CartTel Admin . Pickup",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <MainPickup />
        </div>
    )
}

export default Page