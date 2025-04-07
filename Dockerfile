#
# 1) Сборка Next.js (статическая)
#
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем исходный код и билдим
COPY . .
RUN yarn build && yarn export
# После этого появится /app/out/ (статический экспорт)

#
# 2) Сборка Nginx с Brotli из исходников (промежуточный образ)
#
FROM alpine:3.17 AS build-nginx

# Установим все нужные dev-зависимости для сборки
# (добавляем сюда также `wget`)
RUN apk add --no-cache \
    build-base \
    zlib-dev \
    pcre-dev \
    openssl-dev \
    autoconf \
    automake \
    libtool \
    git \
    linux-headers \
    cmake \
    brotli-dev \
    wget

ENV NGINX_VERSION=1.25.1
ENV NGINX_BROTLI_COMMIT=master

WORKDIR /tmp

# 2.1) Скачиваем исходники Nginx
RUN wget http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz \
  && tar -zxvf nginx-${NGINX_VERSION}.tar.gz

# 2.2) Клонируем репозиторий ngx_brotli с сабмодулями
RUN git clone --depth=1 -b ${NGINX_BROTLI_COMMIT} https://github.com/google/ngx_brotli.git \
  && cd ngx_brotli && git submodule update --init --recursive

# 2.3) Собираем Nginx с Brotli-модулем и нужными флагами
WORKDIR /tmp/nginx-${NGINX_VERSION}
RUN ./configure \
    --prefix=/usr/local/nginx \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_gzip_static_module \
    --with-threads \
    --with-file-aio \
    --add-module=/tmp/ngx_brotli \
    --without-http_fastcgi_module \
    --without-http_scgi_module \
    --without-http_uwsgi_module \
    --without-mail_pop3_module \
    --without-mail_imap_module \
    --without-mail_smtp_module \
    --with-http_stub_status_module \
    --with-debug \
    && make -j$(nproc) \
    && make install

#
# 3) Финальный образ (production) - лёгкий Alpine + собранный Nginx + статика
#
FROM alpine:3.17 AS production

# Копируем собранный Nginx из предыдущего этапа
COPY --from=build-nginx /usr/local/nginx /usr/local/nginx

# Создадим удобные ссылки (чтобы nginx был доступен как команда)
RUN ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx

# Удалим пакеты для сборки, установим лишь нужные для runtime
RUN apk add --no-cache \
    openssl \
    pcre \
    zlib \
    brotli \
    && rm -rf /var/cache/apk/*

# Подчищаем tmp (если остался)
RUN rm -rf /tmp/*

# Зададим окружение NGINX
ENV NGINX_PATH=/usr/local/nginx
ENV PATH="$PATH:/usr/local/nginx/sbin"

# Удаляем дефолтные конфиги, если есть
RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/nginx.conf

# Копируем свой конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем статический экспорт Next.js
COPY --from=builder /app/out /usr/share/nginx/html

# Предварительно сжимаем .gz и .br
RUN find /usr/share/nginx/html -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.svg" \) \
  | while read -r file; do \
      gzip -kf "$file"; \
      brotli -f -q 11 "$file"; \
  done

# Открываем порты
EXPOSE 80
EXPOSE 443

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
