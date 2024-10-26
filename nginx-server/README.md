# React + Nginx Server

### To verify CSP working you need to run it a server - client setup

## Example Nginx Setup with Docker

Running Nginx server locally is easy with the docker. If you have docker installed, run the below docker command.

```shell
docker build -t react-nginx-app . && docker run -it --rm -e NGINX_PORT=3001 -p 3001:3001 react-nginx-app
```

The docker command will start running the application in port 3001. Then go to browser `http://localhost:3001/` to see the application running

Inspect and see in the Network tab the nonce is being changed in each request.

### Verify CSP Header

![](../images/image-1.png)

### Verify Nonce in script and style

![](../images/image-2.png)

<span style="font-size:10px;">

```
NGINX_PORT here is port where nginx starts inside docker. -p 8080:{3000} should be changed accordingly if you change NGINX_PORT=3000
```

</span>

## Application Setup

Run below commands to setup the application

```shell
npm install
```

```shell
npm run build
```

To see the build application in `http://localhost:8080/`

```
npx serve -s build -l 8080
```

### Nginx configs

In Nginx we utilise the [njs](https://github.com/velusgautam/react-app-with-csp-nonce/blob/main/nginx-server/nginx/njs/main.mjs) scripting to generate the random nonce string.

[Nginx Config file](https://github.com/velusgautam/react-app-with-csp-nonce/blob/main/nginx-server/nginx/nginx.conf)
