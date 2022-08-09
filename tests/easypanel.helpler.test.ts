import { getImage, getPassword } from "../packages/parser/easypanel/helper";

describe("Test Helper Function for Parsing the Services", () => {
  it("get the right Image", () => {
    expect(getImage("postgres", "postgres")).toBe(undefined);
    expect(getImage("postgres:5", "postgres")).toBe("postgres:5");
  });

  it("get right password env", () => {
    expect(
      getPassword(
        {
          REDIS_PASSWORD: "redis_pw",
        },
        "redis"
      )
    ).toBe("redis_pw");

    expect(
      getPassword(
        {
          MYSQL_ROOT_PASSWORD: "root",
          MYSQL_PASSWORD: "normal",
        },
        "mysql",
        "root"
      )
    ).toBe("root");

    expect(
      getPassword(
        {
          MYSQL_ROOT_PASSWORD: "root",
          MYSQL_PASSWORD: "normal",
        },
        "mysql",
        "normal"
      )
    ).toBe("normal");
  });
});
