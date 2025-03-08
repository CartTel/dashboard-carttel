import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'

// import { MainPickup } from '@/components/others/admin/pickup/main-pickup'
import { MainDropoff } from '@/components/others/admin/dropoff/main-dropoff'

export const metadata: Metadata = {
    title: "CartTel Admin . DropOff",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <MainDropoff />
        </div>
    )
}

export default Page