import { Inter } from "next/font/google"
import "./styles/globals.css"
import "./styles/variables.css"

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
        <link rel="apple-touch-icon" href="/og-image.avif" />
        <meta name="theme-color" content="#12071f" />

        {/* Структурированные данные JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nikita",
              url: "https://enkeym.site",
              image: "https://enkeym.site/og-image.avif",
              jobTitle: "Fullstack Developer",
              worksFor: {
                "@type": "Organization",
                name: "freelance",
                url: "https://enkeym.site"
              },
              sameAs: ["https://t.me/enkeym"]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
