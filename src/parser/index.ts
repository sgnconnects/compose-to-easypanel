import { DockerYml } from "../types";
import { randomPassword, supportedServiceTypes } from "./schema";
import { parseAppService } from "./serviceParser";
import { Template, TemplateSchema } from "./types";
import {
  getEasypanelServiceType,
  hasEnvVariable,
  isVersion3,
} from "./ymlInformationParser";

export function parseDockerToEasypanel(
  file: DockerYml,
  projectName: string
): Template {
  if (!isVersion3(file.version))
    throw new Error("please use docker-compose version 3.x");

  const serviceKeys = Object.keys(file.services);

  const easypanelServices: TemplateSchema["services"] = serviceKeys.map(
    (serviceKey) => {
      const { container_name, environment, image, ports, volumes } =
        file.services[serviceKey];
      const serviceName = container_name || serviceKey;
      const serviceType = getEasypanelServiceType({ environment, image });
      console.log(serviceType);

      if (serviceType === "mongo") {
        return {
          type: "mongo",
          data: {
            projectName,
            serviceName,
            image: image !== serviceType ? image : undefined,
            password:
              (environment && environment.MONGO_INITDB_ROOT_PASSWORD) ||
              randomPassword(),
          },
        };
      } else if (serviceType === "postgres") {
        return {
          type: "postgres",
          data: {
            projectName,
            serviceName,
            image: image !== serviceType ? image : undefined,
            password:
              (environment && environment.POSTGRES_PASSWORD) ||
              randomPassword(),
          },
        };
      } else if (serviceType === "mysql") {
        return {
          type: "mysql",
          data: {
            projectName,
            serviceName,
            image: image !== serviceType ? image : undefined,
            rootPassword:
              (environment && environment.MYSQL_ROOT_PASSWORD) ||
              randomPassword(),
            password:
              (environment && environment.MYSQL_PASSWORD) || randomPassword(),
          },
        };
      } else if (serviceType === "redis") {
        return {
          type: "redis",
          data: {
            projectName,
            serviceName,
            image: image !== serviceType ? image : undefined,
            password:
              (environment && environment.REDIS_PASSWORD) || randomPassword(),
          },
        };
      } else {
        return parseAppService(
          projectName,
          serviceName,
          image || "",
          ports,
          environment,
          volumes
        );
      }
    }
  );

  return {
    services: easypanelServices,
  };
}
