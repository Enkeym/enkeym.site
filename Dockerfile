# --- Этап сборки приложения ---
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  COPY package.json yarn.lock ./
  RUN yarn install --frozen-lockfile
  
  COPY . .
  RUN yarn build
  
  # --- Этап продакшена: nginx + статика + brotli/gzip ---
  FROM nginx:1.25-alpine AS production
  
  LABEL author="enkeym.site"
  
  # Устанавливаем brotli CLI для генерации .br файлов
  RUN apk add --no-cache brotli
  
  # Удаляем дефолтные конфиги nginx
  RUN rm -rf /etc/nginx/conf.d/*
  COPY nginx.conf /etc/nginx/nginx.conf
  
  # Копируем сгенерированную статику Next.js
  COPY --from=builder /app/public /usr/share/nginx/html
  COPY --from=builder /app/.next/static /usr/share/nginx/html/_next/static
  
  # Генерация .br и .gz файлов заранее
  RUN find /usr/share/nginx/html -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.svg" \) | while read -r file; do \
      brotli -f -q 11 "$file"; \
      gzip -kf "$file"; \
  done
  
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  