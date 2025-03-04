

import { Metadata } from 'next'
import React from 'react'

// import { CreatePickup } from '@/components/others/import/pickup/create-pickup'

import { CreateDropoff } from '@/components/others/import/dropoff/create-dropoff'


export const metadata: Metadata = {
    title: "CartTel . Shipment | Create Dropoff",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface CreateDropoffProps {
    params: {
        id: string;
    };
}


function CreateDropoffPage({ params: { id } }: CreateDropoffProps){
    return (
        <CreateDropoff id={id}/>
    )
}

export default CreateDropoffPage