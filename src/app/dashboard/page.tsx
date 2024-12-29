import React from "react";
import { ResolvingMetadata, Metadata } from "next";
import Dashboard from "@/components/others/dashboard/main-dashboard";

export const metadata: Metadata = {
    title: "CartTel . Dashboard",
    description: "CartTel - Transforming buildings into smarter places to work and live.",
    openGraph: {
        type: "website",
        url: "https://app.carttel.africa",
        title: "CartTel",
        description: "CartTel - Transforming buildings into smarter places to work and live.",
        siteName: "CartTel",
        images: [{
            url: "https://app.carttel.africa/images/logo.png",
        }],
    }
};



function Page() {
    return (
        <>
            <div className="flex justify-center">
                <Dashboard />
            </div>
        </>
    );
}

export default Page;
