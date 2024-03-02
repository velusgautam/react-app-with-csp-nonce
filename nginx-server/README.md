# Application Setup

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

## Nginx Setup with Docker

Running Nginx server locally is easy with the docker. If you have docker installed, run the below docker command.

```shell
docker build -t react-nginx-app . && docker run -it --rm -p 8080:80 react-nginx-app
```

The docker command will start running the application in port 8080. Then go to browser `http://localhost:8080/` to see the application running

Inspect and see in the Network tab
