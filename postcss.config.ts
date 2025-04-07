import purgecss from "@fullhuman/postcss-purgecss"
import autoprefixer from "autoprefixer"

const isProduction = process.env.NODE_ENV === "production"

const postcssConfig = {
  plugins: [
    autoprefixer(),

    // Только в production
    isProduction &&
      purgecss({
        rejected: true,
        content: [
          "./app/**/*.{js,ts,jsx,tsx}",
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
          "./src/**/*.{js,ts,jsx,tsx}"
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
            /^motion-/,
            /^react-/
          ]
        },
        defaultExtractor: (content: string) =>
          content.match(/[\w-/:]+(?<!:)/g) || []
      })
  ].filter(Boolean)
}

export default postcssConfig
