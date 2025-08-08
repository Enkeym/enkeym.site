/** @type {import('next-sitemap').IConfig} */
export const siteUrl = "https://enkeym.site"
export const generateRobotsTxt = true
export const generateIndexSitemap = true
export const outDir = "./out"
export const changefreq = "weekly"
export const priority = 0.7
export const sitemapSize = 5000
export const exclude = ["/500", "/preview", "/internal-test"]
export const alternateRefs = [
  {
    href: "https://enkeym.site",
    hreflang: "ru"
  }
]
export const robotsTxtOptions = {
  policies: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/500", "/preview", "/internal-test"]
    }
  ],
  additionalSitemaps: ["https://enkeym.site/sitemap.xml"]
}
export async function transform(config, path) {
  if (
    path.includes("/#") ||
    path.includes("?") ||
    ["/preview", "/internal-test"].includes(path)
  ) {
    return null
  }

  return {
    loc: `${config.siteUrl}${path}`,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: new Date().toISOString()
  }
}
