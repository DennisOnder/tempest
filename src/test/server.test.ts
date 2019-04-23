import { assert } from "chai";
import callApi from "./callApi";

describe("Test Route", () => {
  it("should return the test response", () => {
    callApi("/api/test").then(response => {
      assert.propertyVal(response, "test", "Hello World.");
    });
  });
});
