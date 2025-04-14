// app/layout.tsx
import { siteMetadata } from "@/lib/metadata"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" })

export const metadata = siteMetadata

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" href="/foam.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/man.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/og-image.jpg" as="image" />
        <link
          rel="preload"
          href="/favicon.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
