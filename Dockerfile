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

# COPY --from=build /app/build /html

# # Expose port 80 for the Nginx server
# EXPOSE 80

# Start Nginx when the container runs
CMD ["npm", "run", "server"]