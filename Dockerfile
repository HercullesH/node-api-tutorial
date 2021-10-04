FROM node:14.16.1

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
RUN npm install -g sequelize-cli

ENV DB_HOST=nodesqlkeyrus.postgres.database.azure.com
ENV DB_USER=nodeadmin@nodesqlkeyrus
ENV DB_PASS=@Postgres
ENV DB_NAME=node_api

COPY . .

# ENV DOCKERIZE_VERSION v0.6.0
RUN apt-get update
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

# CMD dockerize -wait tcp://db:5432 -timeout 60m npm run dev
CMD npm run dev
