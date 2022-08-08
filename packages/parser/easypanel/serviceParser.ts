import { randomPassword } from "../schema";
import {
  AppService,
  MongoService,
  MySQLService,
  PostgresService,
  RedisService,
  SingleServiceSchema,
  TemplateSchema,
} from "../types";
import { DockerComposeService } from "../compose/parseYml";
import { getEnvVariable } from "../compose/helper";
import { getImage, getPassword } from "./helper";

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
      password: getPassword(environment, "mongo"),
      image: getImage(image, "mongo"),
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
      password: getPassword(environment, "postgres"),
      image: getImage(image, "postgres"),
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
      password: getPassword(environment, "mysql", "normal"),
      image: getImage(image, "mysql"),
      rootPassword: getPassword(environment, "mysql", "root"),
    },
  };
}

export function parseMariaDbService(
  projectName: string,
  serviceName: string,
  environment?: DockerComposeService["environment"],
  image?: string
): SingleServiceSchema {
  return {
    type: "mariadb",
    data: {
      projectName,
      serviceName,
      password: getPassword(environment, "mariadb", "normal"),
      image: getImage(image, "mariadb"),
      rootPassword: getPassword(environment, "mariadb", "root"),
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
      password: getPassword(environment, "redis"),
      image: getImage(image, "redis"),
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
