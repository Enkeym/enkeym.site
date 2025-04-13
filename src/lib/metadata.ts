import type { Metadata } from "next"

const isProd = process.env.NODE_ENV === "production"
export const siteUrl = isProd ? "https://enkeym.site" : ""

export interface SiteMetadata extends Metadata {
  keywords?: string[]
  other?: Record<string, string>
}

export const siteMetadata: SiteMetadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),

  title: "Nikita — UI/UX Designer & Developer",

  description:
    "Портфолио UI/UX-дизайнера и fullstack-разработчика Nikita Korolev. Создаю современные адаптивные веб-приложения, интерактивные интерфейсы, Telegram-ботов и 3D-сцены на базе React, Next.js и Three.js. Специализируюсь на производительности, доступности (A11Y), семантической верстке и SEO-оптимизации. Использую TypeScript, Node.js, Docker и фреймворки нового поколения. Применяю искусственный интеллект для генерации контента, анализа UX и автоматизации. Сильный акцент на анимации, визуальный дизайн и качественный код, соответствующий лучшим практикам.",

  keywords: [
    "Nikita",
    "Nikita Korolev",
    "Enkeym",
    "Nikita Portfolio",
    "UI",
    "UX",
    "UI/UX",
    "UX/UI дизайн",
    "UI-дизайн",
    "UX-дизайн",
    "дизайнер интерфейсов",
    "frontend",
    "fullstack",
    "frontend разработка",
    "fullstack разработка",
    "веб-разработка",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Docker",
    "SCSS",
    "HTML5",
    "CSS3",
    "Webpack",
    "Vite",
    "Framer Motion",
    "Canvas",
    "WebGL",
    "Three.js",
    "React Three Fiber",
    "GLTF",
    "draco",
    "3D Web",
    "Three.js Developer",
    "анимации",
    "плавные переходы",
    "интерактивный интерфейс",
    "веб-анимация",
    "векторная графика",
    "SVG-анимация",
    "Parallax",
    "Scroll animation",
    "Motion design",
    "SEO",
    "оптимизация производительности",
    "responsive design",
    "адаптивный дизайн",
    "семантическая верстка",
    "доступность",
    "A11Y",
    "PWA",
    "перфоманс",
    "core web vitals",
    "REST API",
    "CI/CD",
    "GitHub Actions",
    "Nginx",
    "reverse proxy",
    "web hosting",
    "VPS",
    "Linux deploy",
    "Cloudflare",
    "Telegram bots",
    "боты на Node.js",
    "Telegram API",
    "AI генерация",
    "Stable Diffusion",
    "Point-E",
    "3D генерация из изображений",
    "портфолио разработчика",
    "портфолио дизайнера",
    "портфолио фронтенд",
    "freelance разработчик",
    "дизайнер сайтов",
    "создание сайтов",
    "разработка лендингов",
    "веб-приложения",
    "интерфейсы будущего",
    "визуальный фронтенд"
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
        alt: "Nikita Portfolio Preview JPEG"
      },
      {
        url: `${siteUrl}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview AVIF"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Nikita — UI/UX Designer & Developer",
    description:
      "Создание веб-приложений, интерфейсов и 3D сцен. Адаптивный дизайн, UX, SEO и автоматизация на основе ИИ.",
    creator: "@enkeym",
    site: "@enkeym"
  },

  other: {
    // Twitter Player
    "twitter:player": `${siteUrl}/preview-player.html`,
    "twitter:player:width": "600",
    "twitter:player:height": "600",
    "twitter:image": `${siteUrl}/og-image.avif`,

    // OpenGraph override for Telegram / Discord
    "og:title": "Nikita — UI/UX Designer & Developer",
    "og:description":
      "Портфолио фронтенд-разработчика и UI/UX дизайнера. Telegram-боты, 3D-интерфейсы и адаптивные приложения.",
    "og:image": `${siteUrl}/og-image.jpg`,
    "og:url": siteUrl,
    "og:type": "website",

    // Verification
    "google-site-verification": "googledcc9cced001206af",
    "yandex-verification": "058c94779e907eaf"
  },

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.avif", type: "image/avif" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "shortcut icon", url: "/favicon.ico" },
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
