import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import AwaitingProcess from '@/components/others/import/procurement/awaiting/awaiting-process'

import CreateProcurement from '@/components/others/import/procurement/create/create-procurement'

export const metadata: Metadata = {
    title: "CartTel Import . Awaiting Process",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

interface AwaitingProcessDetailProps {
    params: {
        id: string;
    };
}

function Await({ params: { id } } :AwaitingProcessDetailProps) {
    return <AwaitingProcess id={id} />;
}

export default Await