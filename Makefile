# Название контейнера и образа
NAME=enkeym
PORT=8080

# Удалить контейнер и образ
clean:
	sudo docker stop $(NAME) || true
	sudo docker rm $(NAME) || true
	sudo docker rmi $(NAME) || true
	sudo rm -rf .next

# Собрать образ
build:
	sudo docker system prune -af --volumes
	sudo docker build -t enkeym-app .
	sudo docker build -t $(NAME) .

# Запустить контейнер без SSL (порт 80 → 3000)
run:
	sudo docker run -d \
		--restart unless-stopped \
		-p $(PORT):80 \
		--env-file .env \
		--name $(NAME) \
		$(NAME)

# 🔐 Запустить контейнер с монтированием SSL
ssl-run:
	-sudo docker stop $(NAME) || true
	-sudo docker rm $(NAME) || true
	sudo docker run -d \
		--restart unless-stopped \
		-p 80:80 \
		-p 443:443 \
		-v /etc/letsencrypt:/etc/letsencrypt:ro \
		--env-file .env \
		--name $(NAME) \
		$(NAME)


# Перезапуск
restart:
	sudo docker restart $(NAME)

# Остановить контейнер
stop:
	sudo docker stop $(NAME)

# Старт контейнера
start:
	sudo docker start $(NAME)

# Удалить контейнер
rm:
	sudo docker rm $(NAME)

# Просмотр логов
logs:
	sudo docker logs -f $(NAME)

# Показать все контейнеры
ps:
	sudo docker ps -a

# 🛠️ Отладка контейнера enkeym
debug:
	@echo "\n🔍 Проверка состояния контейнера..."
	sudo docker ps -a | grep enkeym || echo "❌ Контейнер не найден"

	@echo "\n🔍 Проверка, что nginx слушает порты:"
	sudo docker exec -it enkeym netstat -tulpn | grep -E ':80|:443' || echo "❌ nginx не слушает 80/443"

	@echo "\n📂 Список файлов в /usr/share/nginx/html:"
	sudo docker exec -it enkeym ls -lah /usr/share/nginx/html | head -n 20

	@echo "\n📄 Проверка наличия сертификатов:"
	sudo docker exec -it enkeym ls -lah /etc/nginx/ssl || echo "❌ Сертификаты не найдены"

	@echo "\n⚙️  Активные процессы в контейнере:"
	sudo docker exec -it enkeym ps aux | grep nginx

	@echo "\n🧪 curl localhost изнутри контейнера:"
	sudo docker exec -it enkeym curl -vk https://localhost --resolve enkeym.site:443:127.0.0.1 --insecure || echo "❌ nginx не отвечает"

	@echo "\n📜 Последние 50 логов контейнера:"
	sudo docker logs --tail=50 enkeym || echo "❌ Нет логов"

DOMAIN ?= enkeym.site

cert-show:
	@openssl x509 -in /etc/letsencrypt/live/$(DOMAIN)/fullchain.pem -noout -dates -subject -issuer

# Разово выпустить (если нужно)
cert-issue:
	- sudo docker stop $(NAME) || true
	sudo certbot certonly --standalone -d $(DOMAIN) -d www.$(DOMAIN) --agree-tos -m you@example.com --non-interactive
	- sudo docker start $(NAME) || true

# Продлить сертификаты (standalone: на время стопнёт контейнер, займёт :80)
cert-renew:
	- sudo docker stop $(NAME) || true
	sudo certbot renew --standalone --quiet
	- sudo docker start $(NAME) || true
	- sudo docker exec $(NAME) nginx -s reload || true

# Мягкая перезагрузка nginx в контейнере
reload:
	- sudo docker exec $(NAME) nginx -t
	- sudo docker exec $(NAME) nginx -s reload || true

# Установить крон для автопродления раз в день в 03:00 (короткий даунтайм на время renew)
cron-install:
	@sudo bash -c 'cat > /etc/cron.d/certbot-docker <<CRON
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
0 3 * * * root docker stop $(NAME) >/dev/null 2>&1; certbot renew --standalone --quiet; docker start $(NAME) >/dev/null 2>&1; docker exec $(NAME) nginx -s reload >/dev/null 2>&1 || true
CRON'
	@sudo chmod 644 /etc/cron.d/certbot-docker
	@sudo systemctl restart cron || sudo service cron restart
	@echo "Крон установлен."