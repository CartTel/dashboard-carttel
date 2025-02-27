import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import CreateShipment from '@/components/others/import/shipment/create-shipment'

import PlanPage from '@/components/others/import/plan/plan-page'

export const metadata: Metadata = {
    title: "CartTel Import . Plans",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function CreatePlan() {
    return (
        <div>
            <PlanPage />
        </div>
    )
}

export default CreatePlan