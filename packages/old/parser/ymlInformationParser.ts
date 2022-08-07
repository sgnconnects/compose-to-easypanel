import { DockerService, DockerYml } from "../cli/types";
import { singleServiceSchema, supportedServiceTypes } from "./schema";
import { SingleServiceSchema } from "./types";

export function getEasypanelServiceType(
  dockerService: DockerService
): typeof supportedServiceTypes[0] {
  let serviceType: typeof supportedServiceTypes[0] = "app";

  const imageName = dockerService.image?.split(":")[0];
  const dataBaseEnv =
    dockerService.environment && dockerService.environment.EASYPANEL_DATABASE;

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

export function isVersion3(versionString: string) {
  if (versionString.split(".")[0] === "3") return true;
  return false;
}

export function hasEnvVariable(
  environment: DockerService["environment"],
  envVariable: string
) {
  if (environment && environment[envVariable]) return true;
  return false;
}
