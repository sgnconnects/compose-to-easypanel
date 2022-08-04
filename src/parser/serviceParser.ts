import {
  AppService,
  MongoService,
  MySQLService,
  PostgresService,
  RedisService,
  SingleServiceSchema,
  TemplateSchema,
} from "./types";

export function parseMongoService(
  projectName: string,
  serviceName: string,
  password: string,
  image?: string
): SingleServiceSchema {
  return {
    type: "mongo",
    data: {
      projectName,
      serviceName,
      password,
      image,
    },
  };
}

export function parsePostgresService(
  projectName: string,
  serviceName: string,
  password: string,
  image?: string
): SingleServiceSchema {
  return {
    type: "postgres",
    data: {
      projectName,
      serviceName,
      password,
      image,
    },
  };
}

export function parseMySqlService(
  projectName: string,
  serviceName: string,
  password: string,
  rootPassword: string,
  image?: string
): SingleServiceSchema {
  return {
    type: "mysql",
    data: {
      projectName,
      serviceName,
      password,
      image,
      rootPassword,
    },
  };
}

export function parseRedisService(
  projectName: string,
  serviceName: string,
  password: string,
  image?: string
): SingleServiceSchema {
  return {
    type: "redis",
    data: {
      projectName,
      serviceName,
      password,
      image,
    },
  };
}

export function parseAppService(
  projectName: string,
  serviceName: string,
  image: string,
  ports?: string[],
  environment?: { [keys: string]: string },
  volumes?: string[]
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
      ports: ports?.map((port) => {
        return {
          published: parseInt(port.split(":")[0]),
          target: parseInt(port.split(":")[1]),
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
