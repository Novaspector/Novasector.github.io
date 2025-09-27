import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Richards IT Consultancy - Expert IT Solutions & Training",
  description:
    "Professional IT consulting services and comprehensive training programs. Transform your business with expert technology solutions and advance your career with industry-certified courses.",
  keywords:
    "IT consulting, IT training, cybersecurity, cloud migration, web development, data analytics, DevOps, programming courses",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
