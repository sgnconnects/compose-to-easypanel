import { ERROR_MESSAGES, Parser } from "../packages/parser/classAproach";

describe("Testing The Easypanel to Compose Parser", () => {
  const parser = new Parser();

  it("empty yaml without 'version' and 'services'", () => {
    parser.compose = "";
    expect(parser.generate()).toEqual({
      error: ERROR_MESSAGES.reqProps,
      schema: "",
      warning: undefined,
    });
  });
  it("is version 3.x", () => {});
  it("find not Supported Props", () => {});
});

export {};
