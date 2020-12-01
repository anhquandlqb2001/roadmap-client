export enum EProvider {
  Facebook = "FACEBOOK",
  Local = "LOCAL",
}

export type TProvider = EProvider.Facebook | EProvider.Local;

export type TDefaultResponse = {
  success: boolean;
  message?: string;
};

// du lieu dang nhap gui ve server
export type TDataToServer = {
  email: string;
  password?: string;
  provider: TProvider;
  extend?: any;
};

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

// nguoi dung
export type TUserData =
  | {
      email: string;
      jwt?: string;
      extend?: any;
      provider: TProvider;
    }
  | undefined;

export type TResponseCurrentUserMap = {
  ownerMapID: string;
    mapHasStarted: string
}

// du lieu tra ve function: current()
export type TResponseCurrentUser = {
  success: boolean;
  user?: TUserData;
  map: TResponseCurrentUserMap[];
};

export type TErrorResponseFromServer = {
  name: string;
  error: string;
};

// du lieu nhan duoc tu sv login-register
export type TResponseFromServer = {
  success: boolean;
  data?: {
    jwt: string;
    provider: string;
    email: string;
  };
  errors?: TErrorResponseFromServer[];
};

export enum EMap {
  React = "REACT",
  FrontEnd = "FRONT_END",
  BackEnd = "BACK_END",
}

 export interface IRoad {
  _id: string,
  name: string;
  intro: string,
  stars?: [];
}

export type TMapListData = {
  success: boolean,
  roads: IRoad[]
}