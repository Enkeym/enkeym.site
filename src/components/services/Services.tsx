"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { useInView } from "react-intersection-observer"
import ModelCanvasSwitcher from "./ModelCanvasSwitcher"
import styles from "./services.module.css"

const textVariants = {
  initial: { x: -100, y: -100, opacity: 0 },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 1 }
  }
}

const listVariants = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.5 }
  }
}

type Service = {
  id: number
  img: string
  title: string
  desc: string
}

const services: Service[] = [
  {
    id: 1,
    img: "/service1.svg",
    title: "Веб приложения",
    desc: "Лендинги, Корпоративные сайты, Веб-приложения, Интернет-магазины, Формы, Интеграции с API"
  },
  {
    id: 2,
    img: "/service2.svg",
    title: "Умные боты",
    desc: "Сервисные, E-commerce, Боты с AI, Боты-ассистенты, Интерактивные, Нотификационные, Боты для воронок продаж"
  },
  {
    id: 3,
    img: "/service3.svg",
    title: "Дизайн интерфейсов",
    desc: "Web UI (лендинги, SPA, e-commerce), Дизайн админок и дашбордов, Адаптивный и интерактивный дизайн"
  }
]

const Services = () => {
  const [currentServiceId, setCurrentServiceId] = useState<number>(1)

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-200px"
  })

  return (
    <div className={styles.services} ref={ref}>
      <div className={`${styles.sSection} ${styles.left}`}>
        <motion.h1
          variants={textVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className={styles.sTitle}
        >
          Что разрабатываю?
        </motion.h1>

        <motion.div
          variants={listVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className={styles.serviceList}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={listVariants}
              className={`${styles.service} ${
                currentServiceId === service.id ? styles.active : ""
              }`}
              onClick={() => setCurrentServiceId(service.id)}
            >
              <div
                className={`${styles.serviceIcon} ${
                  styles[`icon${service.id}`]
                }`}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  width={48}
                  height={30}
                  loading="lazy"
                />
              </div>
              <div className={styles.serviceInfo}>
                <h2>{service.title}</h2>
                <h3>{service.desc}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className={`${styles.sSection} ${styles.right}`}>
        <ModelCanvasSwitcher id={currentServiceId} />
      </div>
    </div>
  )
}

export default Services
