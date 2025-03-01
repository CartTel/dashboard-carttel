import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'

import { DropOffPage } from '@/components/others/import/dropoff/dropoff'


export const metadata: Metadata = {
    title: "CartTel Import . Dropoff",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <DropOffPage />
        </div>
    )
}

export default Page