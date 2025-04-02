'use client'

import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import styles from './hero.module.css'
import Shape from './Shape'
import Speech from './Speech'

const awardVariants = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 }
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
      {/* Left */}
      <div className={`${styles.hSection} ${styles.left}`}>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.hTitle}
        >
          Hey There,
          <br />
          <span>I&apos;m Robert!</span>
        </motion.h1>

        <motion.div
          variants={awardVariants}
          initial="initial"
          animate="animate"
          className={styles.awards}
        >
          <motion.h2 variants={awardVariants}>Top Rated Designer</motion.h2>
          <motion.p variants={awardVariants}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </motion.p>
          <motion.div variants={awardVariants} className={styles.awardList}>
            {['award1.png', 'award2.png', 'award3.png'].map((src, i) => (
              <motion.div key={i} variants={awardVariants}>
                <Image
                  src={`/${src}`}
                  alt={`Award ${i + 1}`}
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
          aria-label="Scroll to services"
        >
          <motion.div
            animate={{ y: [0, 5], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
                stroke="white"
                strokeWidth="1"
              />
              <motion.path
                animate={{ y: [0, 5] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut'
                }}
                d="M12 5V8"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </Link>
      </div>

      {/* Right */}
      <div className={`${styles.hSection} ${styles.right}`}>
        <motion.div
          variants={followVariants}
          initial="initial"
          animate="animate"
          className={styles.follow}
        >
          {['instagram', 'facebook', 'youtube'].map((platform) => (
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
            <div className={styles.followText}>FOLLOW ME</div>
          </div>
        </motion.div>

        <Speech />

        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 1 }}
          className={styles.certificate}
        >
          <Image
            src="/certificate.png"
            alt="Certificate"
            width={70}
            height={70}
          />
          LMA CERTIFIED
          <br />
          PROFESSIONAL
          <br />
          UI DESIGNER
        </motion.div>

        <Link
          href="/#contact"
          className={styles.contactLink}
          aria-label="Contact me"
        >
          <motion.div
            className={styles.contactButton}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 200 200" width="150" height="150">
              <circle cx="100" cy="100" r="90" fill="pink" />
              <path
                id="innerCirclePath"
                fill="none"
                d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              />
              <text className={styles.circleText}>
                <textPath href="#innerCirclePath">Hire Now •</textPath>
              </text>
              <text className={styles.circleText}>
                <textPath href="#innerCirclePath" startOffset="44%">
                  Contact Me •
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

      {/* Background */}
      <div className={styles.bg}>
        <Canvas>
          <Suspense fallback={null}>
            <Shape />
          </Suspense>
        </Canvas>
        <div className={styles.hImg}>
          <Image
            src="/hero.png"
            alt="Hero Character"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
