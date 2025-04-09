# 1. Сборка Next.js (output: 'export')
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# 2. Сборка Nginx с Brotli
FROM alpine:3.17 AS build-nginx

RUN apk add --no-cache \
    build-base zlib-dev pcre-dev openssl-dev autoconf automake libtool \
    git linux-headers cmake brotli-dev wget

ENV NGINX_VERSION=1.25.1
ENV NGINX_BROTLI_COMMIT=master

WORKDIR /tmp

RUN wget http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz \
  && tar -zxvf nginx-${NGINX_VERSION}.tar.gz

RUN git clone --depth=1 -b ${NGINX_BROTLI_COMMIT} https://github.com/google/ngx_brotli.git \
  && cd ngx_brotli && git submodule update --init --recursive

WORKDIR /tmp/nginx-${NGINX_VERSION}

RUN ./configure \
    --prefix=/usr/local/nginx \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_gzip_static_module \
    --add-module=/tmp/ngx_brotli \
    --with-threads \
    --with-file-aio \
    --without-mail_pop3_module \
    --without-mail_imap_module \
    --without-mail_smtp_module \
    --without-http_scgi_module \
    --without-http_uwsgi_module \
    --without-http_fastcgi_module \
    --with-http_stub_status_module \
  && make -j$(nproc) && make install

# 3. Финальный production-образ
FROM alpine:3.17 AS production

COPY --from=build-nginx /usr/local/nginx /usr/local/nginx
RUN ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx

RUN apk add --no-cache openssl pcre zlib brotli \
  && rm -rf /var/cache/apk/* /tmp/*

ENV NGINX_PATH=/usr/local/nginx
ENV PATH="$PATH:/usr/local/nginx/sbin"

RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/nginx.conf
COPY nginx.conf /usr/local/nginx/conf/nginx.conf

COPY --from=builder /app/out /usr/share/nginx/html

# GZIP + Brotli
RUN find /usr/share/nginx/html -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.svg" \) \
  | while read -r file; do \
      gzip -kf "$file"; \
      brotli -f -q 11 "$file"; \
  done

RUN strip /usr/sbin/nginx || true

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost || exit 1

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
