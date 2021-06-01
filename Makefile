DC=docker-compose
CN=page

all:start

init:
	@echo "INIT PROJECT"
	@echo "Copying .env.dist in .env"
	@cp .env.dist .env
	@echo ".env: \n"
	@cat .env
	@echo "\n"

start:
	@echo "Launch dettached projet and build\n"
	$(DC) up -d --build

clean:
	$(DC) down

logs:
	$(DC) -f docker-compose.yml logs -f page

re: clean start

exec:
	$(DC) exec $(CN)