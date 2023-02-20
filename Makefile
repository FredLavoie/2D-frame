# GENERAL COMMANDS
cldist:
	rm -rf ./dist


# DOCKER COMMANDS
up:
	docker-compose up

build:
	docker-compose build

up-build:
	docker-compose up -d --build


# DATABASE COMMANDS
schema-push:
	npx prisma db push

migrate:
	npx prisma migrate dev