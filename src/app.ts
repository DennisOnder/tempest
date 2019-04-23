import express from "express";
import bodyParser from "body-parser";
import Router from "./Router";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.applyMiddleware();
    this.applyRoutes();
  }
  private applyMiddleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private applyRoutes(): void {
    this.app.use("/api", Router);
  }
}

export default new App().app;
