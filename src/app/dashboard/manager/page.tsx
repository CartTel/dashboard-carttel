import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
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
            {/* <Dashboard /> */}
            <div>Manager</div>
        </div>
    )
}

export default Page