import type { Metadata } from "next"

export const siteUrl = "https://enkeym.site"

export interface SiteMetadata extends Metadata {
  keywords?: string[]
  other?: Record<string, string>
}

export const siteMetadata: SiteMetadata = {
  metadataBase: new URL(siteUrl),

  title: "Nikita — UI/UX Designer & Developer",
  description:
    "Портфолио UI/UX-дизайнера и fullstack-разработчика Nikita Korolev. Разработка адаптивных веб-приложений, 3D-интерфейсов и Telegram-ботов.",

  keywords: [
    "Nikita Korolev",
    "UI/UX-дизайн и фронтенд",
    "портфолио fullstack-разработчика",
    "React и Next.js",
    "Three.js и 3D Web",
    "Canvas, WebGL и анимации",
    "адаптивная и семантическая верстка",
    "SEO и Core Web Vitals",
    "PWA и производительность",
    "Docker и CI/CD",
    "Telegram-боты (Node.js)",
    "AI генерация и Stable Diffusion",
    "Point-E и генерация 3D из изображений",
    "Linux VPS и деплой Nginx",
    "визуальный интерфейс и UX"
  ],

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Nikita Portfolio",
    title: "Nikita — UI/UX Designer & Developer",
    description:
      "Портфолио UI/UX-дизайнера и fullstack-разработчика. Создание веб-приложений, Telegram-ботов и 3D-интерфейсов с акцентом на UX, доступность и SEO.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    site: "@enkeym",
    creator: "@enkeym",
    title: "Nikita — UI/UX Designer & Developer",
    description:
      "Создание веб-приложений, интерфейсов и 3D сцен. Адаптивный дизайн, UX, SEO и автоматизация на основе ИИ.",
    images: [`${siteUrl}/og-image.jpg`]
  },

  other: {
    "og:image": `${siteUrl}/og-image.jpg`,
    "og:image:type": "image/jpeg",
    "og:image:width": "1200",
    "og:image:height": "630",
    "twitter:image": `${siteUrl}/og-image.jpg`,
    "twitter:image:alt": "Nikita Portfolio Preview"
  },

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "manifest", url: "/site.webmanifest" },
      {
        rel: "icon",
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        rel: "icon",
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },

  robots: {
    index: true,
    follow: true
  },

  verification: {
    google: "googledcc9cced001206af",
    yandex: "ae4421aecc9156f0"
  },

  applicationName: "Nikita Portfolio",
  creator: "Nikita Korolev",
  publisher: "Nikita, freelance"
}
