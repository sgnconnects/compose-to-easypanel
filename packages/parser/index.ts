import {
  parseAppService,
  parseMongoService,
  parseMySqlService,
  parsePostgresService,
  parseRedisService,
} from "./parser";
import { randomPassword } from "./schema";
import { SingleServiceSchema, TemplateSchema } from "./types";
import {
  findNotSupportedProps,
  getEasypanelServiceType,
  isVersion3,
  parseComposeYmlString,
  requiredProps,
} from "./ymlParser";

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
    if (!requiredProps(yml))
      throw new Error(
        `Please specify "version" as string and "services" as object`
      );
    if (!projectName) throw new Error("Please specify a Project Name");

    if (!isVersion3(yml.version || ""))
      throw new Error("Please use Compose Version 3.x to use this generator");

    const notSupportedProps = findNotSupportedProps(yml);
    console.log(notSupportedProps);
    const serviceKeys = Object.keys(yml.services);
    const easypanelServices: TemplateSchema["services"] = serviceKeys.map(
      (serviceKey) => {
        const { container_name, environment, image, ports, volumes, command } =
          yml.services[serviceKey];
        const serviceName = container_name || serviceKey;
        const serviceType = getEasypanelServiceType({ environment, image });

        let service = {};

        if (serviceType === "postgres") {
          service = parsePostgresService(
            projectName,
            serviceName,
            environment,
            image
          );
        } else if (serviceType === "mongo") {
          service = parseMongoService(
            projectName,
            serviceName,
            environment,
            image
          );
        } else if (serviceType === "redis") {
          service = parseRedisService(
            projectName,
            serviceName,
            environment,
            image
          );
        } else if (serviceType === "mysql") {
          service = parseMySqlService(
            projectName,
            serviceName,
            environment,
            image
          );
        } else {
          service = parseAppService(
            projectName,
            serviceName,
            image || "",
            ports,
            environment as { [key: string]: string },
            volumes,
            command
          );
        }

        return service as SingleServiceSchema;
      }
    );

    return {
      warning:
        notSupportedProps.length !== 0
          ? `the prop/s ${notSupportedProps
              .map((p) => `"${p}"`)
              .join(
                ", "
              )} is/are currently not supported an ignored by the parser`
          : undefined,
      schema: JSON.stringify(
        {
          services: easypanelServices,
        },
        null,
        4
      ),
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

export function parser() {
  return { parse: parseYmlToEasypanel };
}
