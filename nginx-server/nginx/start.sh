#!/bin/sh

PORT=${NGINX_PORT:-80}

# Dynamically update the Nginx configuration to listen on the desired port
sed -i "s/listen\s*80;/listen $PORT;/" /etc/nginx/nginx.conf

# Start nginx in the background
nginx -g 'daemon off;' &

# Wait for nginx to start up
while ! nc -z localhost $PORT; do   
  sleep 0.1 # wait for 1/10 of the second before check again
done

echo -e "\n Nginx server has successfully started on port: \033[32mhttp://localhost:$PORT\033[0m"

# Keep the script running to keep the container alive
wait
