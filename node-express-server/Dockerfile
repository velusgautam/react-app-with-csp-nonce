FROM node:lts-alpine as build

WORKDIR /app/

COPY public /app/public
COPY src /app/src
COPY config /app
COPY scripts /app/scripts
COPY config /app/config
COPY package*.json /app
COPY server.js /app

RUN npm install
RUN npm run build

# Expose port 80 for the Node Express server
EXPOSE 8080

# Start node express server when the container runs
CMD ["npm", "run", "server"]