# Docker Compose to Easypanel

[compose-to-easypanel](https://npmjs.com/package/compose-to-easypanel)

Easypanel is a Beautiful , easy to use Server controll panel based on Docker [easypanel.io](https://easypanel.io).

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

## Example

Creating an Mysql application with adminer as dashboard

### Write The Compose

`./docker-compose.yml`

```yml
version: "3"
services:
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080

  db:
    image: mysql:5.6
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: examplePassword
      MYSQL_PASSWORD: examplePasswordNonRoot
```

### Run the CLI

```sh
npx <mysql-adminer> -i ./docker-compose.yml -o ./mysql-adminer-schema.json
```

### Copy the Schema

after running this command you should be able to view json schema under `./mysql-adminer-schema.json`

Generated Schema:

```json
{
  "services": [
    {
      "type": "app",
      "data": {
        "projectName": "test",
        "serviceName": "adminer",
        "source": { "type": "image", "image": "adminer" },
        "deploy": {},
        "ports": [{ "published": 8080, "target": 8080 }]
      }
    },
    {
      "type": "mysql",
      "data": {
        "projectName": "test",
        "serviceName": "db",
        "image": "mysql:5.6",
        "rootPassword": "examplePassword",
        "password": "examplePasswordNonRoot"
      }
    }
  ]
}
```

### Create The Services

after you did copy the schema you can go to your easypanel Dashboard go to `your-project`, select `templates` and scroll all the way down to **developer** an then click `Create from Schema`

## Supported Docker Compose Properties

- `image`
- `container_name`
- `ports`
- `environment`
- `volumes`

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

## Database Services

Easypanel supports all popular databases out of the box:

- `postgres`
- `mysql`
- `mongo`
- `redis`

The Cli automatically creates an database service if the official image is used, however sometimes you need to provide an custom image, to do that you need to provide and env Variable in your `docker-compose` named `EASYPANEL_DATABASE` with the value of one database service (`postgres`, `mysql`, `mongo`,`redis`)

you also need to provide an Password env variable if not a random password gets generated

- Mongo: `MONGO_INITDB_ROOT_PASSWORD: <password>`
- Postgres: `POSTGRES_PASSWORD: <password>`
- Redis: `REDIS_PASSWORD: <password>`
- MySql: `MYSQL_ROOT_PASSWORD: <root-pw>; MYSQL_PASSWORD: <password>`

docker-compose file

```yml
db:
  image: "postgres"
  environment:
    POSTGRES_PASSWORD: "super-password"
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
