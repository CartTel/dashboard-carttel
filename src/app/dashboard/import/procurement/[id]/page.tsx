
import { Metadata, } from 'next'
import React, { Suspense } from 'react'
import { ViewProcurement } from '@/components/others/admin/procurement/view-procurement/view-procurement';

import { ShipmentRequestDetails } from '@/components/others/admin/shipment';


export const metadata: Metadata = {
    title: "CartTel . Procurement-details",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/carttel-favicon.ico']
    }
}

interface ProcurementRequestDetailProps {
    params: {
        id: string;
    };
}

function ProcurementRequest({ params: { id } } :ProcurementRequestDetailProps) {
    return <ViewProcurement id={id} />;
}

export default ProcurementRequest