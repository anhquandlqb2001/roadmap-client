import React from "react";
import { FacebookResponseType } from "../lib/util/types";
import { LOGIN_FACEBOOK_ENDPOINT } from "../lib/util/constant";
import { AxiosResponse } from "axios";
import UserAPI from "../lib/api/user";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import MyButton from "./MyButton";
import Facebook from "@material-ui/icons/Facebook";


const LoginFacebook = () => {
  const [loading, setLoading] = React.useState(false)
  const facebookResponse = async (data: FacebookResponseType) => {
    try {
      const response: AxiosResponse<any> = await UserAPI.login(
        {
          email: data.email,
          provider: "facebook",
          extend: {
            accessToken: data.accessToken,
            expiresIn: data.expiresIn,
            name: data.name,
            picture: data.picture,
          } as FacebookResponseType,
        },
        LOGIN_FACEBOOK_ENDPOINT
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  return (
    <FacebookLogin
      appId="1284184291945657"
      fields="name,email,picture"
      callback={facebookResponse}
      render={(renderProps: { onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; }) => (
        <MyButton color="primary" onClick={renderProps.onClick} label="Dang nhap voi Facebook" loading={loading} icon={<Facebook />} />
      )}
    />
  );
};

export default LoginFacebook;
