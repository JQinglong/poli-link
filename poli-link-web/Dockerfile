FROM node:14.16.0-alpine
ENV LANG=C.UTF-8 TZ=Asia/Tokyo
WORKDIR /app
RUN apk update
COPY ./package*.json ./
RUN npm install
COPY ./ .
ENV HOST 0.0.0.0
EXPOSE 3000