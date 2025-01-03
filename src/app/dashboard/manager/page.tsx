import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
// import Dashboard from '@/components/others/hagul/main-dashboard';



export const metadata: Metadata = {
    title: "CartTel Manager . Dashboard",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className='flex justify-center'>
            {/* <Dashboard /> */}
            <div>Manager</div>
        </div>
    )
}

export default Page