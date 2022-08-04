import { writeJson } from "./jsonWriter";
import { parseDockerToEasypanel } from "./parser";
import { Template } from "./parser/types";
import { getYmlFile } from "./ymlReader";
import { program } from "commander";
import path from "path";

program
  .name("compose-to-easypanel")
  .description("create an easypanel schema from a docker-compose file")
  .version("0.0.1");

program
  .argument("projectName")
  .option("-i <docker-compose.yml>", "docker compose input file")
  .option("-o,<schema-output.json>", "schema json output file")
  .action(async (projectName, options) => {
    const input = options.i;
    const output = options.o;
    const file = await getYmlFile(input);
    const schema = parseDockerToEasypanel(file, projectName);
    writeJson(output, schema);

    console.log("successfully created your schema");
    console.log("visit: ", path.join(process.cwd(), output));
  });

program.parse();
