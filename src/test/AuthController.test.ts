import chai from "chai";
import axios from "axios";
import config from "../config/config";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";

// Dummy Account
const dummyAccount: IRegistrationRequest = {
  email: "test@mail.com",
  password: "test1234",
  confirmPassword: "test1234"
};

describe("Authentication Controller", () => {
  describe("Registration", () => {
    it("should return the user as an object once registered", async () => {
      const res = await axios.post(
        `http://localhost:${config.SERVER_PORT}/api/auth/register`,
        dummyAccount
      );
      const { data } = await res;
      chai.expect(res.status).to.eq(200);
      chai.expect(data).to.be.an("object");
      chai.expect(data).to.have.all.keys("id", "email", "password");
    });
  });
});
