import { motion, useInView } from "framer-motion"
import React, { useRef, useState } from "react"
import "./services.css"
import styles from "./services.module.css"

const Services: React.FC = () => {
  const [currentServiceId, setCurrentServiceId] = useState<number>(1)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-200px" })

  return (
    <div className={styles.services} ref={ref}>
      {/* LEFT */}
      <div className={`${styles.sSection} ${styles.left}`}>
        <motion.h1
          variants={textVariants}
          animate={isInView ? "animate" : "initial"}
          className={styles.sTitle}
        >
          Чем я могу помочь?
        </motion.h1>
      </div>
    </div>
  )
}

export default Services
