FROM node:21.5-alpine

ENV TZ=Asia/Kuala_Lumpur

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]