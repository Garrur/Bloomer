import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Cormorant_Garamond } from "next/font/google"
import type React from "react"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={serif.variable}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}

