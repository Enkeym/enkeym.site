// seo.ts
import { homepageJsonLd, portfolioJsonLd, websiteJsonLd } from "./jsonld"

const siteUrl = "https://enkeym.site"

export const SEO = {
  title: "Nikita — UI/UX Designer & Developer",
  description:
    "Разработка современных адаптивных веб-приложений и Telegram-ботов с акцентом на производительность, дизайн и SEO.",
  canonical: siteUrl,
  themeColor: "#12071f",

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    site_name: "Nikita Portfolio",
    images: [
      {
        url: `${siteUrl}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview",
        type: "image/avif"
      },
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview",
        type: "image/webp"
      },
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview",
        type: "image/jpeg"
      }
    ],
    profile: {
      username: "enkeym"
    }
  },

  twitter: {
    handle: "@enkeym",
    site: "@enkeym",
    cardType: "summary_large_image"
  },

  additionalMetaTags: [
    { name: "author", content: "Nikita (@enkeym)" },
    {
      name: "keywords",
      content:
        "Nikita, UI/UX, Frontend, React, Next.js, Canvas, 3D, Portfolio, Telegram bots"
    },
    { name: "robots", content: "index, follow" },
    { property: "og:see_also", content: "https://t.me/enkeym" },

    // Мета-теги для верификации
    { name: "google-site-verification", content: "ваш_код_верификации" },
    { name: "yandex-verification", content: "ваш_код_верификации" }
  ],

  additionalLinkTags: [
    { rel: "icon", href: "/favicon.avif", type: "image/avif" },
    { rel: "apple-touch-icon", href: "/og-image.avif" },
    { rel: "manifest", href: "/manifest.json" }
  ],

  // Добавляем хлебные крошки
  additionalJsonLd: [portfolioJsonLd, websiteJsonLd, homepageJsonLd]
}
