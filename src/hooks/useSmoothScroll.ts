import { useCallback, useEffect, useRef } from "react"

type ScrollOptions = {
  selector?: string
  delay?: number
  enabled?: boolean
}

export function useSmoothScroll({
  selector = "section",
  delay = 800,
  enabled = true
}: ScrollOptions = {}) {
  const sectionsRef = useRef<HTMLElement[]>([])
  const currentSectionIndex = useRef<number>(0)
  const isScrolling = useRef<boolean>(false)
  const touchStartY = useRef<number>(0)

  // Инициализация секций
  useEffect(() => {
    if (!enabled) return
    sectionsRef.current = Array.from(document.querySelectorAll(selector))
  }, [selector, enabled])

  const scrollTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= sectionsRef.current.length) return
      isScrolling.current = true
      currentSectionIndex.current = index
      sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        isScrolling.current = false
      }, delay)
    },
    [delay]
  )

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!enabled || isScrolling.current) return

      const direction = e.deltaY > 10 ? 1 : e.deltaY < -10 ? -1 : 0
      if (direction !== 0) {
        e.preventDefault()
        scrollTo(currentSectionIndex.current + direction)
      }
    },
    [enabled, scrollTo]
  )

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (!enabled || isScrolling.current || Math.abs(deltaY) < 30) return

      const direction = deltaY > 0 ? 1 : -1
      scrollTo(currentSectionIndex.current + direction)
    },
    [enabled, scrollTo]
  )

  useEffect(() => {
    if (!enabled) return

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [enabled, onWheel, onTouchStart, onTouchEnd])

  return {
    scrollToSection: (index: number) => scrollTo(index),
    getCurrentSectionIndex: () => currentSectionIndex.current
  }
}
