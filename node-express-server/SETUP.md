# Application Setup

Run below commands to setup the application

```shell
npm install
```

```shell
npm run build
```

```shell
npm run server
```

## Local Development

```shell
npm install
```

```shell
npm run start
```

## Docker

The below command will start running the application in port 8080. You can run below command and then go to browser `http://localhost:8080/` to see the application running

```shell
docker build -t react-node-app . && docker run -it --rm -p 8080:80 react-node-app
```
