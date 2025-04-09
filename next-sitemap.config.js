/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://enkeym.site",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/404", "/_not-found"],
  outDir: "./public",
  alternateRefs: [
    {
      href: "https://enkeym.site",
      hreflang: "ru"
    }
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/404", "/_not-found"]
      }
    ],
    additionalSitemaps: ["https://enkeym.site/sitemap.xml"]
  },
  transform: async (config, path) => {
    if (path.includes("/#")) return null

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    }
  }
}
