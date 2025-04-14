import withBundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"

const isAnalyze = process.env.ANALYZE === "true"

const baseConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
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
      transform: "three/src/{{member}}"
    }
  }
}

export default withBundleAnalyzer({ enabled: isAnalyze })(baseConfig)
