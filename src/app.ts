import express from "express";
import Router from "./Router";
import config from "./config/config";
import applyMiddleware from "./middleware/applyMiddleware";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    applyMiddleware(this.app);
    this.applyRoutes();
  }
  public startServer(): void {
    this.app.listen(config.SERVER_PORT, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Server's running on port: ${config.SERVER_PORT}`!);
      }
    });
  }
  private applyRoutes(): void {
    this.app.use("/api", Router);
  }
}

export default new App();
