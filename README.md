![Build Status](https://travis-ci.org/winzaa123/fastify-api-test-ci.svg?branch=master)

# Fastify API TypeORM with Typescript

- `/docs` API Document

## Development & Pre-Production in local

- use `docker-compose-dev.yml` for infrastructure in local or test deploy in local
- `npm i -g typescript ts-node` for prepare build
- `tsc -p app/tsconfig.json` for build
- `docker-compose up -d --build` **or** `docker-compose up -d --build backend_app nginx`  **or** `docker-compose exec backend_app pm2 reload myApp`
- `docker-compose exec  nginx nginx -s reload`

## Setup Database

- `yarn db:droptable` # !!for clear database
- `yarn db:sync` # for create database
- `yarn db:init` # for init data

## Test Deploy On Travis CI

- use `docker-compose-test.yml` and `.travis-deploy.yml` for test deploy on container
