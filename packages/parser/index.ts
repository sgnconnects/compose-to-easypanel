import { parsePostgresService } from "./parser";
import { randomPassword } from "./schema";
import { TemplateSchema } from "./types";
import {
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

    const serviceKeys = Object.keys(yml.services);

    const easypanelServices: TemplateSchema["services"] = serviceKeys.map(
      (serviceKey) => {
        const { container_name, environment, image, ports, volumes, command } =
          yml.services[serviceKey];
        const serviceName = container_name || serviceKey;
        const serviceType = getEasypanelServiceType({ environment, image });

        if (serviceType === "postgres") {
          return {
            type: "postgres",
            data: {
              projectName,
              serviceName,
              image: image !== serviceType ? image : undefined,
              password:
                //@ts-ignore
                (environment && environment.POSTGRES_PASSWORD) ||
                randomPassword(),
            },
          };
        } else if (serviceType === "mongo") {
          return {
            type: "mongo",
            data: {
              projectName,
              serviceName,
              image: image !== serviceType ? image : undefined,
              password:
                //@ts-ignore
                (environment && environment.MONGO_INITDB_ROOT_PASSWORD) ||
                randomPassword(),
            },
          };
        } else if (serviceType === "redis") {
          return {
            type: "redis",
            data: {
              projectName,
              serviceName,
              image: image !== serviceType ? image : undefined,
              password:
                //@ts-ignore
                (environment && environment.REDIS_PASSWORD) || randomPassword(),
            },
          };
        } else if (serviceType === "mysql") {
          return {
            type: "mysql",
            data: {
              projectName,
              serviceName,
              image: image !== serviceType ? image : undefined,
              rootPassword:
                //@ts-ignore
                (environment && environment.MYSQL_ROOT_PASSWORD) ||
                randomPassword(),
              password:
                //@ts-ignore
                (environment && environment.MYSQL_PASSWORD) || randomPassword(),
            },
          };
        } else {
          return {
            type: "app",
            data: {
              projectName,
              serviceName,
              source: {
                type: "image",
                image: image || "",
              },
              deploy: {
                command: Array.isArray(command) ? command.join(" ") : command,
              },
              ports: ports?.map((port) => {
                return {
                  published:
                    typeof port === "string"
                      ? parseInt(port.split(":")[0])
                      : port,
                  target:
                    typeof port === "string"
                      ? parseInt(port.split(":")[1])
                      : port,
                };
              }),
              env: environment
                ? Object.keys(environment)
                    //@ts-ignore
                    .map((key) => `${key}=${environment[key]}`)
                    .join("\n")
                : undefined,
              mounts: volumes?.map((volume) => {
                const hostPathOrName = volume.split(":")[0];
                const mountPath = volume.split(":")[1];

                if (
                  hostPathOrName.split("")[0] === "/" ||
                  hostPathOrName.split("")[0] === "."
                ) {
                  return {
                    type: "bind",
                    hostPath: hostPathOrName,
                    mountPath,
                  };
                }

                return {
                  type: "volume",
                  name: hostPathOrName,
                  mountPath,
                };
              }),
            },
          };
        }
      }
    );

    return {
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
