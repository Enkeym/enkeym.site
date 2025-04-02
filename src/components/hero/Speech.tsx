"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"
import styles from "./hero.module.css"

const Speech = () => {
  return (
    <motion.div
      className={styles.bubbleContainer}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.bubble}>
        <TypeAnimation
          sequence={[
            1000,
            "Привет! Я дизайнер интерфейсов и fullstack-разработчик.",
            2000,
            "Создаю адаптивные 3D-интерфейсы на React + Canvas.",
            2000
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          repeat={Infinity}
        />
      </div>
      <Image
        src="/man.png"
        alt="Avatar"
        width={50}
        height={50}
        className={styles.bubbleAvatar}
      />
    </motion.div>
  )
}

export default Speech
