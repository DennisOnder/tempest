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

// Delete dummy account from the database once testing is done
after(() => User.destroy({ where: { email: dummyAccount.email } }));

describe("Authentication Controller", () => {
  describe("Registration", () => {
    it("should return the user as an object once registered", async () => {
      const result = await callApi("post", "/auth/register", dummyAccount);
      chai.expect(result.status).to.eq(200);
      chai.assert.typeOf(result.data, "object");
      chai
        .expect(result.data)
        .to.have.all.keys("id", "email", "password", "createdAt", "updatedAt");
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
      // Token placeholder
      // tslint:disable-next-line: max-line-length
      const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNTU2MzgyMzk2LCJleHAiOjE1NTY0Njg3OTZ9.buqIJjfaEt3P3U1AgDiMNiC6gO476BZZ6n-AcY1hFhw`;
      const result = await callApi("get", "/auth/current", testUser, token);
      console.log(result);
      chai.expect(result.status).to.eq(200);
      chai.assert.typeOf(result.data, "object");
      chai
        .expect(result.data)
        .to.have.all.keys("id", "email", "createdAt", "updatedAt");
    });
  });
});
