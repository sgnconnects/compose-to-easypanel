import {
  getEnvVariable,
  getServiceType,
} from "../packages/parser/compose/helper";

describe("test the different Helper Function to parse the Compose", () => {
  it("get env variable", () => {
    expect(getEnvVariable({ TEST_ENV: "test_env_value" }, "TEST_ENV")).toEqual(
      "test_env_value"
    );

    expect(getEnvVariable({}, "TEST_ENV")).toBe(undefined);
    expect(getEnvVariable(undefined, "TEST_ENV")).toBe(undefined);
    expect(getEnvVariable([], "TEST_ENV")).toBe(undefined);
  });

  it("get service Type", () => {
    expect(
      getServiceType({
        image: "docker:latest",
      })
    ).toEqual("app");

    expect(
      getServiceType({
        image: "postgres:latest",
      })
    ).toEqual("postgres");

    expect(
      getServiceType({
        image: "mysql:latest",
      })
    ).toEqual("mysql");

    expect(
      getServiceType({
        image: "mariadb:latest",
      })
    ).toEqual("mariadb");

    expect(
      getServiceType({
        image: "mongo:latest",
      })
    ).toEqual("mongo");

    expect(
      getServiceType({
        image: "redis:latest",
      })
    ).toEqual("redis");

    expect(
      getServiceType({
        image: "supabase/postgres",
        environment: {
          EASYPANEL_DATABASE: "postgres",
        },
      })
    ).toEqual("postgres");
  });
});
