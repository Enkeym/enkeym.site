// next.config.ts

import withBundleAnalyzer from "@next/bundle-analyzer"
import { createSecureHeaders } from "next-secure-headers"
import { Configuration as WebpackConfiguration } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

const isDev = process.env.NODE_ENV === "development"
const isAnalyze = process.env.ANALYZE === "true"

// Безопасные заголовки
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

const baseConfig = {
  reactStrictMode: true,

  async headers() {
    if (isDev) return []
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ]
  },

  webpack(config: WebpackConfiguration, { isServer }: { isServer: boolean }) {
    if (isAnalyze && !isServer) {
      config.plugins?.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "./.next/analyze/client.html"
        })
      )
    }
    return config
  }
}

export default withBundleAnalyzer({
  enabled: isAnalyze
})(baseConfig)
