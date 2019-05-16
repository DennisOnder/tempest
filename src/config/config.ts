import dotenv from "dotenv";

// Dotenv variables
const CUSTOM_ENV_VARS = dotenv.config();

// Check node environment
let environment;

process.env.NODE_ENV === "dev"
  ? (environment = CUSTOM_ENV_VARS)
  : (environment = process.env);

let config = {
  SERVER_PORT: environment.SERVER_PORT,
  SECRET_OR_KEY: environment.SECRET_OR_KEY,
  DB_HOST: environment.DB_HOST,
  DB_PORT: environment.DB_PORT,
  DB_NAME: environment.DB_NAME,
  DB_USER: environment.DB_USER,
  DB_PASSWORD: environment.DB_PASSWORD
};

export default config;
