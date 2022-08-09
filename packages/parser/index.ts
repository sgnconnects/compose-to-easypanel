import { parseYml } from "./compose/parseYml";
import { validate } from "./compose/validation";
import { parse } from "./easypanel/parser";

interface Parsed {
  error?: string;
  warning?: string;
  schema?: string;
}

export function generateEasypanelFromCompose(
  ymlString: string,
  projectName: string
): Parsed {
  try {
    const compose = parseYml(ymlString);
    const validation = validate(compose);

    if (validation.error) {
      throw new Error(validation.message);
    }

    const schema = parse(compose, projectName);

    console.log(schema);

    return {
      schema: JSON.stringify(schema, null, 4),
      warning: validation.warning ? validation.message : undefined,
    };
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
}
