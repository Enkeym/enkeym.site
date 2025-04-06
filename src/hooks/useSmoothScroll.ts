import { useCallback, useEffect, useRef } from "react"

type ScrollOptions = {
  selector?: string
  delay?: number
  duration?: number
  enabled?: boolean
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function useSmoothScroll({
  selector = "section",
  delay = 1100,
  duration = 800,
  enabled = true
}: ScrollOptions = {}) {
  const sectionsRef = useRef<HTMLElement[]>([])
  const currentSectionIndex = useRef<number>(0)
  const isScrolling = useRef<boolean>(false)
  const touchStartY = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return
    sectionsRef.current = Array.from(document.querySelectorAll(selector))
  }, [selector, enabled])

  // 3. Отмена текущей анимации
  const cancelScrollAnimation = useCallback(() => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
    }
  }, [])

  const smoothScrollTo = useCallback(
    (targetY: number, duration: number) => {
      const startY = window.scrollY || window.pageYOffset
      const distance = targetY - startY
      let startTime: number | null = null

      cancelScrollAnimation()

      const step = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutQuad(progress)

        window.scrollTo(0, startY + distance * ease)

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(step)
        } else {
          animationFrameId.current = null
        }
      }

      animationFrameId.current = requestAnimationFrame(step)
    },
    [cancelScrollAnimation]
  )

  const scrollTo = useCallback(
    (index: number) => {
      if (
        !enabled ||
        isScrolling.current ||
        index < 0 ||
        index >= sectionsRef.current.length
      )
        return

      const target = sectionsRef.current[index]
      const targetY = target.getBoundingClientRect().top + window.scrollY

      isScrolling.current = true
      currentSectionIndex.current = index

      smoothScrollTo(targetY, duration)

      const release = setTimeout(() => {
        isScrolling.current = false
      }, delay)

      return () => clearTimeout(release)
    },
    [enabled, smoothScrollTo, delay, duration]
  )

  useEffect(() => {
    if (!enabled) return

    const idFromHash = window.location.hash?.replace("#", "")
    if (!idFromHash) return

    const index = sectionsRef.current.findIndex((el) => el.id === idFromHash)

    if (index !== -1) {
      setTimeout(() => scrollTo(index), 500)
    }
  }, [enabled, scrollTo])

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
      cancelScrollAnimation()
    }
  }, [enabled, onWheel, onTouchStart, onTouchEnd, cancelScrollAnimation])

  return {
    scrollToSection: (index: number) => scrollTo(index),
    getCurrentSectionIndex: () => currentSectionIndex.current
  }
}
