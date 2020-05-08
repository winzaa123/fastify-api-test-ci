
# Deploy

- npm i -g typescript ts-node
- tsc -p app/tsconfig.json
- docker-compose up -d --build **or** docker-compose up -d --build backend_app nginx  **or** docker-compose exec backend_app pm2 reload myApp
- docker-compose exec  nginx nginx -s reload

# Setup Database

- `yarn db:droptable` # !!for clear database

- `yarn db:sync` # for create database
- `yarn db:init` # for init data
