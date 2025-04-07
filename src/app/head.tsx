// app/head.tsx
import { SEO } from "@/lib/next-seo.config"
import { DefaultSeo } from "next-seo"

export default function Head() {
  return (
    <>
      <DefaultSeo {...SEO} />
    </>
  )
}
