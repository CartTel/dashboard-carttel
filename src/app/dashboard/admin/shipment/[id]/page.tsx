
import { Metadata, } from 'next'
import React, { Suspense } from 'react'
// import { WorkRequestDetails } from '@/components/others/activity'
import { ShipmentRequestDetails } from '@/components/others/admin/shipment';


export const metadata: Metadata = {
    title: "Filmo Real Estate . Activity",
    icons: '/images/filmo-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/filmo-favicon.ico']
    }
}

interface ShipmentRequestDetailProps {
    params: {
        id: string;
    };
}

function ShipmentRequest({ params: { id } } :ShipmentRequestDetailProps) {
    return <ShipmentRequestDetails id={id} />;
}

export default ShipmentRequest