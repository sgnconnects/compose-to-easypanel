import { DockerYml, EasypanelSchema } from "./types";

export function parseCompose(dockerYml: DockerYml): EasypanelSchema | Error {
  // chek if the compose file is not using v 3
  if (dockerYml.version.split("")[0] !== "3")
    return new Error("docker-compose version 3.x is requiered");

  const dockerServices = dockerYml.services;

  const easypanelSchema: EasypanelSchema = {
    services: [],
  };
  const panelServices = easypanelSchema.services;

  //loop through all services
  Object.keys(dockerServices).forEach((serviceKey) => {
    const dockerService = dockerServices[serviceKey];
  });

  //@ts-ignore
  return "success";
}
