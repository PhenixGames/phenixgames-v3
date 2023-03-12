FROM node:18.8

WORKDIR /vue

RUN ls -la

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve"]
