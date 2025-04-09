// components/ui/SectionLoader.tsx
"use client"

import styles from "./sectionLoader.module.css"

export default function SectionLoader() {
  return (
    <div className={styles.sectionLoader}>
      <div className={styles.dots}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      <p className={styles.text}>Загрузка секции...</p>
    </div>
  )
}
