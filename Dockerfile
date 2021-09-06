FROM node:14.16.1

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
RUN npm install -g sequelize-cli

COPY . .

ENV DOCKERIZE_VERSION v0.6.0
RUN apt-get update
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD dockerize -wait tcp://db:5432 -timeout 60m npm run dev
