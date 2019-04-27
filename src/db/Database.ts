import { Sequelize } from "sequelize-typescript";
import config from "../config/config";

const Database = new Sequelize({
  dialect: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  name: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  logging: false
});

function dbConnect() {
  Database.authenticate()
    .then(() => console.log("Database connection established."))
    .catch(err => console.error("Database connection error: ", err));
  // FIXME: => Database sync
  Database.sync({ logging: false });
}

export { Database, dbConnect };
