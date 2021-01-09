import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import MyButton from "../Common/MyButton";
import Facebook from "@material-ui/icons/Facebook";
import { facebookResponse } from './service'

const LoginFacebook = () => {
  const [loading, setLoading] = React.useState(false);
  
  return (
    <FacebookLogin
      appId="1063989997381980"
      fields="name,email,picture"
      callback={user => facebookResponse(user, setLoading)}
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
