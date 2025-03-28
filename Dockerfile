FROM node:23-alpine3.20 AS builder
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM joseluisq/static-web-server:2.36-alpine
WORKDIR /app
COPY --from=builder /app/dist .
EXPOSE 80
CMD ["static-web-server", "--page-fallback", "index.html", "-d", "."]