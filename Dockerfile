FROM node:19-alpine

RUN npm prune --production

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 5002

CMD npm start