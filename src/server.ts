import express from "express";
import config from "./config/config";

function rng(): number {
  return Math.floor(Math.random() * 1000);
}

const app = express();

app.get("/test", (req, res) => {
  res.json({ test: `Hello World.` });
});

app.get("/number", async (req, res) => {
  const randomNumber = await rng();
  res.json({ randomNumber });
});

app.listen(config.SERVER_PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server's running on port: ${config.SERVER_PORT}`!);
  }
});
