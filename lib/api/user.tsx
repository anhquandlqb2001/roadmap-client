import axios from "../util/axios.config";
import { CURRENT_USER_ENDPOINT, REGISTER_LOCAL_ENDPOINT } from "../util/constant";
import { DataToServerType } from "../util/types";

class UserAPI {
  async login(data: DataToServerType, endpoint: string) {
    try {
      const response = await axios.post(endpoint, {
        email: data.email,
        password: data.password,
        provider: data.provider,
        extend: data.extend,
      } as DataToServerType);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async register(data: DataToServerType) {
    try {
      const response = await axios.post(REGISTER_LOCAL_ENDPOINT, {
        email: data.email,
        password: data.password,
        provider: data.provider,
      } as DataToServerType);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async current() {
    try {
      const response = await axios.get(CURRENT_USER_ENDPOINT);
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new UserAPI();
