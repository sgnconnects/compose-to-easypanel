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
