# Docker Compose to Easypanel

[compose-to-easypanel](https://npmjs.com/package/compose-to-easypanel)

This little CLI makes it possible to create an Easypanel Schema (that can be hosted on your Servers via Easypanel) from a docker-compose file.

Easypanel is a Server Controll Panel powered by Docker, that makes it easy to setup, create and scale services from any codebase. [easypanel.io](https://easypanel.io).

## Quickstart

### Via Npx

the cli can be easaly run via npx:

```sh
npx compose-to-easypanel <projectName> -i <docker-compose.yml> -o <output-file.json>
```

### Via Npm

```sh
npm install -g compose-to-easypanel
```

```sh
compose-to-easypanel <projectName> -i <docker-compose.yml> -o <output-file.json>
```

## Supported Docker Compose Properties

- `image`
- `container_name`
- `ports`
- `environment`
- `volumes`
- `command`

### Image

Docker Compose File

```yml
# ...
image: easypanel/easypanel
```

Generated Schema

```json
{
  //...
  "source": {
    "type": "image",
    "image": "easypanel/easypanel"
  }
}
```

### Container Name

The property `container_name` represents the `serviceName`, the default `serviceName` is the `key` of the `service` object in the docker-compose file

```yml
#...
service050:
  container_name: "my-super-container-name" # This is the serviceName
  image: easypanel/easypanel
  #...
```

```yml
#...
service050: # This is the serviceName
  image: easypanel/easypanel
  # ...
```

### Ports

docker-compose file:

```yml
# ...
ports:
  # outside:inside
  - 3000:3000
  - 8000:5000
```

Genrated Schema:

```json
{
  //...
  "ports": [
    {
      "published": 3000,
      "target": 3000
    },
    {
      "published": 8000,
      "target": 5000
    }
  ]
}
```

### Environment

docker-compose file:

```yml
# ...
environment:
  SECRET: my-super-secret
  ANOTHER_SECRET: ohooho-secret
```

Genrated Schema:

```json
{
  //...
  "env": "SECRET=my-super-secret\nANOTHER_SCRET=ohooho-secret"
}
```

**Its currently not supported to load your env varibles through an .env file**

```yml
# ...
environment:
  SECRET: ${SECRET} # that won't work !
```

### Volumes

docker-compose file:

```yml
# ...
volumes:
  # outside:inside
  - ./my/bind:/etc/my/bind
  - my-volume:/etc/my/volume
```

Genrated Schema:

```json
{
  //...
  "volumes": [
    {
      "type": "bind",
      "hostPath": "./my/bind",
      "mountPath": "/etc/my/bind"
    },
    {
      "type": "volume",
      "name": "my-volume",
      "mountPath": "/etc/my/volume"
    }
  ]
}
```

### Command

docker-compose file:

```yml
# ...
command: "yarn start"
```

Genrated Schema:

```json
{
  //...
  "deploy": {
    "command": "yarn start"
  }
}
```

## Database Services

Easypanel supports all popular databases out of the box:

- `postgres`
- `mysql`
- `mongo`
- `redis`

The Cli automatically creates an database service if the official image is used, however sometimes you need to provide an custom image, to do that you need to provide and env Variable in your `docker-compose` named `EASYPANEL_DATABASE` with the value of one database service (`postgres`, `mysql`, `mongo`,`redis`)

you also need to provide an Password env variable

- Mongo: `MONGO_INITDB_ROOT_PASSWORD: <password>`
- Postgres: `POSTGRES_PASSWORD: <password>`
- Redis: `REDIS_PASSWORD: <password>`
- MySql: `MYSQL_ROOT_PASSWORD: <root-pw>; MYSQL_PASSWORD: <password>`

docker-compose file

```yml
db:
  image: "postgres"
  environment:
    PASSWORD: "super-password"
```

genreated Schema

```json
{
  "type": "postgres",
  "data": {
    //...
    "password": "super-password"
  }
}
```

with custom image

```yml
db:
  image: "myuser/postgres"
  environment:
    EASYPANEL_DATABASE: postgres
    PASSWORD: "super-password"
```

genreated Schema

```json
{
  "type": "postgres",
  "data": {
    //...
    "image": "myuser/postgres",
    "password": "super-password"
  }
}
```

## Contribution

Contrubution is always welcome :-)

1. Fork the Repo
2. Create a Banch from `master`
3. Edit the Source Code
4. Submit a PR
