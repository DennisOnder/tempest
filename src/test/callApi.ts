import config from "../config/config";
import axios from "axios";

export default async function callApi(
  method,
  endpoint,
  providedData = null,
  token = ""
) {
  const payload = providedData;
  try {
    // tslint:disable-next-line: no-string-literal
    axios.defaults.headers.common["Authorization"] = token;
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
