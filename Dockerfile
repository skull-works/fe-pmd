FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]