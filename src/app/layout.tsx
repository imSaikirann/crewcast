import type { Metadata } from "next"
import { DM_Sans, Sora } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "@/components/marketing/Navbar"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Crewcast",
  description: "Hiring assistant platform for quickly finding top talent.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${sora.variable} bg-background font-sans antialiased transition-colors`}
      >
        <Providers>
          {/* Providers must receive ONE ReactNode */}
          <>
            <Navbar />
            {children}
          </>
        </Providers>
      </body>
    </html>
  )
}
