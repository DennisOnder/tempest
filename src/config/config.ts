import dotenv from "dotenv";

const CUSTOM_ENV_VARS = dotenv.config();

const config = {
  SERVER_PORT:
    process.env.NODE_ENV === "dev"
      ? CUSTOM_ENV_VARS.SERVER_PORT
      : process.env.SERVER_PORT
};

export default config;
