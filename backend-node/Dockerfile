FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY backend-node ./

EXPOSE 8080

CMD ["npm","run","start"]