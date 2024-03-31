FROM node:lts-alpine as build

WORKDIR /app/

COPY public /app/public
COPY src /app/src
COPY config /app
COPY scripts /app/scripts
COPY config /app/config
COPY package*.json /app

RUN npm install
RUN npm run build


FROM nginx:alpine
RUN apk add --no-cache netcat-openbsd

# Copy the built React app to Nginx's web server directory
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/njs /etc/nginx/njs
COPY nginx/start.sh /usr/local/bin/start.sh
COPY --from=build /app/build /html

RUN chmod +x /usr/local/bin/start.sh


# Start Nginx when the container runs
CMD ["/usr/local/bin/start.sh"]
