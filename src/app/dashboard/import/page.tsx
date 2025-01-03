import React from 'react'
import { ResolvingMetadata, Metadata } from 'next'
// import { ImportDashboard } from '@/components/others/import'
// import { ImportDashboard } from '@/components/others/'

import ImportDashboard from '@/components/others/import/import-dashboard'
// import Dashboard from '@/components/others/hagul/main-dashboard';



export const metadata = {
    title: "CartTel Import . Dashboard",
    icons: {
      icon: "/images/carttel-favicon.ico", // Path to your favicon
      shortcut: "/images/carttel-favicon.ico", // Optional: Shortcut icon
      apple: "/images/carttel-favicon.ico", // Optional: Apple touch icon
    },
    openGraph: {
      images: ["https://app.carttel.africa/images/carttel-favicon.ico"], // OpenGraph image
    },
  };

function Page() {
    return (
        <div className='flex justify-center'>
            <ImportDashboard />
        </div>
    )
}

export default Page