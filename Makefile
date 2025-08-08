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


