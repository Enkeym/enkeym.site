"use client"

import Navbar from "@/components/navbar/Navbar"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const Hero = dynamic(() => import("@/components/hero/Hero"), { ssr: false })
const Services = dynamic(() => import("@/components/services/Services"), {
  ssr: false
})
const Contact = dynamic(() => import("@/components/contact/Contact"), {
  ssr: false
})

const sections = [
  { id: "home", component: Hero },
  { id: "services", component: Services },
  { id: "contact", component: Contact }
]

export default function HomePage() {
  return (
    <main>
      <Navbar />
      {sections.map(({ id, component: Component }) => (
        <section key={id} id={id}>
          <Suspense fallback={<div>Загрузка секции {id}...</div>}>
            <Component />
          </Suspense>
        </section>
      ))}
    </main>
  )
}
