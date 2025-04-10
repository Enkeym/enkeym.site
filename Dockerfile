# 1. Сборка проекта Next.js
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY . .
RUN yarn build

# 2. Финальный минимальный образ с Brotli-статикой
FROM nginx:1.25-alpine

RUN apk add --no-cache brotli && rm -rf /var/cache/apk/* /tmp/*

# Копируем статику
COPY --from=builder /app/out /usr/share/nginx/html

# Brotli-сжатие всех важных файлов (js, css, html, json, svg, шрифты, изображения)
RUN find /usr/share/nginx/html -type f \( \
  -iname "*.js" -o -iname "*.css" -o -iname "*.html" -o -iname "*.json" -o -iname "*.svg" \
  -o -iname "*.woff" -o -iname "*.woff2" -o -iname "*.ttf" -o -iname "*.eot" \
  -o -iname "*.webp" -o -iname "*.avif" -o -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \
  \) -exec brotli --force --quality=11 "{}" \; \
  && find /usr/share/nginx/html -type f \( -iname "*.map" -o -iname "*.DS_Store" -o -iname "*.txt" -o -iname "*.md" \) -delete

# Копируем кастомный конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Healthcheck
HEALTHCHECK CMD wget -q --spider http://localhost || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
