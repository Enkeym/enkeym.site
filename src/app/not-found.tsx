"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import styles from "./not-found.module.css"

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404 – Страница не найдена
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Упс! Похоже, такой страницы не существует.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="/" className={styles.backHomeLink}>
          Вернуться на главную
        </Link>
      </motion.div>
    </section>
  )
}
