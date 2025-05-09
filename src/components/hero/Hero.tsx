"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import styles from "./hero.module.css"

const Speech = dynamic(() => import("./Speech"), { ssr: false })
const Shape = dynamic(() => import("./Shape"), { ssr: false })

const awardVariants = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 }
  }
}

const certificateVariants = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 }
  }
}

const followVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 }
  }
}

const platforms = [
  {
    name: "telegram",
    href: "https://t.me/NikitaKorolev96"
  }
]

const InvalidateOnShape = () => {
  const { invalidate } = useThree()
  useEffect(() => {
    invalidate()
  }, [invalidate])
  return null
}

const Hero = () => {
  const [shapeVisible, setShapeVisible] = useState(false)
  const [speechVisible, setSpeechVisible] = useState(false)

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setShapeVisible(true))
      requestIdleCallback(() => setSpeechVisible(true))
    } else {
      setTimeout(() => {
        setShapeVisible(true)
        setSpeechVisible(true)
      }, 1500)
    }
  }, [])

  const { ref: awardsRef, inView: awardsInView } = useInView({
    triggerOnce: true
  })
  const { ref: certificateRef, inView: certificateInView } = useInView({
    triggerOnce: true
  })

  return (
    <div className={styles.hero}>
      {/* Левая секция */}
      <div className={`${styles.hSection} ${styles.left}`}>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.hTitle}
        >
          Привет всем,
          <br />
          <span>Меня зовут Никита!</span>
        </motion.h1>

        <motion.div
          ref={awardsRef}
          variants={awardVariants}
          initial="initial"
          animate={awardsInView ? "animate" : "initial"}
          className={styles.awards}
        >
          <motion.h2 variants={awardVariants}>Fullstack разработчик</motion.h2>
          <motion.p variants={awardVariants}>
            Создаю современные адаптивные веб‑приложения и умных ботов с
            акцентом на скорость, SEO‑оптимизацию и UX. Использую ИИ для
            генерации текстов, улучшения дизайна и повышения производительности.
          </motion.p>
          <motion.div variants={awardVariants} className={styles.awardList}>
            {["html", "css", "js", "ts", "react", "next", "gpt"].map(
              (src, i) => (
                <motion.div key={i} variants={awardVariants}>
                  <Image
                    src={`/${src}.svg`}
                    alt={`Награда ${i + 1}`}
                    width={38}
                    height={38}
                    className={styles.awardListImage}
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>

        <Link
          href="#services"
          className={styles.scroll}
          aria-label="Прокрутить к услугам"
        >
          <motion.div
            animate={{ y: [0, 5], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
                stroke="#12071f"
                strokeWidth="1"
              />
              <motion.path
                animate={{ y: [0, 5] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
                d="M12 5V8"
                stroke="#12071f"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </Link>
      </div>

      {/* Правая секция */}
      <div className={`${styles.hSection} ${styles.right}`}>
        <motion.div
          variants={followVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className={styles.follow}
        >
          {platforms.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={styles.followLink}
              aria-label={name}
            >
              <Image
                src={`/${name}.svg`}
                alt={name}
                width={20}
                height={20}
                className={styles.followImg}
              />
            </Link>
          ))}
          <div className={styles.followTextContainer}>
            <div className={styles.followText}>НАПИШИ МНЕ</div>
          </div>
        </motion.div>

        {speechVisible && <Speech />}

        <motion.div
          ref={certificateRef}
          variants={certificateVariants}
          initial="initial"
          animate={certificateInView ? "animate" : "initial"}
          className={styles.certificate}
        >
          <Image
            src="/certificate.svg"
            alt="Сертификат"
            width={70}
            height={70}
          />
          ПРОДУМАННЫЙ UX
          <br />
          ЧИСТЫЙ КОД
          <br />
          ДОСТУПНОСТЬ A11Y
        </motion.div>

        <Link
          href="/#contact"
          className={styles.contactLink}
          aria-label="Связаться со мной"
        >
          <motion.div
            className={styles.contactButton}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 200 200" width="150" height="150">
              <circle cx="100" cy="100" r="90" fill="pink" />
              <path
                id="innerCirclePath"
                fill="none"
                d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              />
              <text className={styles.circleText}>
                <textPath href="#innerCirclePath">Со мной •</textPath>
              </text>
              <text className={styles.circleText}>
                <textPath href="#innerCirclePath" startOffset="44%">
                  Связаться •
                </textPath>
              </text>
            </svg>
            <div className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                stroke="black"
                strokeWidth="2"
              >
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Canvas, Foam и Персонаж */}
      <div className={styles.bg}>
        <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "low-power" }}>
          <Suspense fallback={null}>
            {shapeVisible && (
              <>
                <InvalidateOnShape />
                <Shape />
              </>
            )}
          </Suspense>
        </Canvas>

        <div className={styles.foamOverlay}>
          <Image
            src="/foam.avif"
            alt="Пена"
            width={1200}
            height={800}
            loading="lazy"
            fetchPriority="low"
            sizes="100vw"
            className={styles.foamImage}
          />
        </div>

        <div className={styles.hImg}>
          <Image
            src="/man.avif"
            alt="Главный персонаж"
            width={400}
            height={600}
            loading="lazy"
            fetchPriority="low"
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
