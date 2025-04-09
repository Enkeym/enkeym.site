import { homepageJsonLd, portfolioJsonLd, websiteJsonLd } from "@/lib/jsonld"
import { siteMetadata } from "@/lib/metadata"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#12071f" />
        <meta name="description" content={siteMetadata.description!} />
        <meta
          name="keywords"
          content={
            Array.isArray(siteMetadata.keywords)
              ? siteMetadata.keywords.join(", ")
              : siteMetadata.keywords || ""
          }
        />
        <meta name="author" content="Nikita Korolev" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content={siteMetadata.title as string} />
        <meta property="og:description" content={siteMetadata.description!} />
        <meta property="og:url" content="https://enkeym.site" />
        <meta property="og:site_name" content="Nikita Portfolio" />
        <meta property="og:image" content="https://enkeym.site/og-image.avif" />
        <meta property="og:image:type" content="image/avif" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteMetadata.title as string} />
        <meta name="twitter:description" content={siteMetadata.description!} />
        <meta
          name="twitter:image"
          content="https://enkeym.site/og-image.avif"
        />
        <meta name="twitter:creator" content="@enkeym" />

        {/* Верификация */}
        <meta
          name="google-site-verification"
          content="googledcc9cced001206af"
        />
        <meta name="yandex-verification" content="ae4421aecc9156f0" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Иконки и PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.avif" type="image/avif" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              portfolioJsonLd,
              websiteJsonLd,
              homepageJsonLd
            ])
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
