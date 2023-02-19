cldist:
	rm -rf ./dist

up:
	docker-compose up

build:
	docker-compose build

up-build:
	docker-compose up -d --build