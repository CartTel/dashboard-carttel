import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import CreateShipment from '@/components/others/import/shipment/create-shipment'



export const metadata: Metadata = {
    title: "CartTel Import . Shipment",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Create() {
    return (
        <div className='flex justify-center'>
            <CreateShipment />
        </div>
    )
}

export default Create