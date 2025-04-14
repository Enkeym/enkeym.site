/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://enkeym.site",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: "./out",

  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  exclude: ["/500", "/preview", "/internal-test"],

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
        disallow: ["/500", "/preview", "/internal-test"]
      }
    ],
    additionalSitemaps: ["https://enkeym.site/sitemap.xml"]
  },

  transform: async (config, path) => {
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
}
