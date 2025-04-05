import { useEffect } from "react"

export const useSectionScroll = () => {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section")
    )
    if (sections.length === 0) return

    let current = 0
    let isThrottled = false

    const smoothScrollTo = (targetY: number, duration = 800) => {
      const startY = window.scrollY
      const distance = targetY - startY
      let startTime: number | null = null

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        const eased = easeInOutCubic(progress)
        window.scrollTo(0, startY + distance * eased)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    const scrollToSection = (index: number) => {
      const clamped = Math.max(0, Math.min(index, sections.length - 1))
      current = clamped
      const top = sections[clamped].offsetTop
      smoothScrollTo(top)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isThrottled) return
      isThrottled = true

      setTimeout(() => {
        isThrottled = false
      }, 900)

      if (e.deltaY > 0) {
        scrollToSection(current + 1)
      } else if (e.deltaY < 0) {
        scrollToSection(current - 1)
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
    }
  }, [])
}
