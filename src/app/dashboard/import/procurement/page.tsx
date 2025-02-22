import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import { MainShipment } from '@/components/others/admin/shipment'

import { ImportProcurement } from '@/components/others/import/procurement/import-procurement'




export const metadata: Metadata = {
    title: "CartTel Import . Import | Procurement",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className='flex justify-center'>
            <ImportProcurement />
        </div>
    )
}

export default Page