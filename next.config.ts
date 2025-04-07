// next.config.ts
import withBundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"
import { createSecureHeaders } from "next-secure-headers"

const isDev = process.env.NODE_ENV === "development"
const isAnalyze = process.env.ANALYZE === "true"

// Заголовки безопасности
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
  expectCT: [true, { maxAge: 86400, enforce: true }]
})

const securityHeaders = [
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

// Основная конфигурация
const baseConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    if (isDev) return []
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ]
  }
}

// Оборачиваем с анализатором бандла
export default withBundleAnalyzer({
  enabled: isAnalyze
})(baseConfig)
