import { defaultSeo } from "@/lib/seo"

export default function Head() {
  return (
    <>
      <title>{defaultSeo.title}</title>
      <meta name="description" content={defaultSeo.description} />
      <link rel="canonical" href={defaultSeo.canonical} />

      {/* OpenGraph */}
      {defaultSeo.openGraph?.images?.map((img) => (
        <meta key={img.url} property="og:image" content={img.url} />
      ))}

      <meta property="og:type" content={defaultSeo.openGraph?.type} />
      <meta property="og:locale" content={defaultSeo.openGraph?.locale} />
      <meta property="og:url" content={defaultSeo.openGraph?.url} />
      <meta property="og:site_name" content={defaultSeo.openGraph?.site_name} />

      {/* Доп. meta-теги */}
      {defaultSeo.additionalMetaTags?.map((tag, i) => (
        <meta key={i} {...tag} />
      ))}

      {/* Favicon / manifest */}
      {defaultSeo.additionalLinkTags?.map((tag, i) => (
        <link key={i} {...tag} />
      ))}
    </>
  )
}
