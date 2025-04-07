import withBundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"
import { createSecureHeaders } from "next-secure-headers"

const isDev = process.env.NODE_ENV === "development"
const isAnalyze = process.env.ANALYZE === "true"

const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: isDev
        ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
        : ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "https://api.emailjs.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"]
    }
  },
  referrerPolicy: "strict-origin-when-cross-origin"
})

const securityHeaders = [
  ...secureHeaders,
  {
    key: "X-DNS-Prefetch-Control",
    value: "on"
  }
]

const baseConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "export",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enkeym.site",
        pathname: "/images/**"
      }
    ]
  },

  modularizeImports: {
    three: {
      transform: "three/src/{{member}}",
      skipDefaultConversion: true
    }
  },

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

export default withBundleAnalyzer({ enabled: isAnalyze })(baseConfig)
