
import { CreateInvoice } from '@/components/others/admin/shipment/create-invoice'
import { Metadata } from 'next'
import React from 'react'
import UpdateProcurementDetails from '@/components/others/admin/procurement/update-procurement'


export const metadata: Metadata = {
    title: "CartTel . Procurement | Update Procurement",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface UpdateProcurementProps {
    params: {
        id: string;
    };
}
function UpdateProcurementPage({ params: { id } }: UpdateProcurementProps){
    return (
        <UpdateProcurementDetails id={id}/>
    )
}

export default UpdateProcurementPage