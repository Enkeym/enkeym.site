"use client"

import Hero from "@/components/hero/Hero"
import dynamic from "next/dynamic"
import React, { Suspense, useCallback, useRef } from "react"
import { useInView } from "react-intersection-observer"

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

const lazySections: SectionItem[] = [
  { id: "services", component: Services },
  { id: "contact", component: Contact }
]

export default function HomePage() {
  return (
    <>
      <section id="home" style={{ minHeight: "100vh", position: "relative" }}>
        <Hero />
      </section>
      <main>
        {lazySections.map(({ id, component }) => (
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
    <section
      id={id}
      ref={setRefs}
      style={{
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <Suspense fallback={<SectionFallback id={id} />}>
        <DelayedRender inView={inView}>
          <Component />
        </DelayedRender>
      </Suspense>
    </section>
  )
}

function DelayedRender({
  inView,
  children
}: {
  inView: boolean
  children: React.ReactNode
}) {
  return inView ? <>{children}</> : null
}
