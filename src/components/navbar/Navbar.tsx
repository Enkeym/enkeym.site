"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import styles from "./navbar.module.css"

const navItems = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Обо мне" },
  { id: "contact", label: "Связаться" }
]

// Варианты анимации
const containerVariants = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
}

export default function Navbar() {
  const [activeId, setActiveId] = useState("home")

  return (
    <nav className={styles.navbar}>
      <motion.ul
        className={styles.navList}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {navItems.map(({ id, label }) => (
          <motion.li
            key={id}
            variants={itemVariants}
            style={{ position: "relative" }}
          >
            <Link
              href={`#${id}`}
              onClick={() => setActiveId(id)}
              className={styles.link}
            >
              <span
                className={`${styles.navText} ${
                  activeId === id ? styles.active : ""
                }`}
              >
                {label}
              </span>

              <AnimatePresence mode="wait">
                {activeId === id && (
                  <motion.div
                    className={styles.underline}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  )
}
