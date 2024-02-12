FROM node:18-alpine

USER root
## user permission diferent of root can block some resouces and commands in docker execution

WORKDIR /home/prodescriber_api/app

COPY package*.json .

RUN npm install

EXPOSE 3002

##CMD [ "sh", "-c", "npm install" ]