# MALO SERVER

The server required for [malo](https://addons.mozilla.org/en-US/firefox/addon/malo/).

sadas

## Setup

### From source

- Clone this repository

```sh
 git clone https://github.com/mohamedarish/malo_server
```

- cd into the directory

```sh
 cd malo_server
```

- Setup the .env file (On Linux/MacOS)

```sh
 cp .example.env .env
```

- Setup the .env file (On windows)

```pwsh
 copy .example.env .env
```

- Edit the content of the .env file to match your config info

- install all dependencies using [node](https://nodejs.org/en) [package manager](https://www.npmjs.com/)

```sh
 npm i --include=dev
```

- Transpile the typescript to javascript

```sh
 npm run ts
```

#### Start the server

- Run the server without docker

```sh
npm start
```

- (Alternate) create your own docker image

```sh
docker build -t malo_server .
```

- (Alternate) run the docker image

```sh
docker run --name malo_server -d -p 3030:3030 malo_server:latest
```

- Visit `localhost:3030`(By default) and if you see `The server is running!` The server is working properly

### Build from docker image

### For arm architecture

- Pull the image

```sh
 docker pull mohamedarish/malo_server:arm
```

- run the image

```sh
 docker run --env-file ./.env --name malo_server -d -p 3030:3030 malo_server:arm
```

#### For amd64 architecture

-Pull the image

```sh
 docker pull mohamedarish/malo_server:amd64
```

- Run the image

```sh
 docker run --env-file ./.env --name malo_server -d -p 3030:3030 malo_server:amd64
```

## Dev Log

The extension shall recieve an update which shall allow the use of a custom server
