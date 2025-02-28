import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import CreateAddress from '@/components/others/import/address-book/create/create-address'



export const metadata: Metadata = {
    title: "CartTel Import . Create Address",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Create() {
    return (
        <div className=''>
            <CreateAddress />
        </div>
    )
}

export default Create