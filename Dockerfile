FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm i --include=dev

COPY . .

RUN npm run ts

CMD ["npm", "start"]