
import { CreateInvoice } from '@/components/others/admin/shipment/create-invoice'
import { Metadata } from 'next'
import React from 'react'

import { CreateDropoffInvoice } from '@/components/others/admin/dropoff/dropoff-invoice'


export const metadata: Metadata = {
    title: "CartTel . Dropoff | Create Invoice",
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
        <CreateDropoffInvoice id={id}/>
    )
}

export default CreateInvoicePage