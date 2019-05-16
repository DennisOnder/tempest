import chai from "chai";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";
import ILoginRequest from "../interfaces/ILoginRequest";
import callApi from "./callApi";
import { User } from "../models/user.model";

// Randomly generated account for registration testing
const dummyAccount: IRegistrationRequest = {
  email: `test${Math.floor(Math.random() * 10000)}@mail.com`,
  password: "test1234",
  confirmPassword: "test1234"
};

// Login test account
const testUser: ILoginRequest = {
  email: "test@mail.com",
  password: "test1234"
};

// Response keys
const responseKeys = ["id", "email", "createdAt", "updatedAt"];

// Delete dummy account from the database once testing is done
after(() => User.destroy({ where: { email: dummyAccount.email } }));

describe("Authentication Controller", () => {
  describe("Registration", () => {
    it("should return the user as an object once registered", async () => {
      const result = await callApi("post", "/auth/register", dummyAccount);
      chai.expect(result.status).to.eq(200);
      chai.assert.typeOf(result.data, "object");
      chai.expect(result.data).to.have.all.keys(...responseKeys, "password");
    });
  });
  describe("Login", () => {
    it("should return an object containing the authentication token and a success prop", async () => {
      const result = await callApi("post", "/auth/login", testUser);
      chai.expect(result.status).to.eq(200);
      chai.assert.typeOf(result.data, "object");
      chai.assert.propertyVal(result.data, "success", true);
      chai.assert.property(result.data, "token");
    });
  });
  describe("Get current user", () => {
    it("should return an object with the user details", async () => {
      const user = await callApi("post", "/auth/login", testUser);
      const result = await callApi(
        "get",
        "/auth/current",
        testUser,
        user.data.token
      );
      chai.expect(result.status).to.eq(200);
      chai.assert.typeOf(result.data, "object");
      chai.expect(result.data).to.have.all.keys(...responseKeys);
    });
  });
});
