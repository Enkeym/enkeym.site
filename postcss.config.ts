import purgecss from "@fullhuman/postcss-purgecss"
import autoprefixer from "autoprefixer"

const isProduction = process.env.NODE_ENV === "production"

const postcssConfig = {
  plugins: [
    autoprefixer(),

    isProduction &&
      purgecss({
        content: [
          "./app/**/*.{js,ts,jsx,tsx}",
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
          "./src/**/*.{js,ts,jsx,tsx}",
          "./public/index.html"
        ],
        safelist: {
          standard: [
            /^swiper/,
            /^active/,
            /^show/,
            /^fade/,
            /^slide/,
            /^slick/,
            /^bg-/,
            /^text-/,
            /^motion-/,
            /^react-/,
            /^Toastify/,
            /^arrow/
          ],
          deep: [/^::/, /^data-/]
        },
        defaultExtractor: (content: string) =>
          content.match(/[\w-/:.]+(?<!:)/g) || [],
        rejected: true
      })
  ].filter(Boolean)
}

export default postcssConfig
