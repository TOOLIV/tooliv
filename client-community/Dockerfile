from node:lts-alpine as builder

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .
RUN npm run react-build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
