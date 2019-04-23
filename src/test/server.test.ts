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

describe("Server Tests", () => {
  describe("Test Route", () => {
    it("should return an object", () => {
      callApi("/test").then(response => {
        assert.typeOf(response, "object");
      });
    });
    it("should return an object containing a test prop with a value of Hello World.", () => {
      callApi("/test").then(response => {
        assert.propertyVal(response, "test", "Hello World.");
      });
    });
  });
  describe("Number Route", () => {
    it("should return an object", () => {
      callApi("/number").then(response => {
        assert.typeOf(response, "object");
      });
    });
    it("should return an object containing a randomNumber prop with a number.", () => {
      callApi("/number").then(response => {
        assert.typeOf(response.randomNumber, "number");
      });
    });
  });
});
