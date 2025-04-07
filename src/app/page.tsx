"use client"

import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import dynamic from "next/dynamic"
import { ComponentType, ReactNode, Suspense } from "react"
import { useInView } from "react-intersection-observer"

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
  fallbackText: string
}

const sections: SectionItem[] = [
  { id: "home", component: Hero, fallbackText: "Загрузка главной..." },
  { id: "services", component: Services, fallbackText: "Загрузка услуг..." },
  { id: "contact", component: Contact, fallbackText: "Загрузка контактов..." }
]

export default function HomePage() {
  useSmoothScroll({
    selector: "main > section",
    duration: 1000,
    delay: 1500
  })

  return (
    <main>
      {sections.map(({ id, component: Component, fallbackText }) => (
        <LazySection key={id} id={id} fallback={fallbackText}>
          <Component />
        </LazySection>
      ))}
    </main>
  )
}

type LazySectionProps = {
  id: string
  fallback?: string
  children: ReactNode
}

function LazySection({ id, fallback, children }: LazySectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-200px"
  })

  return (
    <section ref={ref} id={id}>
      <Suspense fallback={<span className="loading">{fallback}</span>}>
        {inView ? children : <span className="loading">{fallback}</span>}
      </Suspense>
    </section>
  )
}
