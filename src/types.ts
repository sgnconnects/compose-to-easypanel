export interface DockerYml {
  version: string;
  services: {
    [key: string]: {
      container_name?: string;
      image?: string;
      ports?: string[];
      environment?: { [key: string]: string };
      volumes?: string[];
    };
  };
}

export interface EasypanelSchema {
  services: Array<{
    type: "app" | "mysql" | "mongo" | "postgres" | "redis";
    data:
      | AppSchemaData
      | MySqlSchemaData
      | MongoSchemaData
      | PostgresSchemaData
      | RedisSchemaData;
  }>;
}

interface AppSchemaData {
  projectName: string;
  serviceName: string;
  env: string;
  source: {
    type: "image";
    image: string;
  };
  volumes: Array<{
    type: "volume";
    source: string;
    target: string;
  }>;
  ports: Array<{
    published: string;
    target: string;
  }>;
}

interface MySqlSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
  rootPassword: string;
}
interface MongoSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
}
interface PostgresSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
}
interface RedisSchemaData {
  projectName: string;
  serviceName: string;
  password: string;
}
