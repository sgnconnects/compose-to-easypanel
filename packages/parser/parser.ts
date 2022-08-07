import { parseComposeYmlString } from "./ymlParser";

type converted = {
  schema: string | null;
  error?: string;
  warning?: string;
};

export function parseYmlToEasypanel(
  ymlString?: string,
  projectName?: string
): converted {
  try {
    const yml = parseComposeYmlString(ymlString || "");

    return {
      schema: convertSchemaToString({
        yml,
      }),
    };
  } catch (e: any) {
    return {
      schema: null,
      error: e.message || "A Unknown Error Occurred",
    };
  }
}

function convertSchemaToString(parsed: object) {
  return JSON.stringify(parsed, null, 4);
}
