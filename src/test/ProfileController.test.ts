import chai from "chai";
import callApi from "./callApi";
import ILoginRequest from "../interfaces/ILoginRequest";
import IProfileRequest from "../interfaces/IProfileRequest";

const testUser: ILoginRequest = {
  email: "test@mail.com",
  password: "test1234"
};

const dummyProfile: IProfileRequest = {
  user_id: 1,
  firstName: "Test",
  lastName: "Profile",
  biography: "Testing",
  handle: "test-profile-000"
};

const updatedDummyProfile: IProfileRequest = {
  user_id: 1,
  firstName: "Test1",
  lastName: "Profile2",
  biography: "Testing3",
  handle: "test-profile-456"
};

describe("Profile Controller", () => {
  describe("Create Profile", () => {
    it("should return the profile as an object upon creation", async () => {
      // try {
      //   const user = await callApi("post", "/auth/login", testUser);
      //   const { token } = await user.data;
      // } catch (error) {
      //   console.error(error);
      // }
    });
  });
  describe("Get Profile", () => {
    it("should return the profile as an object", async () => {
      // try {
      //   const user = await callApi("post", "/auth/login", testUser);
      //   const { token } = await user.data;
      // } catch (error) {
      //   console.error(error);
      // }
    });
  });
  describe("Update Profile", () => {
    it("should return the updated profile as an object", async () => {
      // try {
      //   const user = await callApi("post", "/auth/login", testUser);
      //   const { token } = await user.data;
      // } catch (error) {
      //   console.error(error);
      // }
    });
  });
  describe("Delete Profile", () => {
    it("should return an object with a success prop", async () => {
      // try {
      //   const user = await callApi("post", "/auth/login", testUser);
      //   const { token } = await user.data;
      // } catch (error) {
      //   console.error(error);
      // }
    });
  });
});
