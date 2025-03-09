

import { Metadata } from 'next'
import React from 'react'

import { WarehouseDetails } from '@/components/others/admin/warehouse/warehouse-details';


export const metadata: Metadata = {
    title: "CartTel . Warehouse Details",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface WarehouseDetailsProps {
    params: {
        id: string;
    };
}


function WarehouseDetailsPage({ params: { id } }: WarehouseDetailsProps){
    return (
        <WarehouseDetails id={id}/>
    )
}

export default WarehouseDetailsPage