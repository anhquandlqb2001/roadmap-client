export enum EProvider {
  Facebook = "FACEBOOK",
  Local = "LOCAL"
}

export type TProvider = EProvider.Facebook | EProvider.Local

export type TDataToServer = {
  email: string,
  password?: string,
  provider: TProvider
  extend?: any
}

export type TFacebookResponse = {
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

export type TValidateStatus = {
  validateStatus: "" | "success" | "warning" | "error" | "validating";
  message: string;
};

// nguoi dung 
export type TUser = undefined | {
  email: string,
  jwt?: string,
  extend?: any,
  provider: TProvider
}

// du lieu tra ve function: current()
export type TResponseCurrentUser = {
  success: boolean,
  user: TUser
}

export type TResponseFromServer = {
  success: boolean,
  data?: object,
  errors?: object
}