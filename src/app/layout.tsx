import { Inter } from "next/font/google"
import "./styles/globals.css"
import "./styles/variables.css"
import { siteMetadata } from "@/lib/metadata"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" })

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
