const siteUrl = "https://enkeym.site"

export const SEO = {
  title: "Nikita — UI/UX Designer & Developer",
  description: "Портфолио, UI дизайн, Frontend 3D и взаимодействие с Canvas.",
  canonical: siteUrl,

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
    {
      name: "author",
      content: "Nikita (@enkeym)"
    },
    {
      name: "keywords",
      content:
        "Nikita, UI/UX, Frontend, React, Canvas, 3D, Portfolio, Developer"
    },
    {
      property: "og:see_also",
      content: "https://t.me/enkeym"
    }
  ],

  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.avif"
    },
    {
      rel: "apple-touch-icon",
      href: "/og-image.avif"
    },
    {
      rel: "manifest",
      href: "/manifest.json"
    }
  ],

  additionalJsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Nikita",
      url: siteUrl,
      image: `${siteUrl}/og-image.avif`,
      jobTitle: "Fullstack Developer",
      worksFor: {
        "@type": "Organization",
        name: "freelance",
        url: siteUrl
      },
      sameAs: ["https://t.me/enkeym"]
    }
  ]
}
