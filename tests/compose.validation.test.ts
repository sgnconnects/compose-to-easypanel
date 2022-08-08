import { ERROR_MESSAGES } from "../packages/parser/definition";
import {
  hasRequiredPropsAndTypes,
  isVersion3,
  notSupportedProps,
  validate,
} from "../packages/parser/compose/validation";

describe("Compose Parser and Validation Tests", () => {
  it("is Version 3.x", () => {
    expect(isVersion3("")).toBe(false);
    expect(isVersion3("0")).toBe(false);
    expect(isVersion3("3")).toBe(true);
    expect(isVersion3("3.5")).toBe(true);
  });

  it("has required Compose Props", () => {
    //@ts-ignore
    expect(hasRequiredPropsAndTypes({})).toBe(false);
    //@ts-ignore
    expect(
      //@ts-ignore
      hasRequiredPropsAndTypes({ version: 0, services: "oh no i am a string" })
    ).toBe(false);
    expect(hasRequiredPropsAndTypes({ version: "3", services: {} })).toBe(true);
  });

  it("find not Supported Props", () => {
    expect(
      notSupportedProps({
        version: "3",
        services: {
          app: {
            image: "",
            environment: {},
            volumes: [],
            ports: [],
            command: "",
            container_name: "",
          },
        },
      })
    ).toEqual([]);
    expect(
      notSupportedProps({
        version: "3",
        services: {
          app: {
            depends_on: [""],
          },
        },
      })
    ).toEqual(["depends_on"]);
  });

  it("validate all", () => {
    //@ts-ignore
    expect(validate({})).toEqual({
      error: true,
      message: ERROR_MESSAGES.reqProps,
    });

    expect(validate({ version: "2.0", services: {} })).toEqual({
      error: true,
      message: ERROR_MESSAGES.notV3,
    });

    expect(
      validate({
        version: "3.0",
        services: {
          app: {
            depends_on: [""],
          },
        },
      })
    ).toEqual({
      warning: true,
      message:
        'the prop/s "depends_on" is/are currently not supported an ignored by the parser',
    });

    expect(
      validate({
        version: "3.0",
        services: {
          app: {
            ports: [],
          },
        },
      })
    ).toEqual({});
  });
});
