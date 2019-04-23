import dotenv from "dotenv";

const CUSTOM_ENV_VARS = dotenv.config();

const config = {
  SERVER_PORT:
    process.env.NODE_ENV === "dev"
      ? CUSTOM_ENV_VARS.SERVER_PORT
      : process.env.SERVER_PORT,
  DB_HOST:
    process.env.NODE_ENV === "dev"
      ? CUSTOM_ENV_VARS.DB_HOST
      : process.env.DB_HOST,
  DB_PORT:
    process.env.NODE_ENV === "dev"
      ? CUSTOM_ENV_VARS.DB_PORT
      : process.env.DB_PORT,
  DB_NAME:
    process.env.NODE_ENV === "dev"
      ? CUSTOM_ENV_VARS.DB_NAME
      : process.env.DB_NAME,
  DB_USER:
    process.env.NODE_ENV === "dev"
      ? CUSTOM_ENV_VARS.DB_USER
      : process.env.DB_USER,
  DB_PASSWORD:
    process.env.NODE_ENV === "dev"
      ? CUSTOM_ENV_VARS.DB_PASSWORD
      : process.env.DB_PASSWORD
};

export default config;
