import app from "./app";
import { dbConnect } from "./config/Database";

app.startServer();

dbConnect();
