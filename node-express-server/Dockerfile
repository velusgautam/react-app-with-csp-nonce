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

COPY server.js /app

# Start node express server when the container runs
CMD ["npm", "run", "server"]