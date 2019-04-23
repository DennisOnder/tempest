import axios from "axios";
import config from "../config/config";

async function callApi(endpoint) {
  const res = await axios.get(
    `http://localhost:${config.SERVER_PORT}${endpoint}`
  );
  const { data } = await res;
  return data;
}

export default callApi;
