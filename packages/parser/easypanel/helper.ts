import { getEnvVariable } from "../compose/helper";
import { DockerComposeService } from "../compose/parseYml";
import { DATABASE_PASSWORD_ENV_NAMES } from "../definition";

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

export function getImage(
  image: string | undefined,
  appType: string
): string | undefined {
  const dbImage = image !== appType ? image : undefined;
  return dbImage;
}
