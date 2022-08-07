import { DefinitionsService } from "@gfi-centre-ouest/docker-compose-spec-typescript/lib/docker-compose-spec-v3.0";
import YAML from "yaml";

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

export function hasEnvVariable(
  environment: DefinitionsService["environment"],
  envVariable: string
) {
  //@ts-ignore
  if (environment && environment[envVariable]) return true;
  return false;
}
