import { getServiceType } from "../compose/helper";
import { DockerCompose, DockerComposeService } from "../compose/parseYml";
import { SingleServiceSchema, Template, TemplateSchema } from "../types";
import {
  parseAppService,
  parseMongoService,
  parseMySqlService,
  parsePostgresService,
  parseRedisService,
} from "./serviceParser";

/**
 *
 * @param compose the parsed compose file
 * @param projectName the project Name
 * @returns the parsed Template
 */
export function parse(compose: DockerCompose, projectName: string): Template {
  const serviceKeys = Object.keys(compose.services);
  const easypanelServices: TemplateSchema["services"] = serviceKeys.map(
    (key) => {
      const service = compose.services[key];
      const serviceName = service.container_name || key;
      const serviceType = getServiceType(service);
      return parseService(service, serviceType, serviceName, projectName);
    }
  );

  return {
    services: easypanelServices,
  };
}

/**
 *
 * @param service the compose service
 * @param serviceType the app type defined in definitions.ts
 * @param serviceName
 * @param projectName
 * @returns one easypanel single service schema
 */
export function parseService(
  service: DockerComposeService,
  serviceType: string,
  serviceName: string,
  projectName: string
): SingleServiceSchema {
  const { environment, image, ports, volumes, command } = service;
  if (serviceType === "postgres") {
    return parsePostgresService(projectName, serviceName, environment, image);
  } else if (serviceType === "mongo") {
    return parseMongoService(projectName, serviceName, environment, image);
  } else if (serviceType === "redis") {
    return parseRedisService(projectName, serviceName, environment, image);
  } else if (serviceType === "mysql") {
    return parseMySqlService(projectName, serviceName, environment, image);
  } else {
    return parseAppService(
      projectName,
      serviceName,
      image || "",
      ports,
      environment as { [key: string]: string },
      volumes,
      command
    );
  }
}
