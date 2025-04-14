import { homepageJsonLd, portfolioJsonLd, websiteJsonLd } from "./jsonld"

const siteUrl = "https://enkeym.site"

export const SEO = {
  title: "Nikita — UI/UX Designer & Developer",
  description:
    "Разработка адаптивных веб-приложений и Telegram-ботов с акцентом на производительность, UX и SEO.",
  canonical: siteUrl,
  themeColor: "#12071f",

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    site_name: "Nikita Portfolio",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nikita Portfolio Preview",
        type: "image/jpeg"
      },
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
    { property: "og:see_also", content: "https://t.me/enkeym" }
  ],

  additionalJsonLd: [portfolioJsonLd, websiteJsonLd, homepageJsonLd]
}
