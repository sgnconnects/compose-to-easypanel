import { DefinitionsService } from "@gfi-centre-ouest/docker-compose-spec-typescript/lib/docker-compose-spec-v3.0";
import YAML from "yaml";
import { supportedComposeProps, supportedServiceTypes } from "./schema";

export interface DockerCompose {
  version: string;
  services: {
    [key: string]: DefinitionsService;
  };
}

export type { DefinitionsService as DockerComposeService } from "@gfi-centre-ouest/docker-compose-spec-typescript/lib/docker-compose-spec-v3.0";

export function parseComposeYmlString(ymlString: string): DockerCompose {
  const yml = YAML.parse(ymlString || "");
  return yml;
}

export function isVersion3(versionString: string) {
  if (versionString.split(".")[0] === "3") return true;
  return false;
}

export function envVariable(
  environment: DefinitionsService["environment"],
  envVariable: string
): string | false {
  //@ts-ignore
  if (environment && environment[envVariable]) return environment[envVariable];
  return false;
}

export function requiredProps(composeFile: DockerCompose) {
  if (
    composeFile &&
    composeFile.version &&
    typeof composeFile.version === "string" &&
    composeFile.services &&
    typeof composeFile === "object"
  )
    return true;
  return false;
}

export function getEasypanelServiceType(
  dockerService: DefinitionsService
): typeof supportedServiceTypes[0] {
  let serviceType: typeof supportedServiceTypes[0] = "app";

  const imageName = dockerService.image?.split(":")[0];
  const dataBaseEnv =
    dockerService.environment &&
    typeof dockerService.environment === "object" &&
    //@ts-ignore
    dockerService.environment.EASYPANEL_DATABASE;

  if (dataBaseEnv) {
    supportedServiceTypes.forEach((type) => {
      if (dataBaseEnv === type) serviceType = dataBaseEnv;
    });
  } else if (imageName) {
    supportedServiceTypes.forEach((type) => {
      if (imageName === type) serviceType = imageName;
    });
  } else serviceType = "app";

  return serviceType;
}

export function findNotSupportedProps(yml: DockerCompose): string[] {
  const serviceKeys = Object.keys(yml.services);

  let notSupported: string[] = [];
  serviceKeys.forEach((serviceKey) => {
    const service = yml.services[serviceKey];
    const serviceProps = Object.keys(service);

    serviceProps.forEach((prop) => {
      if (!supportedComposeProps.includes(prop)) notSupported.push(prop);
    });
  });

  return notSupported;
}
