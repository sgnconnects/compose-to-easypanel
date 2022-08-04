import fs from "fs/promises";
import { Template } from "./parser/types";
import path from "path";

export async function writeJson(filePath: string, template: Template) {
  await fs.writeFile(
    path.join(process.cwd(), filePath),
    JSON.stringify(template)
  );
}
