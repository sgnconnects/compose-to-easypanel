import { ERROR_MESSAGES, SUPPORTED_COMPOSE_PROPS } from "../definition";
import { DockerCompose } from "./parseYml";

interface Validation {
  error?: true;
  warning?: true;
  message?: string;
}

/**
 *
 * @param compose parsed Docker Compose File
 * @returns validation Results
 */
export function validate(compose: DockerCompose): Validation {
  const reqProps = hasRequiredPropsAndTypes(compose);
  if (!reqProps) return { error: true, message: ERROR_MESSAGES.reqProps };

  const isV3 = isVersion3(compose.version);
  if (!isV3) return { error: true, message: ERROR_MESSAGES.notV3 };

  const notSupported = notSupportedProps(compose);

  if (notSupported.length > 0)
    return {
      warning: true,
      message: `the prop/s ${notSupported
        .map((p) => `"${p}"`)
        .join(", ")} is/are currently not supported an ignored by the parser`,
    };

  return {};
}

/**
 * @param version string of the compose version e.g "3" | "2.9" etc
 * @returns boolean if the version is 3.x
 */
export function isVersion3(version: string): boolean {
  if (version.split(".")[0] === "3") return true;
  return false;
}

/**
 * @param compose parsed Docker Compose File
 * @returns true if the object has version: string and service: object
 */
export function hasRequiredPropsAndTypes(compose: DockerCompose): boolean {
  if (
    compose &&
    compose.version &&
    typeof compose.version === "string" &&
    compose.services &&
    typeof compose === "object"
  )
    return true;
  return false;
}

/**
 * @param compose parsed Docker Compose File
 * @returns string[] of dockerCompose props the parser can not translate
 */
export function notSupportedProps(compose: DockerCompose): string[] {
  const serviceKeys = Object.keys(compose.services);

  let notSupported: string[] = [];
  serviceKeys.forEach((serviceKey) => {
    const service = compose.services[serviceKey];
    const serviceProps = Object.keys(service);

    serviceProps.forEach((prop) => {
      if (!SUPPORTED_COMPOSE_PROPS.includes(prop)) notSupported.push(prop);
    });
  });

  return notSupported;
}
