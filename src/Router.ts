import express from "express";
import AuthController from "./controllers/AuthController";
import PostController from "./controllers/PostController";
import ProfileController from "./controllers/ProfileController";
import passport = require("passport");

class Router {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.test();
    this.auth();
    this.post();
    this.profile();
  }
  private test(): void {
    this.router.get("/test", (req: express.Request, res: express.Response) =>
      res.json({ test: "Hello World." })
    );
  }
  private auth(): void {
    this.router.post(
      "/auth/register",
      (req: express.Request, res: express.Response) =>
        AuthController.register(req, res)
    );
    this.router.post(
      "/auth/login",
      (req: express.Request, res: express.Response) =>
        AuthController.login(req, res)
    );
    this.router.get(
      "/auth/current",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) =>
        AuthController.current(req, res)
    );
  }
  private post(): void {
    this.router.post(
      "/posts/create",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) =>
        PostController.create(req, res)
    );
    this.router.get(
      "/posts/get/:handle",
      (req: express.Request, res: express.Response) =>
        PostController.getPost(req, res)
    );
    this.router.get(
      "/posts/get/user/:id",
      (req: express.Request, res: express.Response) =>
        PostController.getPostsViaUserId(req, res)
    );
    this.router.put(
      "/posts/edit/:handle",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) =>
        PostController.edit(req, res)
    );
    this.router.delete(
      "/posts/delete/:handle",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) =>
        PostController.delete(req, res)
    );
  }
  private profile(): void {
    this.router.post(
      "/profile/create",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) =>
        ProfileController.create(req, res)
    );
    this.router.get(
      "/profile/get/:handle",
      (req: express.Request, res: express.Response) =>
        ProfileController.getProfile(req, res)
    );
    this.router.put(
      "/profile/edit",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) =>
        ProfileController.editProfile(req, res)
    );
    this.router.delete(
      "/profile/delete",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) =>
        ProfileController.deleteProfile(req, res)
    );
  }
}

export default new Router().router;
