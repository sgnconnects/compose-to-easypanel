import { DefinitionsService } from "@gfi-centre-ouest/docker-compose-spec-typescript/lib/docker-compose-spec-v3.0";
import YAML from "yaml";

export interface DockerCompose {
  version: string;
  services: {
    [key: string]: DefinitionsService;
  };
}

export type { DefinitionsService as DockerComposeService } from "@gfi-centre-ouest/docker-compose-spec-typescript/lib/docker-compose-spec-v3.0";
/**
 *
 * @param ymlString string of the docker compose yml
 * @returns parses the string to an javascript object or throws an error
 */
export function parseYml(ymlString: string): DockerCompose {
  return YAML.parse(ymlString);
}
