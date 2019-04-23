import { assert } from "chai";
import config from "../config/config";
import axios from "axios";

async function callApi(endpoint) {
  const res = await axios.get(
    `http://localhost:${config.SERVER_PORT}${endpoint}`
  );
  const { data } = await res;
  return data;
}

describe("Test Route", () => {
  it("should return the test response", () => {
    callApi("/api/test").then(response => {
      assert.propertyVal(response, "test", "Hello World.");
    });
  });
});
