import { getEasypanelServiceType } from "./helpers";
import {
  DockerService,
  DockerYml,
  EasypanelSchema,
  Service,
  supportedServiceTypes,
} from "./types";

/**
 *
 * @param dockerYml the parsed docker compose file
 * @param projectName project Name of the easypanel project
 * @returns a ready to use easypanel schema
 */
export function parseCompose(
  dockerYml: DockerYml,
  projectName: string
): EasypanelSchema | Error {
  2;
  // chek if the compose file is not using v 3
  if (dockerYml.version.split("")[0] !== "3")
    return new Error("docker-compose version 3.x is requiered");

  const dockerServices = dockerYml.services;

  const easypanelSchema: EasypanelSchema = {
    services: [],
  };

  //loop through all services
  Object.keys(dockerServices).forEach((serviceKey) => {
    const dockerService = dockerServices[serviceKey];

    const serviceName = dockerService.container_name || serviceKey;
    const serviceType = getEasypanelServiceType(dockerService);

    const newService: Service = parseService(
      projectName,
      serviceName,
      serviceType,
      dockerService
    );

    console.log(newService);
  });

  //@ts-ignore
  return "success";
}

function parseService(
  projectName: string,
  serviceName: string,
  serviceType: supportedServiceTypes,
  dockerService: DockerService
): Service {
  if (serviceType === "mongo") {
    if (
      !dockerService.environment ||
      !dockerService.environment.MONGO_INITDB_ROOT_PASSWORD
    )
      throw new Error("please specify a MONGO_INITDB_ROOT_PASSWORD env");
    const service: Service = {
      type: "mongo",
      data: {
        projectName,
        serviceName,
        password: dockerService.environment.MONGO_INITDB_ROOT_PASSWORD,
        image:
          dockerService.image !== "mongo" ? dockerService.image : undefined,
      },
    };
    return service;
  } else if (serviceType === "postgres") {
    if (
      !dockerService.environment ||
      !dockerService.environment.POSTGRES_PASSWORD
    )
      throw new Error("please specify a POSTGRES_PASSWORD env");
    const service: Service = {
      type: "postgres",
      data: {
        projectName,
        serviceName,
        password: dockerService.environment.POSTGRES_PASSWORD,
        image:
          dockerService.image !== "postgres" ? dockerService.image : undefined,
      },
    };
    return service;
  } else if (serviceType === "mysql") {
    if (
      !dockerService.environment ||
      !dockerService.environment.MYSQL_ROOT_PASSWORD ||
      !dockerService.environment.MYSQL_PASSWORD
    )
      throw new Error(
        "please specify a MYSQL_ROOT_PASSWORD and a MYSQL_PASSWORD env"
      );
    const service: Service = {
      type: "mysql",
      data: {
        projectName,
        serviceName,
        password: dockerService.environment.MYSQL_PASSWORD,
        rootPassword: dockerService.environment.MYSQL_ROOT_PASSWORD,
        image:
          dockerService.image !== "mysql" ? dockerService.image : undefined,
      },
    };
    return service;
  } else if (serviceType === "redis") {
    if (!dockerService.environment || !dockerService.environment.REDIS_PASSWORD)
      throw new Error("please specify a REDIS_PASSWORD env");
    const service: Service = {
      type: "redis",
      data: {
        projectName,
        serviceName,
        password: dockerService.environment.REDIS_PASSWORD,
        image:
          dockerService.image !== "redis" ? dockerService.image : undefined,
      },
    };
    return service;
  } else {
    const service: Service = {
      type: "app",
      data: {
        projectName,
        serviceName,
        source: {
          type: "image",
          image: dockerService.image || "",
        },
      },
    };

    return service;
  }
}
