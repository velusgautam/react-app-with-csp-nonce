# Application Setup

## Run using Docker

The below command will start running the application in port 8080. You can run below command and then go to browser `http://localhost:8080/` to see the application running

```shell
docker build -t react-nginx-app . && docker run -it --rm -p 8080:80 react-nginx-app
```
