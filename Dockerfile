FROM node:12.14.1
WORKDIR /usr/src
COPY ./package*.json ./
COPY ./tsconfig*.json ./
RUN npm i