
import { Metadata } from 'next'
import React from 'react'
import { ViewShipment } from '@/components/others/import/shipment/view-shipment/view-shipment'



export const metadata: Metadata = {
    title: "CartTel . Shipment | View Shipment",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface ViewShipmentProps {
    params: {
        id: string;
    };
}
function ViewShipmentPage({ params: { id } }: ViewShipmentProps) {
    return (
        <ViewShipment id={id} />
    )
}

export default ViewShipmentPage
