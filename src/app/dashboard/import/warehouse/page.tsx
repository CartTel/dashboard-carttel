import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'

// import { PickupPage } from '@/components/others/import/pickup/pickup'
import { WarehousePage } from '@/components/others/import/warehouse/warehouse'


export const metadata: Metadata = {
    title: "CartTel Import . Warehouse",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <WarehousePage />
        </div>
    )
}

export default Page