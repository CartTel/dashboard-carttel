

import { Metadata } from 'next'
import React from 'react'

import { DropoffDetails } from '@/components/others/admin/dropoff/dropoff-details'


export const metadata: Metadata = {
    title: "CartTel . Dropoff Details",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface DropoffDetailsProps {
    params: {
        id: string;
    };
}


function DropoffDetailsPage({ params: { id } }: DropoffDetailsProps){
    return (
        <DropoffDetails id={id}/>
    )
}

export default DropoffDetailsPage