import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
// import { ImportDashboard } from '@/components/others/import'
import { ImportDashboard } from '@/components/others/import'
// import Dashboard from '@/components/others/hagul/main-dashboard';



export const metadata: Metadata = {
    title: "Filmo Real Estate . Dashboard",
    icons: '/images/filmo-favicon.ico',
    openGraph: {
        images: ['https://web.vampfi.com/images/filmo-favicon.ico']
    }
}

function Page() {
    return (
        <div className='flex justify-center'>
            <ImportDashboard />
            {/* <div>User</div> */}
        </div>
    )
}

export default Page