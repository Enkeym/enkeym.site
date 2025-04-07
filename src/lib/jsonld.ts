// json.ts
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
  description: "Профессиональный UI/UX дизайнер и fullstack разработчик."
}
