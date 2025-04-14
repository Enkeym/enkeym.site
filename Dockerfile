# 1. Сборка Next.js
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY . .
RUN yarn build

# 2. Сборка nginx с brotli
FROM alpine:3.19 AS nginx-brotli

# Устанавливаем необходимые пакеты (разделим build и runtime)
RUN apk add --no-cache \
    brotli pcre2 zlib openssl \
    && apk add --no-cache --virtual .build-deps \
    gcc g++ make cmake musl-dev curl git brotli-dev pcre2-dev zlib-dev openssl-dev

WORKDIR /usr/src

# Клонируем brotli-модуль
RUN git clone --depth=1 https://github.com/google/ngx_brotli.git \
    && cd ngx_brotli && git submodule update --init

# Скачиваем и собираем nginx
RUN curl -O http://nginx.org/download/nginx-1.25.3.tar.gz \
    && tar zxvf nginx-1.25.3.tar.gz \
    && cd nginx-1.25.3 \
    && ./configure \
      --prefix=/etc/nginx \
      --sbin-path=/usr/sbin/nginx \
      --conf-path=/etc/nginx/nginx.conf \
      --error-log-path=/var/log/nginx/error.log \
      --http-log-path=/var/log/nginx/access.log \
      --with-threads \
      --with-http_ssl_module \
      --with-http_v2_module \
      --with-http_gzip_static_module \
      --add-module=/usr/src/ngx_brotli \
    && make && make install

# Очищаем только dev-инструменты, но оставляем runtime
RUN apk del .build-deps && rm -rf /usr/src /var/cache/apk/*

# 3. Финальный stage (на базе Alpine, чтобы были runtime-библиотеки)
FROM alpine:3.19 AS final

# Устанавливаем только runtime библиотеки
RUN apk add --no-cache brotli pcre2 zlib openssl

COPY --from=nginx-brotli /etc/nginx /etc/nginx
COPY --from=nginx-brotli /usr/sbin/nginx /usr/sbin/nginx
COPY --from=nginx-brotli /var/log/nginx /var/log/nginx

# Статика
COPY --from=builder /app/out /usr/share/nginx/html/
COPY --from=builder /app/public/. /usr/share/nginx/html/

# Сжатие .br и .gz
RUN find /usr/share/nginx/html -type f \( \
    -iname "*.js" -o -iname "*.css" -o -iname "*.html" -o -iname "*.json" -o -iname "*.svg" \
    -o -iname "*.woff" -o -iname "*.woff2" -o -iname "*.ttf" -o -iname "*.eot" \
    -o -iname "*.webp" -o -iname "*.avif" -o -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \
  \) -exec sh -c 'gzip -kf "$1" && brotli -f -q 11 "$1"' _ {} \; \
  && find /usr/share/nginx/html -type f \( -iname "*.map" -o -iname "*.DS_Store" -o -iname "*.md" -o -iname "*.txt" \) -delete

# Конфиг
COPY nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK CMD wget -q --spider http://localhost || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
