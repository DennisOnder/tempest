import { Sequelize } from "sequelize-typescript";
import config from "../config/config";

export const Database = new Sequelize({
  dialect: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  name: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD
});
