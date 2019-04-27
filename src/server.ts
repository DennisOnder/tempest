import app from "./app";
import { dbConnect } from "./db/Database";

app.startServer();

dbConnect();
