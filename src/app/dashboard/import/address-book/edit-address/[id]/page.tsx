
import { CreateInvoice } from '@/components/others/admin/shipment/create-invoice'
import { Metadata } from 'next'
import React from 'react'
import { EditAddress } from '@/components/others/import/address-book/edit-address/edit-address'

export const metadata: Metadata = {
    title: "CartTel . Import | Edit Address",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface EditAddressProps {
    params: {
        id: string;
    };
}
function EditAddressPage({ params: { id } }: EditAddressProps) {
    return (
        <EditAddress id={id} />
    )
}

export default EditAddressPage
