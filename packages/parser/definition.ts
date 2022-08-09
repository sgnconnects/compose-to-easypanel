export const SUPPORTED_APP_TYPES = [
  "mongo",
  "postgres",
  "mariadb",
  "mysql",
  "redis",
  "app",
];

export const DATABASE_PASSWORD_ENV_NAMES = {
  mongo: "MONGO_INITDB_ROOT_PASSWORD",
  postgres: "POSTGRES_PASSWORD",
  mariadb: {
    root: "MARIADB_ROOT_PASSWORD",
    normal: "MARIADB_PASSWORD",
  },
  mysql: {
    root: "MYSQL_ROOT_PASSWORD",
    normal: "MYSQL_PASSWORD",
  },
  redis: "REDIS_PASSWORD",
};

export const SUPPORTED_COMPOSE_PROPS = [
  "container_name",
  "image",
  "command",
  "ports",
  "environment",
  "volumes",
];

export const ERROR_MESSAGES = {
  reqProps: `Please specify "version" as string and "services" as object`,
  notV3: "Please use Compose Version 3.x to use this generator",
  notAllObj: "Your services need to be type object",
};
