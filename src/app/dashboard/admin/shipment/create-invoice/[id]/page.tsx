
import { CreateInvoice } from '@/components/others/admin/shipment/create-invoice'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "CartTel . Shipment | Create Invoice",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface CreateInvoiceProps {
    params: {
        id: string;
    };
}
function CreateInvoicePage({ params: { id } }: CreateInvoiceProps){
    return (
        <CreateInvoice id={id}/>
    )
}

export default CreateInvoicePage