# Docker Compose to Easypanel

This little CLI makes it possible to create an Easypanel Schema (that can be hosted on Easypanel) from a docker-compose file.

Easypanel is a Beautiful , easy to use Server controll panel based on Docker [easypanel.io](https://easypanel.io).

## Quickstart

the packages is hosted on npmjs see here: [compose-to-easypanel](https://npmjs.com/package/compose-to-easypanel)

```sh
npx compose-to-easypanel -i <docker-compose.yml> -o <output-file.json>
```

## Supported Docker Compose Properties

- `image`
- `container_name`
- `ports`
- `environment`
- `volumes`

### Environment

the environment variables used in the compose file have to be hard coded and not loaded via an .env file.

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

if the image property equals `mysql`, `mongo`, `postgres` or `redis` the script will automatically create an database service instead of an app service for it.

the password used to secure the password comes from the env variable `PASSWORD` if it does not exist a new one is generated.

**E.G. Create a Postgres Service with Password 123456:**

```yml
# ...
db:
  image: "postgres"
  environment:
    PASSWORD: "123456"
```

## Contribution

Contrubution is always welcome :-)

1. Fork the Repo
2. Create a Banch from `master`
3. Edit the Source Code
4. Submit a PR
