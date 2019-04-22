import { assert } from "chai";
import config from "../config/config";
import axios from "axios";

describe("Server Test", () => {
  it("should return an object", () => {
    axios
      .get(`http://localhost:${config.SERVER_PORT}/test`)
      .then(res => assert.typeOf(res.data, "object"))
      .catch(err => console.error(err));
  });
  it("should return an object containing a test prop with a value of Hello World.", () => {
    axios
      .get(`http://localhost:${config.SERVER_PORT}/test`)
      .then(res => assert.propertyVal(res.data, "test", "Hello World."))
      .catch(err => console.error(err));
  });
});
