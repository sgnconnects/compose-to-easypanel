import { getYmlFile } from "./helpers";
import { parseCompose } from "./parse";

async function main() {
  const file = await getYmlFile("./test-compose.yml");
  const res = parseCompose(file, "test");
  console.log("RES\n" + res);
}

main();
