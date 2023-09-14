FROM node:latest

COPY ./secrets.env /source/secrets.env
COPY ./package.json /source/package.json
WORKDIR /source
RUN npm install

COPY ./source/ /source/

ENTRYPOINT ["node", "./main.js"]