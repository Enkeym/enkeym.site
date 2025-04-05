"use client"

import emailjs from "@emailjs/browser"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Turnstile from "react-turnstile"
import ContactSvg from "./ContactSvg"
import styles from "./contact.module.css"

const listVariant = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 }
  }
}

const Contact = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const form = useRef<HTMLFormElement | null>(null)
  const isInView = useInView(ref, { margin: "-200px" })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [lastSent, setLastSent] = useState<number>(0)

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current) return

    const now = Date.now()

    const botField = (
      form.current.elements.namedItem("bot_field") as HTMLInputElement
    )?.value
    if (botField) return

    if (now - startTime < 2000) return
    if (now - lastSent < 30000) {
      alert("Подождите немного перед повторной отправкой.")
      return
    }

    const message = (
      form.current.elements.namedItem("user_message") as HTMLTextAreaElement
    )?.value
    if (message.length > 1000) {
      alert("Сообщение слишком длинное.")
      return
    }
    if (/https?:\/\//i.test(message)) {
      alert("Ссылки запрещены в сообщении.")
      return
    }

    if (!token) {
      alert("Проверка Turnstile не пройдена.")
      return
    }

    setLoading(true)
    setLastSent(now)

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!
        }
      )

      setSuccess(true)
      setError(false)
      form.current.reset()
      setToken(null)
    } catch (err) {
      console.error("Ошибка при отправке:", err)
      setError(true)
      setSuccess(false)
    }

    setLoading(false)
  }

  return (
    <div className={styles.contact} ref={ref}>
      <div className={styles.cSection}>
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
          className={styles.foam}
        >
          <input
            type="text"
            name="bot_field"
            autoComplete="off"
            className={styles.hidden}
            tabIndex={-1}
          />

          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            onSuccess={(token) => setToken(token)}
            onExpire={() => setToken(null)}
            theme="light"
          />

          <motion.h1 variants={listVariant} className={styles.cTitle}>
            Связаться со мной
          </motion.h1>

          <motion.div variants={listVariant} className={styles.formItem}>
            <label htmlFor="user_name" className={styles.label}>
              Имя
            </label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Иван Иванов"
              className={styles.input}
            />
          </motion.div>

          <motion.div variants={listVariant} className={styles.formItem}>
            <label htmlFor="user_email" className={styles.label}>
              Электронная почта
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              placeholder="ivan@example.com"
              className={styles.input}
            />
          </motion.div>

          <motion.div variants={listVariant} className={styles.formItem}>
            <label htmlFor="user_message" className={styles.label}>
              Сообщение
            </label>
            <textarea
              rows={10}
              name="user_message"
              id="user_message"
              placeholder="Напишите сообщение..."
              className={styles.textarea}
              maxLength={1000}
            />
          </motion.div>

          <motion.button
            type="submit"
            variants={listVariant}
            className={styles.formButton}
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить"}
          </motion.button>

          {success && <span>Ваше сообщение успешно отправлено!</span>}
          {error && <span>Произошла ошибка при отправке.</span>}
        </motion.form>
      </div>

      <div className={styles.cSection}>
        <ContactSvg />
      </div>
    </div>
  )
}

export default Contact
