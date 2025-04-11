import { siteMetadata } from "@/lib/metadata"
import { Inter } from "next/font/google"
import Head from "next/head"
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
      <Head>
        {/* Предварительная загрузка изображений */}
        <link rel="preload" href="/foam.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/man.avif" as="image" fetchPriority="high" />

        {/* Обновлённые Open Graph и Twitter теги */}
        <meta
          property="og:title"
          content="Nikita — UI/UX Designer & Developer"
        />
        <meta
          property="og:description"
          content="Разработка современных адаптивных веб-приложений и Telegram-ботов с акцентом на производительность, дизайн и SEO."
        />
        <meta property="og:url" content="https://enkeym.site" />
        {/* Используем JPEG-версию для совместимости с Telegram */}
        <meta property="og:image" content="https://enkeym.site/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Nikita — UI/UX Designer & Developer"
        />
        <meta
          name="twitter:description"
          content="Создание веб-приложений, интерфейсов и 3D сцен."
        />
        <meta name="twitter:image" content="https://enkeym.site/og-image.jpg" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
