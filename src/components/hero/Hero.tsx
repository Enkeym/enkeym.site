"use client"

import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import styles from "./hero.module.css"
import Shape from "./Shape"
import Speech from "./Speech"

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

const Hero = () => {
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
          variants={awardVariants}
          initial="initial"
          animate="animate"
          className={styles.awards}
        >
          <motion.h2 variants={awardVariants}>Лучший дизайнер</motion.h2>
          <motion.p variants={awardVariants}>
            Профессионально создаю UI-дизайн и 3D-интерфейсы.
          </motion.p>
          <motion.div variants={awardVariants} className={styles.awardList}>
            {["award1.png", "award2.png", "award3.png"].map((src, i) => (
              <motion.div key={i} variants={awardVariants}>
                <Image
                  src={`/${src}`}
                  alt={`Награда ${i + 1}`}
                  width={36}
                  height={36}
                />
              </motion.div>
            ))}
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
          className={styles.follow}
        >
          {["instagram", "facebook", "youtube"].map((platform) => (
            <Link
              key={platform}
              href="/"
              className={styles.followLink}
              aria-label={platform}
            >
              <Image
                src={`/${platform}.png`}
                alt={platform}
                width={20}
                height={20}
              />
            </Link>
          ))}
          <div className={styles.followTextContainer}>
            <div className={styles.followText}>СЛЕДИ ЗА МНОЙ</div>
          </div>
        </motion.div>

        <Speech />

        <motion.div
          variants={certificateVariants}
          initial="initial"
          animate="animate"
          className={styles.certificate}
        >
          <Image
            src="/certificate.png"
            alt="Сертификат"
            width={70}
            height={70}
          />
          СЕРТИФИЦИРОВАННЫЙ
          <br />
          СПЕЦИАЛИСТ
          <br />
          ПО UI-ДИЗАЙНУ
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

      {/* Фон и пена */}
      <div className={styles.bg}>
        <Canvas>
          <Suspense fallback={null}>
            <Shape />
          </Suspense>
        </Canvas>

        <div className={styles.foamOverlay}>
          <Image
            src="/foam.png"
            alt="Пена"
            fill
            priority
            className={styles.foamImage}
          />
        </div>

        <div className={styles.hImg}>
          <Image
            src="/man.png"
            alt="Главный персонаж"
            width={400}
            height={400}
            className={styles.heroImage}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
