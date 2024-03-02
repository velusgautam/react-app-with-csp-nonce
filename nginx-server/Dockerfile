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
# Copy the built React app to Nginx's web server directory
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/njs /etc/nginx/njs
COPY --from=build /app/build /html

# # Expose port 80 for the Nginx server
# EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]