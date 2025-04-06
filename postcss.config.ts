import purgecss from "@fullhuman/postcss-purgecss"
import autoprefixer from "autoprefixer"

const isProduction = process.env.NODE_ENV === "production"

const postcssConfig = {
  plugins: [
    autoprefixer(),
    isProduction &&
      purgecss({
        content: [
          "./src/**/*.{js,ts,jsx,tsx}",
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./app/**/*.{js,ts,jsx,tsx}"
        ],
        safelist: {
          standard: [/^swiper/, /^active/, /^show/, /^fade/, /^slide/]
        },
        defaultExtractor: (content: string): string[] =>
          content.match(/[\w-/.:]+(?<!:)/g) || []
      })
  ]
}

export default postcssConfig
