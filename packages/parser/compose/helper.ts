import { SUPPORTED_APP_TYPES } from "../definition";
import { DockerComposeService } from "./parseYml";

/**
 * @param environment the environment props of an docker service
 * @param envName the name of the env var
 * @returns the env var value or undefined
 */
export function getEnvVariable(
  environment: DockerComposeService["environment"],
  envName: string
): string | number | undefined {
  if (environment && !Array.isArray(environment) && environment[envName])
    return environment[envName] || undefined;
}

/**
 *
 * @param service one service under the docker Compose services prop
 * @returns one service type defined under definition.ts
 */
export function getServiceType(service: DockerComposeService): string {
  //explicit service Type via "EASYPANEL_DATABASE"
  if (
    typeof service.image?.split(":")[0] === "string" &&
    SUPPORTED_APP_TYPES.includes(service.image?.split(":")[0])
  )
    return service.image?.split(":")[0];

  // service type by image
  const easypanelDatabase = getEnvVariable(
    service.environment,
    "EASYPANEL_DATABASE"
  );
  if (
    typeof easypanelDatabase === "string" &&
    SUPPORTED_APP_TYPES.includes(easypanelDatabase)
  )
    return easypanelDatabase;

  return "app";
}
