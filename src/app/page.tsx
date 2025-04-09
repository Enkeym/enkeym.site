"use client"

import dynamic from "next/dynamic"
import Head from "next/head"
import React, { Suspense, useCallback, useRef } from "react"
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
  component: React.ComponentType
}

const sections: SectionItem[] = [
  { id: "home", component: Hero },
  { id: "services", component: Services },
  { id: "contact", component: Contact }
]

export default function HomePage() {
  return (
    <>
      <Head>
        <link rel="preload" href="/man.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/foam.avif" as="image" fetchPriority="high" />
      </Head>

      <main>
        {sections.map(({ id, component }) => (
          <LazySection key={id} id={id} Component={component} />
        ))}
      </main>
    </>
  )
}

function SectionFallback({ id }: { id: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      Загрузка секции {id}...
    </div>
  )
}

type LazySectionProps = {
  id: string
  Component: React.ComponentType
}

function LazySection({ id, Component }: LazySectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-200px"
  })

  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      ref.current = node
      inViewRef(node)
    },
    [inViewRef]
  )

  return (
    <section ref={setRefs} id={id}>
      <Suspense fallback={<SectionFallback id={id} />}>
        {inView && <Component />}
      </Suspense>
    </section>
  )
}
