import { getYmlFile } from "./helper";
import { parseCompose } from "./parse";

async function main() {
  const file = await getYmlFile("./test-compose.yml");
  const res = parseCompose(file);
  console.log("RES\n" + res);
}

main();
