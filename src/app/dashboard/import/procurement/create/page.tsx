import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import CreateShipment from '@/components/others/import/shipment/create-shipment'

import CreateProcurement from '@/components/others/import/procurement/create/create-procurement'

export const metadata: Metadata = {
    title: "CartTel Import . Create Procurement",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Create() {
    return (
        <div className='flex justify-center'>
            <CreateProcurement />
        </div>
    )
}

export default Create