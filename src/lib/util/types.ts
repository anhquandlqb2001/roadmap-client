export type TProvider = "FACEBOOK" | "LOCAL"

export type TDefaultResponse = {
  success: boolean;
  message?: string;
};

// du lieu dang nhap gui ve server

export type TFacebookResponse = {
  accessToken: string;
  data_access_expiration_time: number;
  email: string;
  expiresIn: number;
  graphDomain: string | "facebook";
  id: string;
  name: string;
  picture: {
    data: {
      height: number;
      url: string;
    };
  };
  userID: string;
};

export type TValidateStatus = {
  validateStatus: "" | "success" | "warning" | "error" | "validating";
  message: string;
};

export enum EMap {
  React = "REACT",
  FrontEnd = "FRONT_END",
  BackEnd = "BACK_END",
}