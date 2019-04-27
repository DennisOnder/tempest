import { assert } from "chai";
import callApi from "./callApi";

describe("Test Route", () => {
  it("should return the test response", async () => {
    const res = await callApi("get", "/test");
    const { data } = await res;
    assert.propertyVal(data, "test", "Hello World.");
  });
});
