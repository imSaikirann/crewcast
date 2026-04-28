import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  applicationName: "Crewcast",
  title: {
    default: "Crewcast | GitHub-first hiring forms",
    template: "%s | Crewcast",
  },
  description:
    "Crewcast helps teams publish role-specific hiring forms, collect structured applications, and review candidates with public GitHub signal scoring.",
  keywords: [
    "Crewcast",
    "hiring forms",
    "technical recruiting",
    "GitHub candidate screening",
    "developer hiring",
    "candidate submissions",
    "recruiter dashboard",
  ],
  authors: [{ name: "Crewcast" }],
  creator: "Crewcast",
  publisher: "Crewcast",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Crewcast | GitHub-first hiring forms",
    description:
      "Publish software hiring forms, collect applications, and shortlist candidates with public GitHub-backed signals.",
    url: "/",
    siteName: "Crewcast",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Crewcast logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crewcast | GitHub-first hiring forms",
    description:
      "Create structured hiring forms and review developer candidates with public GitHub signal scoring.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head lang="en" className="dark" >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem("crewcast-theme") || "system";
                var resolved = theme === "system"
                  ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
                  : theme;
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(resolved);
                document.documentElement.dataset.theme = theme;
                document.documentElement.style.colorScheme = resolved;
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className="bg-background font-sans antialiased transition-colors"
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
