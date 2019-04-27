import config from "../config/config";
import axios from "axios";

export default async function callApi(method, endpoint, providedData = null) {
  const payload = providedData;
  try {
    const res = await axios[method](
      `http://localhost:${config.SERVER_PORT}/api${endpoint}`,
      payload
    );
    const { status, data } = await res;
    const result = {
      status,
      data
    };
    return result;
  } catch (err) {
    console.error(err);
  }
}
