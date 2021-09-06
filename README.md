# node-api


## Connection to postgres database on your machine

user: `postgres`
password: `postgres`
port: `5000`

## Connection to node api
port: `3000`
base url: `http://localhost:3000/api/users`

## Run on development environment

`docker-compose build`
`docker-compose up`

## Config database

Connect to the postgres from your machine and run `CREATE DATABASE node_api`

To create database tables enter in the node-api container and run:
`cd src/app/database/ && npx sequelize-cli db:migrate`
