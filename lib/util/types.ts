import { type } from "os";

export type DataToServerType = {
  email: string,
  password?: string,
  provider: "local" | "facebook",
  extend?: any
}

export type FacebookResponseType = {
  accessToken: string,
  data_access_expiration_time: number,
  email: string,
  expiresIn: number,
  graphDomain: string | 'facebook',
  id: string,
  name: string,
  picture: {
    data: {
      height: number,
      url: string
    }
  },
  userID: string
}

export type ValidateStatus = {
  validateStatus: "" | "success" | "warning" | "error" | "validating";
  message: string;
};

export type UserType = undefined | {
  email: string,
  extend?: any
}