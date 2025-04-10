// lib/siteMetadata.ts
import type { Metadata } from "next"

export const siteUrl = "https://enkeym.site"

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Nikita — UI/UX Designer & Developer",

  description:
    "Портфолио UI/UX-дизайнера и fullstack-разработчика Nikita Korolev. Создаю современные адаптивные веб-приложения, интерактивные интерфейсы, Telegram-ботов и 3D-сцены на базе React, Next.js и Three.js. Специализируюсь на производительности, доступности (A11Y), семантической верстке и SEO-оптимизации. Использую TypeScript, Node.js, Docker и фреймворки нового поколения. Применяю искусственный интеллект для генерации контента, анализа UX и автоматизации. Сильный акцент на анимации, визуальный дизайн и качественный код, соответствующий лучшим практикам.",

  keywords: [
    // Личное и брендинг
    "Nikita",
    "Nikita Korolev",
    "Enkeym",
    "Nikita Portfolio",

    // Основные направления
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

    // Технологии и инструменты
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

    // Анимации и визуал
    "анимации",
    "плавные переходы",
    "интерактивный интерфейс",
    "веб-анимация",
    "векторная графика",
    "SVG-анимация",
    "Parallax",
    "Scroll animation",
    "Motion design",

    // Оптимизация и best practices
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

    // Backend и DevOps
    "REST API",
    "CI/CD",
    "GitHub Actions",
    "Nginx",
    "reverse proxy",
    "web hosting",
    "VPS",
    "Linux deploy",
    "Cloudflare",

    // Telegram и AI
    "Telegram bots",
    "боты на Node.js",
    "Telegram API",
    "AI генерация",
    "Stable Diffusion",
    "Point-E",
    "3D генерация из изображений",

    // Карьера и сфера
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
    title: "Nikita — UI/UX Designer & Developer",
    description:
      "Портфолио UI/UX-дизайнера и fullstack-разработчика. Создание веб-приложений, Telegram-ботов и 3D-интерфейсов с акцентом на UX, доступность и SEO.",
    siteName: "Nikita Portfolio",
    images: [
      {
        url: `${siteUrl}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview"
      },
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview JPEG"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Nikita — UI/UX Designer & Developer",
    description:
      "Создание веб-приложений, интерфейсов и 3D сцен. Адаптивный дизайн, UX, SEO и автоматизация на основе ИИ.",
    creator: "@enkeym",
    images: [`${siteUrl}/og-image.avif`]
  },

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
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

  creator: "Nikita Korolev",
  publisher: "Nikita, freelance",
  applicationName: "Nikita Portfolio"
}
