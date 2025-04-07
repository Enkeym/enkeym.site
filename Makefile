# Название контейнера и образа
NAME=enkeym
PORT=3000

# Удалить контейнер и образ
clean:
	sudo docker stop $(NAME) || true
	sudo docker rm $(NAME) || true
	sudo docker rmi $(NAME) || true
	sudo rm -rf .next

# Собрать образ
build:
	sudo docker build -t $(NAME) .

# Запустить контейнер
run:
	sudo docker run -d \
		--restart unless-stopped \
		-p $(PORT):80 \
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
