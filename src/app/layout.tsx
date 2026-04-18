import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "@/components/marketing/Navbar"

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
        className="antialiased  bg-white font-sans dark:bg-neutral-950 dark:text-white transition-colors"
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
