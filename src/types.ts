export interface DockerYml {
  version: string;
  services: {
    [key: string]: DockerService;
  };
}

export interface DockerService {
  container_name?: string;
  image?: string;
  ports?: string[];
  environment?: { [key: string]: string };
  volumes?: string[];
}

export interface EasypanelSchema {
  services: Service[];
}

export interface Service {
  type: "app" | "mysql" | "mongo" | "postgres" | "redis";
  data:
    | AppSchemaData
    | MySqlSchemaData
    | MongoSchemaData
    | PostgresSchemaData
    | RedisSchemaData;
}

interface AppSchemaData {
  projectName: string;
  serviceName: string;
  deploy?: {
    command?: string;
  };
  env?: string;
  source?: {
    type: "image";
    image: string;
  };
  mounts?: Array<{
    type: "volume" | "bind";
    name?: string;
    hostPath?: string;
    mountPath?: string;
  }>;
  ports?: Array<{
    published: string;
    target: string;
  }>;
}

interface MySqlSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
  rootPassword: string;
  image?: string;
}
interface MongoSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
  image?: string;
}
interface PostgresSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
  image?: string;
}
interface RedisSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
  image?: string;
}

export type supportedServiceTypes =
  | "app"
  | "postgres"
  | "mongo"
  | "redis"
  | "mysql";
