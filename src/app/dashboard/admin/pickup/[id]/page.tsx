

import { Metadata } from 'next'
import React from 'react'

import { PickupDetails } from '@/components/others/admin/pickup/pickup-details'

// import { CreatePickup } from '@/components/others/import/pickup/create-pickup'

import { CreateDropoff } from '@/components/others/import/dropoff/create-dropoff'


export const metadata: Metadata = {
    title: "CartTel . Pickup Details",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface PickupDetailsProps {
    params: {
        id: string;
    };
}


function PickupDetailsPage({ params: { id } }: PickupDetailsProps){
    return (
        <PickupDetails id={id}/>
    )
}

export default PickupDetailsPage