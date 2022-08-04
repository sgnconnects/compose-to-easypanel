import { DockerService, DockerYml, supportedServiceTypes } from "./types";
import fs from "fs/promises";
import path from "path";
import { parse } from "yaml";

/**
 *
 * @param filepath docker-compose.yml filepath relative to the cwd
 * @returns parsed yaml file as an js object
 */
export async function getYmlFile(filepath: string): Promise<DockerYml> {
  //get yamlstring
  const fileString = await fs.readFile(
    path.join(process.cwd(), filepath),
    "utf-8"
  );
  //parse yaml to js object
  const parsed: DockerYml = parse(fileString);
  return parsed;
}

export function getEasypanelServiceType(
  dockerService: DockerService
): supportedServiceTypes {
  let serviceType: supportedServiceTypes = "app";

  const supportedTypes = ["app", "postgres", "mongo", "redis", "mysql"];
  const imageName = dockerService.image?.split(":")[0];
  const dataBaseEnv =
    dockerService.environment && dockerService.environment.EASYPANEL_DATABASE;

  if (dataBaseEnv) {
    supportedTypes.forEach((type) => {
      if (dataBaseEnv === type)
        serviceType = dataBaseEnv as supportedServiceTypes;
    });
  } else if (imageName) {
    supportedTypes.forEach((type) => {
      if (imageName === type) serviceType = imageName as supportedServiceTypes;
    });
  } else serviceType = "app";

  return serviceType;
}
