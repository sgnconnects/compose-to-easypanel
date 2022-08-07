import { DockerService, DockerYml } from "./types";
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
