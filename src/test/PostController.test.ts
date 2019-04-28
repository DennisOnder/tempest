// tslint:disable: max-line-length
import chai from "chai";
import IPostRequest from "../interfaces/IPostRequest";
import ILoginRequest from "../interfaces/ILoginRequest";
import callApi from "./callApi";
import { Post } from "../models/post.model";

const testUser: ILoginRequest = {
  email: "test@mail.com",
  password: "test1234"
};

const title = `A test post ${Math.floor(Math.random() * 10000)}.`;
const data: IPostRequest = {
  user_id: 1,
  title,
  handle: title
    .split(" ")
    .join("-")
    .toLowerCase(),
  body: `# Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n
  ### Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n
  > Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
};

after(() => Post.destroy({ where: { handle: data.handle } }));

describe("Post Controller", () => {
  describe("Create", () => {
    it("should return the new post object", async () => {
      const user = await callApi("post", "/auth/login", testUser);
      const response = await callApi(
        "post",
        "/posts/create",
        data,
        user.data.token
      );
      chai.expect(response.status).to.eq(200);
      chai
        .expect(response.data)
        .to.have.all.keys(
          "id",
          "user_id",
          "title",
          "handle",
          "body",
          "createdAt",
          "updatedAt"
        );
    });
  });
  // describe("Get", () => {
  //   it("should return the post as an object", async () => {
  //     // Call the API
  //   });
  // });
  // describe("Edit", () => {
  //   it("should return the edited post as an object", async () => {
  //     // Call the API
  //   });
  // });
  // describe("Delete", () => {
  //   it("should return an object with the success prop", async () => {
  //     // Call the API
  //   });
  // });
});
