"use client"

import { useSmoothScroll } from "@/hooks/useSmoothScroll"
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
  useSmoothScroll({
    selector: "main > section",
    duration: 1000,
    delay: 1500
  })

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
      {isInView ? (
        <Suspense fallback={<div>Загрузка секции {id}...</div>}>
          <Component />
        </Suspense>
      ) : (
        <div style={{ height: 500 }}>Загрузка секции {id}...</div>
      )}
    </section>
  )
}
