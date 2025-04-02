import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/og-image.jpg" />
        <meta name="theme-color" content="#12071f" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
