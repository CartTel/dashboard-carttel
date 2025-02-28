import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'

import ImportDashboard from '@/components/others/import/import-dashboard'

import Referral from '@/components/others/import/invite/invite'


export const metadata: Metadata = {
    title: "CartTel Import . Invite",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className=''>
            <Referral />
        </div>
    )
}

export default Page