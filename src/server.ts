import config from "./config/config";
import app from "./app";

app.listen(config.SERVER_PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server's running on port: ${config.SERVER_PORT}`!);
  }
});
