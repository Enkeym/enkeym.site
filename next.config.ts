import { createSecureHeaders } from "next-secure-headers"

const isDev = process.env.NODE_ENV === "development"

const nextConfig = {
  async headers() {
    if (isDev) return []

    const secureHeaders = createSecureHeaders({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "blob:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"]
        }
      },
      frameGuard: "deny",
      referrerPolicy: "no-referrer-when-downgrade",
      xssProtection: "block-rendering",
      nosniff: "nosniff",
      expectCT: [
        true,
        {
          maxAge: 86400,
          enforce: true
        }
      ]
    })

    return [
      {
        source: "/(.*)",
        headers: [
          ...secureHeaders,
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          }
        ]
      }
    ]
  }
}

export default nextConfig
