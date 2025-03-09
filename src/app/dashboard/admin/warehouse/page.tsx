import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'

import { MainWarehouse } from '@/components/others/admin/warehouse/main-warehouse'


export const metadata: Metadata = {
    title: "CartTel Admin . Warehouse",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <MainWarehouse />
        </div>
    )
}

export default Page