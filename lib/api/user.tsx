import axios from "../util/axios.config";
import {
  CHANGE_FIELD_REACT_MAP_ENDPOINT,
  CURRENT_USER_ENDPOINT,
  GET_REACT_MAP_ENDPOINT,
  REGISTER_LOCAL_ENDPOINT,
  START_REACT_MAP_ENDPOINT,
} from "../util/constant";
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
      console.log(CURRENT_USER_ENDPOINT);

      const response = await axios.get(CURRENT_USER_ENDPOINT);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async start_react() {
    try {
      const response = await axios.post(START_REACT_MAP_ENDPOINT);
      return response;
    } catch (error) {}
  }

  async get_react_map() {
    try {
      const response = await axios.get(GET_REACT_MAP_ENDPOINT);
      return response;
    } catch (error) {}
  }

  async change_field_react_map({ field, currentValue }) {
    try {
      const response = await axios.post(CHANGE_FIELD_REACT_MAP_ENDPOINT, {
        field,
        currentValue,
      });
      return response;
    } catch (error) {}
  }
}

export default new UserAPI();
