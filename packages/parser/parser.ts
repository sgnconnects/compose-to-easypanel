import { randomPassword } from "./schema";
import {
  AppService,
  MongoService,
  MySQLService,
  PostgresService,
  RedisService,
  SingleServiceSchema,
  TemplateSchema,
} from "./types";
import { DockerComposeService, envVariable } from "./ymlParser";

export function parseMongoService(
  projectName: string,
  serviceName: string,
  environment?: DockerComposeService["environment"],
  image?: string
): SingleServiceSchema {
  return {
    type: "mongo",
    data: {
      projectName,
      serviceName,
      password:
        envVariable(environment, "MONGO_INITDB_ROOT_PASSWORD") ||
        randomPassword(),
      image: image !== "mongo" ? image : undefined,
    },
  };
}

export function parsePostgresService(
  projectName: string,
  serviceName: string,
  environment?: DockerComposeService["environment"],
  image?: string
): SingleServiceSchema {
  return {
    type: "postgres",
    data: {
      projectName,
      serviceName,
      password:
        envVariable(environment, "POSTGRES_PASSWORD") || randomPassword(),
      image: image !== "postgres" ? image : undefined,
    },
  };
}

export function parseMySqlService(
  projectName: string,
  serviceName: string,
  environment?: DockerComposeService["environment"],
  image?: string
): SingleServiceSchema {
  return {
    type: "mysql",
    data: {
      projectName,
      serviceName,
      password: envVariable(environment, "MYSQL_PASSWORD") || randomPassword(),
      image: image !== "mysql" ? image : undefined,
      rootPassword:
        envVariable(environment, "MYSQL_ROOT_PASSWORD") || randomPassword(),
    },
  };
}

export function parseRedisService(
  projectName: string,
  serviceName: string,
  environment?: DockerComposeService["environment"],
  image?: string
): SingleServiceSchema {
  return {
    type: "redis",
    data: {
      projectName,
      serviceName,
      password: envVariable(environment, "REDIS_PASSWORD") || randomPassword(),
      image: image !== "redis" ? image : undefined,
    },
  };
}

export function parseAppService(
  projectName: string,
  serviceName: string,
  image: string,
  ports?: (string | number)[],
  environment?: { [keys: string]: string },
  volumes?: string[],
  command?: string | string[]
): SingleServiceSchema {
  return {
    type: "app",
    data: {
      projectName,
      serviceName,
      source: {
        type: "image",
        image,
      },
      deploy: {
        command: Array.isArray(command) ? command.join(" ") : command,
      },
      ports: ports?.map((port) => {
        return {
          published:
            typeof port === "number" ? port : parseInt(port.split(":")[0]),
          target:
            typeof port === "number" ? port : parseInt(port.split(":")[1]),
        };
      }),
      env: environment
        ? Object.keys(environment)
            .map((key) => `${key}=${environment[key]}`)
            .join("\n")
        : undefined,
      mounts: volumes?.map((volume) => {
        const hostPathOrName = volume.split(":")[0];
        const mountPath = volume.split(":")[1];

        if (
          hostPathOrName.split("")[0] === "/" ||
          hostPathOrName.split("")[0] === "."
        ) {
          return {
            type: "bind",
            hostPath: hostPathOrName,
            mountPath,
          };
        }

        return {
          type: "volume",
          name: hostPathOrName,
          mountPath,
        };
      }),
    },
  };
}
