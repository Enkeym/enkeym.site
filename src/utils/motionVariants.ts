// src/utils/motionVariants.ts
export const slideUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8 } }
}

export const slideLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.8 } }
}

export const staggerContainer = (delay = 0.2) => ({
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
})
