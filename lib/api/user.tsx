import { AxiosResponse } from "axios";
import axios from "../util/axios.config";
import {
  CHANGE_FIELD_MAP_ENDPOINT,
  GET_MAP_ENDPOINT,
  REGISTER_LOCAL_ENDPOINT,
  START_MAP_ENDPOINT,
} from "../util/constant";
import {
  EMap,
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

  async start_map(mapName: EMap) {
    try {
      const response = await axios.post(START_MAP_ENDPOINT, { map: mapName });
      return response;
    } catch (error) {
      console.log("error in userAPI:, ", error);
    }
  }

  async get_map(mapName: EMap) {
    try {
      const response = await axios.get(GET_MAP_ENDPOINT + `/${mapName}`);
      console.log(response);
      
      return response;
    } catch (error) {
      console.log("error in userAPI:, ", error);
    }
  }

  async change_field_map({ mapName, field, currentValue }) {
    try {
      const response = await axios.post(CHANGE_FIELD_MAP_ENDPOINT + `/${mapName}`, {
        field,
        currentValue,
      });
      return response;
    } catch (error) {
      console.log("error in userAPI:, ", error);
    }
  }
}

export default new UserAPI();
