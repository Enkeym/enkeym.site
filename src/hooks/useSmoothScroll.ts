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

  // === [1] Инициализация секций ===
  useEffect(() => {
    if (!enabled) return

    const updateSections = () => {
      sectionsRef.current = Array.from(document.querySelectorAll(selector))
    }

    updateSections()

    const observer = new MutationObserver(updateSections)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [selector, enabled])

  // === [2] Установка текущей секции после перезагрузки ===
  useEffect(() => {
    if (!enabled) return

    const setCurrentVisibleSection = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const index = sectionsRef.current.findIndex((section) => {
        const top = section.offsetTop
        const bottom = top + section.offsetHeight
        return scrollY >= top && scrollY < bottom
      })

      if (index !== -1) {
        currentSectionIndex.current = index
      }
    }

    // Ждём появления всех секций
    const timeout = setTimeout(setCurrentVisibleSection, 300)
    return () => clearTimeout(timeout)
  }, [enabled])

  // === [3] Отмена текущей анимации ===
  const cancelScrollAnimation = useCallback(() => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
    }
  }, [])

  // === [4] Анимация прокрутки ===
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

  // === [5] Прокрутка к секции по индексу ===
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

  // === [6] Прокрутка по hash (например: /#services) ===
  useEffect(() => {
    if (!enabled) return

    const hash = window.location.hash?.replace("#", "")
    if (!hash) return

    const scrollAfterDelay = setTimeout(() => {
      const index = sectionsRef.current.findIndex((el) => el.id === hash)
      if (index !== -1) scrollTo(index)
    }, 800)

    return () => clearTimeout(scrollAfterDelay)
  }, [enabled, scrollTo])

  // === [7] События скролла — wheel
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

  // === [8] Touch для мобильных ===
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

  // === [9] Подписка на события ===
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

  // === [10] Публичный API ===
  return {
    scrollToSection: (index: number) => scrollTo(index),
    getCurrentSectionIndex: () => currentSectionIndex.current
  }
}
