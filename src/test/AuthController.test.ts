import chai from "chai";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";
import ILoginRequest from "../interfaces/ILoginRequest";
import callApi from "./callApi";

describe("Authentication Controller", () => {
  describe("Registration", () => {
    it("should return the user as an object once registered", async () => {
      const dummyAccount: IRegistrationRequest = {
        email: `test${Math.floor(Math.random() * 10000)}@mail.com`,
        password: "test1234",
        confirmPassword: "test1234"
      };
      const result = await callApi("post", "/auth/register", dummyAccount);
      chai.expect(result.status).to.eq(200);
      chai.assert.typeOf(result.data, "object");
      chai.expect(result.data).to.have.all.keys("id", "email", "password");
    });
  });
  describe("Login", () => {
    it("should return an object containing the authentication token and a success prop", async () => {
      const user: ILoginRequest = {
        email: "test@mail.com",
        password: "test1234"
      };
      const result = await callApi("post", "/auth/login", user);
      chai.expect(result.status).to.eq(200);
      chai.assert.typeOf(result.data, "object");
      chai.assert.propertyVal(result.data, "success", true);
      chai.assert.property(result.data, "token");
    });
  });
});
