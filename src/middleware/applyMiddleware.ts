import { Application } from "express";
import bodyParser from "body-parser";
import PassportConfig from "./PassportConfig";

export default (app: Application) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  PassportConfig.init(app);
};
