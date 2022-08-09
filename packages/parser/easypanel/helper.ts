import { getEnvVariable } from "../compose/helper";
import { DockerComposeService } from "../compose/parseYml";
import { DATABASE_PASSWORD_ENV_NAMES } from "../definition";

/**
 *
 * @param environment service environment props
 * @param appType app Type defined in  definitions.ts
 * @param type some databases do need a root and normal password define witch one you need, if the service has only one password leave blank
 * @returns string with the requested pw or blank
 */
export function getPassword(
  environment: DockerComposeService["environment"],
  appType: string,
  type?: "root" | "normal"
): string | undefined {
  const env = getEnvVariable(
    environment,
    type === "root"
      ? //@ts-ignore
        (DATABASE_PASSWORD_ENV_NAMES[appType].root as string)
      : type === "normal"
      ? //@ts-ignore
        DATABASE_PASSWORD_ENV_NAMES[appType].normal
      : //@ts-ignore
        DATABASE_PASSWORD_ENV_NAMES[appType]
  );

  if (typeof env === "string") return env;

  return undefined;
}

/**
 *
 * @param image image prop
 * @param appType app prop defined in definitions
 * @returns custom image or undefined
 */
export function getImage(
  image: string | undefined,
  appType: string
): string | undefined {
  const dbImage = image !== appType ? image : undefined;
  return dbImage;
}

/**
 *
 * @param ports docker compose port array
 * @returns schema port array
 */
export function getPorts(ports: (string | number)[] | undefined) {
  return ports?.map((port) => {
    return {
      published: typeof port === "number" ? port : parseInt(port.split(":")[0]),
      target: typeof port === "number" ? port : parseInt(port.split(":")[1]),
    };
  });
}

/**
 *
 * @param environment docker compose env object
 * @returns schema env string
 */
export function getEnv(environment: { [k: string]: string } | undefined) {
  const parsedEnv = environment
    ? Object.keys(environment)
        .map((key) => `${key}=${environment[key]}`)
        .join("\n")
    : undefined;

  return parsedEnv;
}

/**
 *
 * @param volumes docker compose volume array
 * @returns schema mounts array (bind or volume)
 */
export function getMounts(
  volumes: string[] | undefined
):
  | (
      | { type: "bind"; hostPath: string; mountPath: string }
      | { type: "volume"; name: string; mountPath: string }
    )[]
  | undefined {
  return volumes?.map((volume) => {
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
    } else
      return {
        type: "volume",
        name: hostPathOrName,
        mountPath,
      };
  });
}

export function getDeploy(command?: string | string[]) {
  if (command)
    return {
      command: Array.isArray(command) ? command.join(" ") : command,
    };

  return undefined;
}
