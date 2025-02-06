import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import { ImportShipment } from '@/components/others/import/shipment/import-shipment'



export const metadata: Metadata = {
    title: "CartTel Import . Shipment",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className='flex justify-center'>
            <ImportShipment />
        </div>
    )
}

export default Page