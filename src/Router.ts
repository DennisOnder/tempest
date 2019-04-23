import express from "express";

class Router {
  public router;
  constructor() {
    this.router = express.Router();
    this.config();
  }
  private config(): void {
    this.router.get("/test", (req: express.Request, res: express.Response) =>
      res.json({ test: "Hello World." })
    );
  }
}

export default new Router().router;
