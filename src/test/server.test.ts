import { assert } from "chai";
import axios from "axios";
import config from "../config/config";

describe("Test Route", () => {
  it("should return the test response", async () => {
    const res = await axios.get(
      `http://localhost:${config.SERVER_PORT}/api/test`
    );
    const { data } = await res;
    assert.propertyVal(data, "test", "Hello World.");
  });
});
