"use client"

import { Canvas } from "@react-three/fiber"
// Предположим, что настроен modularizeImports для framer-motion,
// иначе можно оставить import { motion, useInView } from "framer-motion"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { useInView } from "react-intersection-observer"
import styles from "./hero.module.css"

// Динамический импорт Shape
const Shape = dynamic(() => import("./Shape"), {
  ssr: false,
  loading: () => null
})

// Динамический импорт Speech (чтобы бандл Hero был меньше)
const DynamicSpeech = dynamic(() => import("./Speech"), {
  ssr: false,
  loading: () => null
})

// Анимационные варианты
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

// Соц. платформы
const platforms = [
  {
    name: "telegram",
    href: "https://t.me/NikitaKorolev96"
  }
]

// Хэндлер прокрутки по якорю
const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  const target = document.getElementById(e.currentTarget.hash.replace("#", ""))
  if (target) {
    target.scrollIntoView({ behavior: "smooth" })
  }
}

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-200px"
  })

  return (
    <div className={styles.hero} ref={ref}>
      <div className={styles.bg}>
        {/* Пена */}
        <div className={styles.foamOverlay}>
          <Image
            src="/foam.avif"
            alt="Пена"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={60}
            className={styles.foamImage}
          />
        </div>

        {/* Главный персонаж */}
        <div className={styles.hImg}>
          <Image
            src="/man.avif"
            alt="Главный персонаж"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.heroImage}
          />
        </div>

        {/* Canvas отложенно — рендерим, только если в зоне видимости */}
        {inView && (
          <Canvas
            // Если есть постоянная анимация, оставь frameloop="always"
            // но если нужен рендер "на требование", можно frameloop="demand"
            frameloop="always"
            dpr={[1, 1.5]}
            shadows={false}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <Suspense fallback={null}>
              <Shape />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Левая секция */}
      <div className={`${styles.hSection} ${styles.left}`}>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className={styles.hTitle}
        >
          Привет всем,
          <br />
          <span>Меня зовут Никита!</span>
        </motion.h1>

        <motion.div
          variants={awardVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
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
                <motion.div key={src} variants={awardVariants}>
                  <Image
                    src={`/${src}.svg`}
                    alt={`Награда ${i + 1}`}
                    width={38}
                    height={38}
                    className={styles.awardListImage}
                    loading="lazy"
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
          onClick={handleScrollToContact}
        >
          <motion.div
            animate={{ y: [0, 5], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <svg width="100" height="100" viewBox="0 0 24 24">
              <path
                d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
                stroke="#12071f"
                strokeWidth="1"
                fill="none"
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
                fill="none"
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
          animate={inView ? "animate" : "initial"}
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
                loading="lazy"
              />
            </Link>
          ))}
          <div className={styles.followTextContainer}>
            <div className={styles.followText}>НАПИШИ МНЕ</div>
          </div>
        </motion.div>

        {/* Вместо <Speech /> напрямую, используем динамический импорт */}
        <DynamicSpeech />

        <motion.div
          variants={certificateVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className={styles.certificate}
        >
          <Image
            src="/certificate.svg"
            alt="Сертификат"
            width={70}
            height={70}
            loading="lazy"
          />
          ПРОДУМАННЫЙ UX
          <br />
          ЧИСТЫЙ КОД
          <br />
          ДОСТУПНОСТЬ A11Y
        </motion.div>

        <a
          href="#contact"
          className={styles.contactLink}
          aria-label="Связаться со мной"
          onClick={handleScrollToContact}
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
        </a>
      </div>
    </div>
  )
}

export default Hero
