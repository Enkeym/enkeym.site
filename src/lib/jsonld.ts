// jsonld.ts
const siteUrl = "https://enkeym.site"

export const portfolioJsonLd = {
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
  sameAs: ["https://t.me/enkeym"],
  description: "Профессиональный UI/UX дизайнер и fullstack разработчик.",
  knowsAbout: ["Frontend", "React", "Next.js", "Docker", "SEO", "3D", "Canvas"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Business",
      telephone: "+7-903-287-2399",
      email: "nikita.korolev96@outlook.com",
      url: siteUrl
    }
  ]
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
  name: "Nikita Portfolio",
  author: {
    "@type": "Person",
    name: "Nikita"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Главная страница портфолио",
  description: "Портфолио фронтенд-разработчика и дизайнера Nikita...",
  url: siteUrl,
  inLanguage: "ru-RU",
  datePublished: "2023-01-01T08:00:00+03:00",
  dateModified: "2025-04-07T10:00:00+03:00"
}
