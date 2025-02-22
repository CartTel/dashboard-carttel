import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
// import { MainShipment } from '@/components/others/admin/shipment'
import { MainProcurement } from '@/components/others/admin/procurement/main-procurement'




export const metadata: Metadata = {
    title: "CartTel Admin . Procurement",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className='flex justify-center'>
            <MainProcurement />
        </div>
    )
}

export default Page