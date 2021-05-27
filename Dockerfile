FROM node:latest

WORKDIR /app

RUN npm install

COPY . /app/

#do not need CMD because app already provides default arguments

ENTRYPOINT [ "node", "app.js" ]