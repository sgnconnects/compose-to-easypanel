import {
  parseMySqlService,
  parsePostgresService,
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
  it("Maria Service", () => {});
  it("Mongo Service", () => {});
  it("Redis Service", () => {});
  it("App Service", () => {});
});
