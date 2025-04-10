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

# Brotli-сжатие заранее
RUN find /usr/share/nginx/html -type f \( -iname "*.js" -o -iname "*.css" -o -iname "*.html" -o -iname "*.json" -o -iname "*.svg" \) \
  -exec brotli --force --quality=11 "{}" \; && \
  find /usr/share/nginx/html -type f -name "*.map" -delete && \
  find /usr/share/nginx/html -type f -name "*.DS_Store" -delete

# Конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Healthcheck
HEALTHCHECK CMD wget -q --spider http://localhost || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
