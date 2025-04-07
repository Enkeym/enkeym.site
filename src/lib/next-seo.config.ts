import { portfolioJsonLd } from "./jsonld"

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
      content: "Nikita, UI/UX, Frontend, React, Canvas, 3D, Portfolio"
    },
    { property: "og:see_also", content: "https://t.me/enkeym" }
  ],

  additionalLinkTags: [
    { rel: "icon", href: "/favicon.avif", type: "image/avif" },
    { rel: "apple-touch-icon", href: "/og-image.avif" },
    { rel: "manifest", href: "/manifest.json" }
  ],

  additionalJsonLd: [portfolioJsonLd]
}
