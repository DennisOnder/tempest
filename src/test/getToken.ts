import config from "../config/config";
import axios from "axios";
import ILoginRequest from "../interfaces/ILoginRequest";

export default async () => {
  const testUser: ILoginRequest = {
    email: "test@mail.com",
    password: "test1234"
  };
  const user = await axios.post(
    `http://localhost:${config.SERVER_PORT}/api/auth/login`,
    testUser
  );
  if (user) {
    return user.data.token;
  } else {
    return false;
  }
};
