# ========= ПАРАМЕТРЫ =========
NAME        := enkeym
IMAGE       := enkeym           # имя итогового образа nginx (ты его собираешь ниже)
PORT        := 8080             # внешний порт для http (режим без SSL)
DOMAIN      := enkeym.site
DOMAIN_WWW  := www.enkeym.site
LE_DIR      := /etc/letsencrypt
LE_LIVE_DIR := $(LE_DIR)/live/$(DOMAIN)
CERTBOT_IMG := certbot/certbot
CERTBOT_EMAIL := you@example.com   # <<<<< ПОМЕНЯЙ

# ========= УТИЛИТЫ =========
DOCKER := sudo docker

# ========= ХЕЛПЕРЫ =========
.PHONY: help
help:
	@echo "make build         - собрать образ"
	@echo "make run           - запустить HTTP (без SSL) на $(PORT)"
	@echo "make ssl-run       - запустить HTTPS c монтированием LE"
	@echo "make stop/start/restart/rm/logs/ps/debug - управление"
	@echo "make cert-issue    - ВЫПУСТИТЬ новые сертификаты (standalone, порт 80)"
	@echo "make cert-renew    - ПРОДЛИТЬ сертификаты (standalone, порт 80)"
	@echo "make cert-show     - показать даты и предмет сертификата"
	@echo "make cron-install  - прописать автопродление в cron"
	@echo "make clean         - удалить контейнер/образ и .next"

# ========= СБОРКА =========
.PHONY: clean
clean:
	-$(DOCKER) stop $(NAME) || true
	-$(DOCKER) rm $(NAME) || true
	-$(DOCKER) rmi $(IMAGE) || true
	sudo rm -rf .next

.PHONY: build
build:
	sudo docker system prune -af --volumes
	# если у тебя два Dockerfile, оставь один нужный; ниже два билда как было
	sudo docker build -t enkeym-app .
	sudo docker build -t $(IMAGE) .

# ========= ЗАПУСК =========
.PHONY: run
run:
	$(DOCKER) run -d \
		--restart unless-stopped \
		-p $(PORT):80 \
		--env-file .env \
		--name $(NAME) \
		$(IMAGE)

.PHONY: ssl-run
ssl-run:
	-$(DOCKER) stop $(NAME) || true
	-$(DOCKER) rm $(NAME) || true
	# ВАЖНО: монтируем live-директорию LE (внутри — symlink-ы на archive)
	$(DOCKER) run -d \
		--restart unless-stopped \
		-p 80:80 \
		-p 443:443 \
		-v $(LE_LIVE_DIR):/etc/nginx/ssl:ro \
		--env-file .env \
		--name $(NAME) \
		$(IMAGE)

.PHONY: restart
restart:
	$(DOCKER) restart $(NAME)

.PHONY: stop
stop:
	$(DOCKER) stop $(NAME)

.PHONY: start
start:
	$(DOCKER) start $(NAME)

.PHONY: rm
rm:
	$(DOCKER) rm $(NAME)

.PHONY: logs
logs:
	$(DOCKER) logs -f $(NAME)

.PHONY: ps
ps:
	$(DOCKER) ps -a

# ========= SSL / CERTBOT =========
# Перед выдачей/продлением: контейнер с nginx должен быть остановлен, порт 80 свободен.
.PHONY: cert-issue
cert-issue:
	-$(DOCKER) stop $(NAME) || true
	$(DOCKER) run --rm -it -p 80:80 \
	  -v $(LE_DIR):/etc/letsencrypt \
	  $(CERTBOT_IMG) certonly --standalone \
	  -d $(DOMAIN) -d $(DOMAIN_WWW) \
	  --agree-tos -m $(CERTBOT_EMAIL) --non-interactive
	@echo "OK. Теперь запусти: make ssl-run"

.PHONY: cert-renew
cert-renew:
	-$(DOCKER) stop $(NAME) || true
	$(DOCKER) run --rm -it -p 80:80 \
	  -v $(LE_DIR):/etc/letsencrypt \
	  $(CERTBOT_IMG) renew --standalone
	@echo "Renew завершён. Перезапускаю nginx (если есть)…"
	-$(DOCKER) start $(NAME) || true
	-$(DOCKER) exec $(NAME) nginx -s reload || true

.PHONY: cert-show
cert-show:
	@if [ -f "$(LE_LIVE_DIR)/fullchain.pem" ]; then \
	  openssl x509 -in $(LE_LIVE_DIR)/fullchain.pem -noout -dates -issuer -subject ; \
	else \
	  echo "Сертификат не найден: $(LE_LIVE_DIR)/fullchain.pem"; \
	fi

.PHONY: cron-install
cron-install:
	@echo "Создаю /etc/cron.d/certbot-docker…"
	@sudo bash -c 'cat > /etc/cron.d/certbot-docker <<CRON
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# Каждый день в 03:00 пытаемся renew, потом мягкий reload nginx
0 3 * * * root $(DOCKER) run --rm -p 80:80 -v $(LE_DIR):/etc/letsencrypt $(CERTBOT_IMG) renew --standalone && $(DOCKER) exec $(NAME) nginx -s reload
CRON'
	@sudo chmod 644 /etc/cron.d/certbot-docker
	@sudo systemctl restart cron || sudo service cron restart
	@echo "Готово."

# ========= ОТЛАДКА =========
.PHONY: debug
debug:
	@echo "\n🔍 Контейнер:"
	$(DOCKER) ps -a | grep $(NAME) || echo "❌ Контейнер не найден"

	@echo "\n🔍 Порты внутри контейнера:"
	-$(DOCKER) exec -it $(NAME) sh -c 'command -v netstat >/dev/null && netstat -tulpn | grep -E ":80|:443" || ss -tulpn | grep -E ":80|:443"' || echo "❌ Нет netstat/ss или контейнер не запущен"

	@echo "\n📂 /usr/share/nginx/html:"
	-$(DOCKER) exec -it $(NAME) ls -lah /usr/share/nginx/html | head -n 20

	@echo "\n📄 Сертификаты внутри контейнера:"
	-$(DOCKER) exec -it $(NAME) ls -lah /etc/nginx/ssl || echo "❌ Сертификаты не смонтированы"

	@echo "\n🧪 TLS cнаружи (s_client):"
	-echo | openssl s_client -connect $(DOMAIN):443 -servername $(DOMAIN) 2>/dev/null | openssl x509 -noout -dates -subject -issuer || echo "❌ s_client не сработал"

	@echo "\n📜 Последние 50 логов:"
	-$(DOCKER) logs --tail=50 $(NAME) || echo "❌ Нет логов"
