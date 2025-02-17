
import { CreateInvoice } from '@/components/others/admin/shipment/create-invoice'
import { Metadata } from 'next'
import React from 'react'
import { EditShipment } from '@/components/others/import/shipment/edit-shipment/edit-shipment'


export const metadata: Metadata = {
    title: "CartTel . Shipment | Edit Shipment",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface EditShipmentProps {
    params: {
        id: string;
    };
}
function EditShipmentPage({ params: { id } }: EditShipmentProps) {
    return (
        <EditShipment id={id} />
    )
}

export default EditShipmentPage
