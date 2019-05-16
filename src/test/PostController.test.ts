// tslint:disable: max-line-length
import chai from "chai";
import IPostRequest from "../interfaces/IPostRequest";
import callApi from "../utils/callApi";
import getToken from "../utils/getToken";

const title = `A test post ${Math.floor(Math.random() * 10000)}`;
const testPost: IPostRequest = {
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

const responseKeys = [
  "id",
  "user_id",
  "title",
  "handle",
  "body",
  "createdAt",
  "updatedAt"
];

const updatedTitle = `An updated test post ${Math.floor(
  Math.random() * 10000
)}`;
const updatedTestPost: IPostRequest = {
  user_id: 1,
  title: updatedTitle,
  handle: updatedTitle
    .split(" ")
    .join("-")
    .toLowerCase(),
  body: `# Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n
### Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n
> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
};

describe("Post Controller", () => {
  describe("Create", () => {
    it("should return the new post object", async () => {
      const token = await getToken();
      const response = await callApi("post", "/posts/create", testPost, token);
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.have.all.keys(...responseKeys);
    });
  });
  describe("Get Single Post", () => {
    it("should return the post as an object", async () => {
      const response = await callApi("get", `/posts/get/${testPost.handle}`);
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.have.all.keys(...responseKeys);
    });
  });
  describe("Get All Posts", () => {
    it("should return the posts as an array", async () => {
      const response = await callApi(
        "get",
        `/posts/get/user/${testPost.user_id}`
      );
      chai.expect(response.status).to.eq(200);
      chai.assert.typeOf(response.data, "array");
    });
  });
  describe("Edit", () => {
    it("should return the edited post as an object", async () => {
      const token = await getToken();
      const response = await callApi(
        "put",
        `/posts/edit/${testPost.handle}`,
        updatedTestPost,
        token
      );
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.have.all.keys(...responseKeys);
    });
  });
  describe("Delete", () => {
    it("should return an object with the success prop", async () => {
      const token = await getToken();
      const response = await callApi(
        "delete",
        `/posts/delete/${updatedTestPost.handle}`,
        {},
        token
      );
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.have.all.keys("success", "timestamp");
    });
  });
});
