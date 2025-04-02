export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://enkeym.site/sitemap.xml
Host: https://enkeym.site
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
}
