

import { Metadata } from 'next'
import React from 'react'

import { CreateWarehouse } from '@/components/others/import/warehouse/create-warehouse'


export const metadata: Metadata = {
    title: "CartTel . Shipment | Create Warehouse",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface CreateWarehouseProps {
    params: {
        id: string;
    };
}
function CreateWarehousePage({ params: { id } }: CreateWarehouseProps){
    return (
        <CreateWarehouse id={id}/>
    )
}

export default CreateWarehousePage