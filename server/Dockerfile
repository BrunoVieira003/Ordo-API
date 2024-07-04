FROM node:19-alpine as build

COPY . .
WORKDIR /app
RUN npm ci
RUN npm run build

FROM node:19-alpine

EXPOSE 3000

WORKDIR /app
COPY --from=build package*.json .
COPY --from=build ./dist ./dist
RUN npm ci --omit=dev && npm cache clean --force

ENV DB_HOST=db
ENV DB_DATABASE=postgres
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres

CMD ["node", "dist/index.js"]