FROM node:lastest

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 5002

CMD npm start