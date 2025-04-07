import withBundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"
import { createSecureHeaders } from "next-secure-headers"

type ExtendedExperimentalConfig = NonNullable<NextConfig["experimental"]> & {
  modularizeImports?: Record<
    string,
    {
      transform: string
      skipDefaultConversion?: boolean
    }
  >
}

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
  frameGuard: "deny",
  referrerPolicy: "strict-origin-when-cross-origin",
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
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  },
  { key: "X-Content-Type-Options", value: "nosniff" }
]

const experimental: ExtendedExperimentalConfig = {
  modularizeImports: {
    "framer-motion": {
      transform: "framer-motion/{{member}}"
    },
    three: {
      transform: "three/src/{{member}}",
      skipDefaultConversion: true
    }
  }
}

const baseConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "standalone",

  images: {
    domains: ["enkeym.site"],
    formats: ["image/webp", "image/avif"]
  },

  experimental,

  async headers() {
    if (process.env.NODE_ENV === "development") return []
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ]
  }
}

export default withBundleAnalyzer({ enabled: isAnalyze })(baseConfig)
