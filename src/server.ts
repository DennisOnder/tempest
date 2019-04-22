import express from "express";
import config from "./config/config";

const app = express();

app.get("/test", (req, res) => {
  res.json({ test: `Hello World.` });
});

app.listen(config.SERVER_PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server's running on port: ${config.SERVER_PORT}`!);
  }
});
