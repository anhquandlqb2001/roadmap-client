import { AxiosResponse } from "axios";
import axios from "../util/axios.config";
import { ENDPOINT, REGISTER_LOCAL_ENDPOINT, USER_SERVICE_ENDPOINT } from "../util/endpoints.constant";
import { TDefaultResponse, TProvider } from "../util/types";

type TDataToServer = {
  email: string;
  password?: string;
  provider: TProvider;
  extend?: any;
};


type TFormErrorResponse = {
  name: string;
  error: string;
};

// du lieu nhan duoc tu sv login-register
type TFormDataResponse = TDefaultResponse & {
  jwt: string,
  errors?: TFormErrorResponse[];
};

type TLoginParams = {
  endpoint: string;
  data: {
    email: string;
    password?: string;
    provider: TProvider;
    extend?: any;
  };
};

export type TCurrentUserResponseMap = {
  ownerMapId: string;
  mapHasStarted: string;
};

// du lieu tra ve function: current()
type TCurrentUserResponse = {
  success: boolean;
  user?:
    | {
        email: string;
        jwt?: string;
        extend?: any;
        provider: TProvider;
      }
    | undefined;
  map: TCurrentUserResponseMap[];
};

export const login = async ({
  endpoint,
  data,
}: TLoginParams): Promise<AxiosResponse<TFormDataResponse>> => {
  try {
    return await axios.post<TFormDataResponse>(endpoint, {
      email: data.email,
      password: data.password,
      provider: data.provider,
      extend: data.extend,
    } as TDataToServer);
  } catch (error) {
    console.log("error in userAPI:, ", error);
    return error.response;
  }
};

export const register = async (
  data: TDataToServer
): Promise<AxiosResponse<TFormDataResponse>> => {
  try {
    return await axios.post<TFormDataResponse>("/api/php/user/index.php?action=register", {
      email: data.email,
      password: data.password,
      provider: data.provider,
    } as TDataToServer);
  } catch (error) {
    console.log("error in userAPI:, ", error);
    return error.response;
  }
};

export const current = async (
  url: string
): Promise<AxiosResponse<TCurrentUserResponse>> => {
  try {
    const response = await axios.get<TCurrentUserResponse>(url);
    return response;
  } catch (error) {
    console.log("error in userAPI:, ", error);
    return error.response;
  }
};

export const logout = async (): Promise<{success: boolean}> => {
  try {
    localStorage.removeItem("token");
    const response = await axios.post(`/${ENDPOINT}/user/index.php?action=logout`);
    return response.data;
  } catch (error) {
    
  }
}

export const getOwnerMapList = async (): Promise<{success, ownerMaps: Array<{_id: string, name: string}>}> => {
  try {
    const response = await axios.get(`${ENDPOINT}/user/index.php?action=getOwnerMapList`)
    return response.data
  } catch (e) {
    
  }
}