import { assert } from "chai";
import callApi from "../utils/callApi";

describe("Test Route", () => {
  it("should return the test response", async () => {
    const res = await callApi("get", "/test");
    assert.propertyVal(res.data, "test", "Hello World.");
  });
});
