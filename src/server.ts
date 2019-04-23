import config from "./config/config";
import app from "./app";
import { Database } from "./db/Database";

function main() {
  // Server Init
  app.listen(config.SERVER_PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Server's running on port: ${config.SERVER_PORT}`!);
    }
  });
  // Database connection init
  Database.authenticate()
    .then(() => console.log("Database connection established."))
    .catch(err => console.error("Database connection error: ", err));
  // FIXME: => Database sync
  Database.sync();
}

main();
