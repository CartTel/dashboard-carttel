import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
import AdminDashboard from '@/components/others/admin/admin-dashboard'
// import Dashboard from '@/components/others/hagul/main-dashboard';



export const metadata: Metadata = {
    title: "CartTel Admin . Dashboard",
    icons: '/images/carttel-favicon.ico',
    openGraph: {
        images: ['https://app.carttel.africa/images/carttel-favicon.ico']
    }
}

function Page() {
    return (
        <div className='flex justify-center'>
            <AdminDashboard />
        </div>
    )
}

export default Page