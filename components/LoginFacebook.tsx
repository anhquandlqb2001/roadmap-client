import React from "react";
import { EProvider, TFacebookResponse } from "../lib/util/types";
import { LOGIN_FACEBOOK_ENDPOINT } from "../lib/util/constant";
import { AxiosResponse } from "axios";
import UserAPI from "../lib/api/user";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import MyButton from "./MyButton";
import Facebook from "@material-ui/icons/Facebook";

const LoginFacebook = () => {
  const [loading, setLoading] = React.useState(false);
  const facebookResponse = async (user: TFacebookResponse) => {
    try {
      const response : AxiosResponse<any> = await UserAPI.login(
        LOGIN_FACEBOOK_ENDPOINT,
        {
          email: user.email,
          provider: EProvider.Facebook,
          extend: {
            accessToken: user.accessToken,
            expiresIn: user.expiresIn,
            name: user.name,
            picture: user.picture,
          } as TFacebookResponse,
        }
      );
      if (!response.data.success) {
        return alert("fail");
      }

      return response
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FacebookLogin
      appId="1284184291945657"
      fields="name,email,picture"
      callback={facebookResponse}
      render={(renderProps: {
        onClick: (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
      }) => (
        <MyButton
          color="primary"
          onClick={renderProps.onClick}
          label="Dang nhap voi Facebook"
          loading={loading}
          icon={<Facebook />}
        />
      )}
    />
  );
};

export default LoginFacebook;
