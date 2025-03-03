

import { Metadata } from 'next'
import React from 'react'

import { CreatePickup } from '@/components/others/import/pickup/create-pickup'


export const metadata: Metadata = {
    title: "CartTel . Shipment | Create Pickup",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface CreatePickupProps {
    params: {
        id: string;
    };
}


function CreatePickupPage({ params: { id } }: CreatePickupProps){
    return (
        <CreatePickup id={id}/>
    )
}

export default CreatePickupPage