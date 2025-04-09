"use client"

import { useInView } from "framer-motion"
import dynamic from "next/dynamic"
import { ComponentType, Suspense, useRef } from "react"

const Hero = dynamic(() => import("@/components/hero/Hero"), { ssr: false })
const Services = dynamic(() => import("@/components/services/Services"), {
  ssr: false
})
const Contact = dynamic(() => import("@/components/contact/Contact"), {
  ssr: false
})

type SectionItem = {
  id: string
  component: ComponentType
}

const sections: SectionItem[] = [
  { id: "home", component: Hero },
  { id: "services", component: Services },
  { id: "contact", component: Contact }
]

export default function HomePage() {
  return (
    <main>
      {sections.map(({ id, component }) => (
        <LazySection key={id} id={id} Component={component} />
      ))}
    </main>
  )
}

type LazySectionProps = {
  id: string
  Component: ComponentType
}

function LazySection({ id, Component }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-200px" })

  return (
    <section ref={ref} id={id}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Suspense
          fallback={
            <div style={{ height: "100vh" }}>Загрузка секции {id}...</div>
          }
        >
          {isInView && <Component />}
        </Suspense>
      </div>
    </section>
  )
}
