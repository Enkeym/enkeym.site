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
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // === 1. Захват секций ===
  const updateSections = useCallback(() => {
    sectionsRef.current = Array.from(document.querySelectorAll(selector))
  }, [selector])

  useEffect(() => {
    if (!enabled) return

    updateSections()

    const observer = new MutationObserver(updateSections)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [enabled, updateSections])

  // === 2. Отмена анимации ===
  const cancelScrollAnimation = useCallback(() => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
    }
    if (scrollTimeout.current !== null) {
      clearTimeout(scrollTimeout.current)
      scrollTimeout.current = null
    }
  }, [])

  // === 3. Анимация скролла ===
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

  // === 4. Прокрутка к нужной секции ===
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

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, delay)
    },
    [enabled, smoothScrollTo, delay, duration]
  )

  // === 5. Прокрутка по hash после загрузки ===
  useEffect(() => {
    if (!enabled) return

    const hash = window.location.hash?.replace("#", "")
    if (!hash) return

    const tryScrollToHash = () => {
      const index = sectionsRef.current.findIndex((el) => el.id === hash)
      if (index !== -1) {
        scrollTo(index)
        return true
      }
      return false
    }

    // Повторная проверка, если секции загружаются динамически
    let attempts = 0
    const interval = setInterval(() => {
      const success = tryScrollToHash()
      if (success || attempts >= 20) {
        clearInterval(interval)
      }
      attempts++
    }, 200)

    return () => clearInterval(interval)
  }, [enabled, scrollTo])

  // === 6. Scroll и touch события ===
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

  // === 7. Подписка ===
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

  // === 8. API ===
  return {
    scrollToSection: (index: number) => scrollTo(index),
    getCurrentSectionIndex: () => currentSectionIndex.current
  }
}
