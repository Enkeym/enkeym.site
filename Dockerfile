# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

# Этап продакшн
FROM nginx:1.25-alpine

LABEL author="enkeym.site"

# Brotli + bash для генерации .br
RUN apk add --no-cache brotli bash

# Очистим дефолтные конфиги
RUN rm -rf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем статику из Next.js
COPY --from=builder /app/public /usr/share/nginx/html
COPY --from=builder /app/.next/static /usr/share/nginx/html/_next/static

# Генерация brotli и gzip
RUN find /usr/share/nginx/html -type f -exec brotli -f -q 11 {} \; \
  && find /usr/share/nginx/html -type f -exec gzip -kf {} \;

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
