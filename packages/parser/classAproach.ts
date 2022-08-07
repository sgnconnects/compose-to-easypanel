import { DockerCompose, DockerComposeService } from "./ymlParser";
import YAML from "yaml";
import { SingleServiceSchema } from "./types";

interface Parsed {
  warning?: string;
  error?: string;
  schema?: string;
}

export const SUPPORTED_APP_TYPES = [
  "mongo",
  "postgres",
  "mariadb",
  "mysql",
  "redis",
  "app",
];

export const SUPPORTED_COMPOSE_PROPS = [
  "container_name",
  "image",
  "command",
  "ports",
  "environment",
  "volumes",
];

export const ERROR_MESSAGES = {
  reqProps: `Please specify "version" as string and "services" as object`,
  notV3: "Please use Compose Version 3.x to use this generator",
};

export class Parser {
  private _compose?: DockerCompose;
  private composeParser = new DockerComposeParser();
  private _error?: string;
  private _warning?: string;

  public set compose(composeString: string) {
    this._compose = YAML.parse(composeString);
    this.composeParser.compose = this._compose;
    const { error, warning, message } =
      this.composeParser.parseYmlInformation();

    if (error) this._error = message;
    if (warning) this._warning = message;
  }

  public generate(): Parsed {
    const schema = "";
    return {
      error: this._error,
      warning: this._warning,
      schema,
    };
  }
}

export class EasypanelSchemaParser {
  /** 
  public parseApp(service: DockerComposeService): SingleServiceSchema {}
  public parseMongo(service: DockerComposeService): SingleServiceSchema {}
  public parsePostgres(service: DockerComposeService): SingleServiceSchema {}
  public parseRedis(service: DockerComposeService): SingleServiceSchema {}
  public parseMaria(service: DockerComposeService): SingleServiceSchema {}
  public parseMysql(service: DockerComposeService): SingleServiceSchema {}
  */
}

export class DockerComposeParser {
  private _compose?: DockerCompose;

  public set compose(compose: DockerCompose | undefined) {
    this._compose = compose;
  }

  public parseYmlInformation(): {
    error?: boolean;
    message?: string;
    warning?: boolean;
  } {
    if (!this.requiredProps())
      return { error: true, message: ERROR_MESSAGES.reqProps };
    else if (!this.isVersion3())
      return { error: true, message: ERROR_MESSAGES.notV3 };
    else if (this.findNotSupportedProps().length < 0)
      return {
        warning: true,
        message: `the prop/s ${this.findNotSupportedProps()
          .map((p) => `"${p}"`)
          .join(", ")} is/are currently not supported an ignored by the parser`,
      };
    return {
      error: false,
      warning: false,
    };
  }

  public getServiceType(serviceName: string): string {
    const service = this._compose?.services[serviceName];
    let serviceType = "";

    if (
      this.env(serviceName, "EASYPANEL_DATABASE") &&
      SUPPORTED_APP_TYPES.includes(
        this.env(serviceName, "EASYPANEL_DATABASE") as string
      )
    )
      serviceType = this.env(serviceName, "EASYPANEL_DATABASE") as string;
    else if (
      service?.image &&
      SUPPORTED_APP_TYPES.includes(service?.image.split(":")[0])
    )
      serviceType = service?.image.split(":")[0];

    return serviceType;
  }

  public env(serviceKey: string, envName: string): false | string {
    if (
      this._compose &&
      this._compose.services[serviceKey] &&
      this._compose.services[serviceKey].environment &&
      //@ts-ignore
      this._compose.services[serviceKey].environment[envName]
    )
      // @ts-ignore
      return this._compose.services[serviceKey].environment[envName];
    return false;
  }

  private isVersion3() {
    if (this._compose?.version.split(".")[0] === "3") return true;
    return false;
  }

  private findNotSupportedProps(): string[] {
    const serviceKeys = Object.keys(this._compose?.services || {});

    let notSupported: string[] = [];
    serviceKeys.forEach((serviceKey) => {
      const service = this._compose?.services[serviceKey];
      const serviceProps = Object.keys(service || {});

      serviceProps.forEach((prop) => {
        if (!SUPPORTED_COMPOSE_PROPS.includes(prop)) notSupported.push(prop);
      });
    });

    return notSupported;
  }

  private requiredProps() {
    if (
      this._compose &&
      this._compose.version &&
      typeof this._compose.version === "string" &&
      this._compose.services &&
      typeof this._compose === "object"
    )
      return true;
    return false;
  }
}
