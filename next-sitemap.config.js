/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://enkeym.site",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/404"],
  alternateRefs: [
    {
      href: "https://enkeym.site",
      hreflang: "ru"
    }
  ]
}
