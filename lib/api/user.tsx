import { AxiosResponse } from "axios";
import axios from "../util/axios.config";
import {
  REGISTER_LOCAL_ENDPOINT,
} from "../util/endpoints.constant";
import {
  TDataToServer,
  TResponseCurrentUser,
  TResponseFromServer,
} from "../util/types";

class UserAPI {
  async login(
    endpoint: string,
    data: TDataToServer
  ): Promise<AxiosResponse<TResponseFromServer>> {
    try {
      return await axios.post<TResponseFromServer>(endpoint, {
        email: data.email,
        password: data.password,
        provider: data.provider,
        extend: data.extend,
      } as TDataToServer);
    } catch (error) {
      console.log("error in userAPI:, ", error);
      return error.response;
    }
  }

  async register(
    data: TDataToServer
  ): Promise<AxiosResponse<TResponseFromServer>> {
    try {
      return await axios.post<TResponseFromServer>(
        REGISTER_LOCAL_ENDPOINT,
        {
          email: data.email,
          password: data.password,
          provider: data.provider,
        } as TDataToServer
      );
    } catch (error) {
      console.log("error in userAPI:, ", error);
      return error.response;
    }
  }

  async current(url): Promise<AxiosResponse<TResponseCurrentUser>> {
    try {
      return await axios.get<TResponseCurrentUser>(url);
    } catch (error) {
      console.log("error in userAPI:, ", error);
      return error.response;
    }
  }
}

export default new UserAPI();
