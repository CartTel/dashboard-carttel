import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import CreateProcurementForShipment from '@/components/others/import/procurement/create-shipment/create-shipment'


export const metadata: Metadata = {
    title: "CartTel Import . Create Procurement | Shipment",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

interface CreateShipmentForProcurementProps {
    params: {
        id: string;
    };
}

function CreateShipmentForProcurement({ params: { id } } :CreateShipmentForProcurementProps) {
    return (
        <div className='flex justify-center'>
            <CreateProcurementForShipment id={id}/>
        </div>
    )
}

export default CreateShipmentForProcurement