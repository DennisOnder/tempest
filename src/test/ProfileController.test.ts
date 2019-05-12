import chai from "chai";
import callApi from "./callApi";
import getToken from "./getToken";
import IProfileRequest from "../interfaces/IProfileRequest";

const dummyProfile: IProfileRequest = {
  user_id: 1,
  firstName: "Test",
  lastName: "Profile",
  biography: "Testing",
  handle: "test-profile-111"
};

const updatedDummyProfile: IProfileRequest = {
  user_id: 1,
  firstName: "Test1",
  lastName: "Profile2",
  biography: "Testing3",
  handle: "test-edit-222"
};

describe("Profile Controller", () => {
  describe("Create Profile", () => {
    it("should return the profile as an object upon creation", async () => {
      try {
        const token = await getToken();
        const result = await callApi(
          "post",
          "/profile/create",
          dummyProfile,
          token
        );
        chai.expect(result.status).to.eq(200);
        chai.expect(result.data).to.be.an("object");
        chai
          .expect(result.data)
          .to.have.all.keys(
            "id",
            "user_id",
            "firstName",
            "lastName",
            "biography",
            "handle",
            "createdAt",
            "updatedAt"
          );
      } catch (error) {
        console.error(error);
      }
    });
  });
  describe("Get Profile", () => {
    it("should return the profile as an object", async () => {
      try {
        const profile = await callApi(
          "get",
          `/profile/get/${dummyProfile.handle}`
        );
        chai.expect(profile.status).to.eq(200);
        chai.expect(profile.data).to.be.an("object");
        chai
          .expect(profile.data)
          .to.have.all.keys(
            "id",
            "user_id",
            "firstName",
            "lastName",
            "biography",
            "handle",
            "createdAt",
            "updatedAt"
          );
      } catch (error) {
        console.error(error);
      }
    });
  });
  describe("Update Profile", () => {
    it("should return the updated profile as an object", async done => {
      try {
        const token = await getToken();
        const result = await callApi(
          "put",
          "/profile/edit",
          updatedDummyProfile,
          token
        );
        chai.expect(result.status).to.eq(200);
        chai.expect(result.data).to.be.an("object");
        chai
          .expect(result.data)
          .to.have.all.keys(
            "id",
            "user_id",
            "firstName",
            "lastName",
            "biography",
            "handle",
            "createdAt",
            "updatedAt"
          );
        done();
      } catch (error) {
        console.error(error);
      }
    });
  });
  describe("Delete Profile", () => {
    it("should return an object with a success prop and a timestamp", async () => {
      try {
        const token = await getToken();
        const result = await callApi("delete", "/profile/delete", null, token);
        chai.expect(result.status).to.eq(200);
        chai.expect(result.data).to.be.an("object");
        chai.expect(result.data).to.have.all.keys("success", "timestamp");
      } catch (error) {
        console.error(error);
      }
    });
  });
});
