import express from "express";
import AuthController from "./controllers/AuthController";
import IRegistrationRequest from "./interfaces/IRegistrationRequest";
import passport = require("passport");

class Router {
  public router;
  constructor() {
    this.router = express.Router();
    this.test();
    this.auth();
  }
  private test(): void {
    this.router.get("/test", (req: express.Request, res: express.Response) =>
      res.json({ test: "Hello World." })
    );
  }
  private auth(): void {
    this.router.post(
      "/auth/register",
      (req: express.Request, res: express.Response) => {
        AuthController.register(req, res);
      }
    );
    this.router.post(
      "/auth/login",
      (req: express.Request, res: express.Response) => {
        AuthController.login(req, res);
      }
    );
    this.router.get(
      "/auth/current",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) => {
        AuthController.current(req, res);
      }
    );
  }
}

export default new Router().router;
