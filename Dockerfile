#
# 1) Сборка Next.js (статическая)
#
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем проект (создаст папку /app/out при output: 'export')
RUN yarn build

#
# 2) Сборка Nginx с Brotli (промежуточный образ)
#
FROM alpine:3.17 AS build-nginx

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

# Исходники Nginx
RUN wget http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz \
  && tar -zxvf nginx-${NGINX_VERSION}.tar.gz

# Brotli-модуль
RUN git clone --depth=1 -b ${NGINX_BROTLI_COMMIT} https://github.com/google/ngx_brotli.git \
  && cd ngx_brotli && git submodule update --init --recursive

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

# Копируем собранный Nginx
COPY --from=build-nginx /usr/local/nginx /usr/local/nginx

# Создаём удобный симлинк
RUN ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx

# Ставим только нужные runtime-зависимости
RUN apk add --no-cache \
    openssl \
    pcre \
    zlib \
    brotli \
    && rm -rf /var/cache/apk/*

# Чистим tmp
RUN rm -rf /tmp/*

ENV NGINX_PATH=/usr/local/nginx
ENV PATH="$PATH:/usr/local/nginx/sbin"

# Удаляем дефолтные конфиги nginx
RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/nginx.conf

# Копируем свой конфиг Nginx
COPY nginx.conf /usr/local/nginx/conf/nginx.conf

# Копируем статический экспорт Next.js (из builder)
COPY --from=builder /app/out /usr/share/nginx/html

# Предварительно сжимаем файлы в .gz и .br
RUN find /usr/share/nginx/html -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.svg" \) \
  | while read -r file; do \
      gzip -kf "$file"; \
      brotli -f -q 11 "$file"; \
  done

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
