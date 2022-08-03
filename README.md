# Docker Compose to Easypanel

This little CLI makes it possible to create an Easypanel Schema (that can be hosted on Easypanel) from a docker compose

## CLI Quickstart

```sh
npx compose-to-easypanel -i <docker-compose.yml> -o <output-file.json>
```

## Supported Docker Compose Properties

- `image`
- `container_name`
- `ports`
- `environment`
- `volumes`

**please note**  
the environment variables used in the compose file have to be hard coded and not loaded via an .env file

**Supported**

```yml
# ...
environment:
  SECRET: my-super-secret
```

**Not Supported**

```yml
# ...
environment:
  SECRET: ${SECRET}
```

## Database Services

if the image property equals `mysql`, `mongo`, `postgres` or `redis` the script will automatically create an database service instead of an app service for it

the password used to secure the password comes from the env variable `PASSWORD` if it does not exist a new one is generated

**Will Create a Postgres Service with Password 123456**

```yml
# ...
db:
  image: "postgres"
  environment:
    PASSWORD: "123456"
```

## Example
