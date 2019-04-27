import express from "express";
import bodyParser from "body-parser";
import Router from "./Router";
import config from "./config/config";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.applyMiddleware();
    this.applyRoutes();
  }
  public startServer(): void {
    this.app.listen(config.SERVER_PORT, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Server's running on port: ${config.SERVER_PORT}`!);
        this.app.emit("server_running");
      }
    });
  }
  private applyMiddleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }
  private applyRoutes(): void {
    this.app.use("/api", Router);
  }
}

export default new App();
