import { Inter } from "next/font/google"
import "./styles/globals.css"
import "./styles/variables.css"

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" })

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
