import axios from "../util/axios.config";
import { LOGIN_ENDPOINT } from "../util/constant";

class UserAPI {
  async login({email, password}) {
    try {
      const response = await axios.post(LOGIN_ENDPOINT, {email, password})
      return response
    } catch (error) {
      return error.response
    }
  }
}

export default new UserAPI;