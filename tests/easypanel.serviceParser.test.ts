import {
  parseAppService,
  parseMariaDbService,
  parseMongoService,
  parseMySqlService,
  parsePostgresService,
  parseRedisService,
} from "../packages/parser/easypanel/serviceParser";

describe("test the service Parsers", () => {
  it("Postgres Service", () => {
    expect(
      parsePostgresService(
        "project",
        "postgres",
        { POSTGRES_PASSWORD: "pw" },
        "postgres"
      )
    ).toEqual({
      type: "postgres",
      data: {
        projectName: "project",
        serviceName: "postgres",
        image: undefined,
        password: "pw",
      },
    });
  });

  it("Mysql Service", () => {
    expect(
      parseMySqlService(
        "project",
        "mysql",
        { MYSQL_ROOT_PASSWORD: "pw_root", MYSQL_PASSWORD: "pw_normal" },
        "mysql"
      )
    ).toEqual({
      type: "mysql",
      data: {
        projectName: "project",
        serviceName: "mysql",
        image: undefined,
        password: "pw_normal",
        rootPassword: "pw_root",
      },
    });
  });
  it("Maria Service", () => {
    expect(
      parseMariaDbService(
        "project",
        "mariadb",
        { MARIADB_ROOT_PASSWORD: "pw_root", MARIADB_PASSWORD: "pw_normal" },
        "mariadb"
      )
    ).toEqual({
      type: "mariadb",
      data: {
        projectName: "project",
        serviceName: "mariadb",
        image: undefined,
        password: "pw_normal",
        rootPassword: "pw_root",
      },
    });
  });
  it("Mongo Service", () => {
    expect(
      parseMongoService(
        "project",
        "mongo",
        { MONGO_INITDB_ROOT_PASSWORD: "pw" },
        "mongo"
      )
    ).toEqual({
      type: "mongo",
      data: {
        projectName: "project",
        serviceName: "mongo",
        image: undefined,
        password: "pw",
      },
    });
  });
  it("Redis Service", () => {
    expect(
      parseRedisService("project", "redis", { REDIS_PASSWORD: "pw" }, "redis")
    ).toEqual({
      type: "redis",
      data: {
        projectName: "project",
        serviceName: "redis",
        image: undefined,
        password: "pw",
      },
    });
  });
  it("App Service", () => {
    expect(
      parseAppService(
        "project",
        "app",
        "docker",
        ["5000:8000"],
        { API_KEY: "apiKey" },
        ["./bind:/app/bind", "volume:/app/volume"],
        ["yarn", "start"]
      )
    ).toEqual({
      type: "app",
      data: {
        projectName: "project",
        serviceName: "app",
        source: {
          type: "image",
          image: "docker",
        },
        ports: [
          {
            published: 5000,
            target: 8000,
          },
        ],
        env: "API_KEY=apiKey",
        mounts: [
          {
            type: "bind",
            hostPath: "./bind",
            mountPath: "/app/bind",
          },
          { type: "volume", name: "volume", mountPath: "/app/volume" },
        ],
        deploy: {
          command: "yarn start",
        },
      },
    });
  });
});
