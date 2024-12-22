import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/fonts.css";


import ReactQueryProvider from '@/providers/react-query-provider'
import { Toaster } from "@/components/ui/Toaster";


export const metadata: Metadata = {
  title: "CartTel",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
      <html lang="en">
        <body>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
        </body>
      </html>

  )
}







