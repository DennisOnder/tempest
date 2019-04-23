import express from "express";
import AuthController from "./controllers/AuthController";
import IRegistrationRequest from "./interfaces/IRegistrationRequest";

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
  }
}

export default new Router().router;
