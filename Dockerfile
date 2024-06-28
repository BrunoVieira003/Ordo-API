FROM node:19-alpine as build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:19-alpine

EXPOSE 5002
COPY --from=build /app/package.json /app/package-lock.json /app/dist ./
RUN npm ci --production && npm clean cache --force

CMD ["node", "dist/index.js"]