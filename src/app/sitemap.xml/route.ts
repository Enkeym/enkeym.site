export async function GET() {
  const urls = ["/", "/#services", "/#portfolio", "/#contact"]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>https://enkeym.site${url}</loc>
      </url>`
      )
      .join("")}
  </urlset>`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml"
    }
  })
}
