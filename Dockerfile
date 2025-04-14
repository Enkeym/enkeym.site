# 1. Сборка проекта Next.js
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY . .
RUN yarn build

# 2. Финальный минимальный образ с GZIP + Brotli
FROM nginx:1.25-alpine

RUN apk add --no-cache brotli gzip && rm -rf /var/cache/apk/* /tmp/*

# Копируем экспортированную сборку (из /out)
COPY --from=builder /app/out /usr/share/nginx/html/

# 💡 Дополнительно копируем всё из public (включая html-файлы в корне и скрытые директории)
COPY --from=builder /app/public/. /usr/share/nginx/html/

# Сжатие: GZIP + Brotli (всех важных форматов)
RUN find /usr/share/nginx/html -type f \( \
    -iname "*.js" -o -iname "*.css" -o -iname "*.html" -o -iname "*.json" -o -iname "*.svg" \
    -o -iname "*.woff" -o -iname "*.woff2" -o -iname "*.ttf" -o -iname "*.eot" \
    -o -iname "*.webp" -o -iname "*.avif" -o -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \
  \) -exec sh -c 'gzip -kf "$1" && brotli -f -q 11 "$1"' _ {} \; \
  && find /usr/share/nginx/html -type f \( -iname "*.map" -o -iname "*.DS_Store" -o -iname "*.md" -o -iname "*.txt" \) -delete

COPY nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK CMD wget -q --spider http://localhost || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
