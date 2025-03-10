import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import { AddressBook } from '@/components/others/import/address-book/address-book'



export const metadata: Metadata = {
    title: "CartTel Import . Address Book",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <AddressBook />
        </div>
    )
}

export default Page