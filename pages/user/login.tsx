import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import FacebookLogin from "react-facebook-login";
import UserAPI from "../../lib/api/user";
import { AxiosResponse } from "axios";
import { useState } from "react";
import formError from "../../lib/util/formError";
import "antd/dist/antd.css";
import "../../styles/form.module.css";
import { FacebookResponseType } from "../../lib/util/types";
import {
  LOGIN_FACEBOOK_ENDPOINT,
  LOGIN_LOCAL_ENDPOINT,
} from "../../lib/util/constant";

export type ValidateStatus = {
  validateStatus: "" | "success" | "warning" | "error" | "validating";
  message: string;
};

const Login = () => {
  const [validateEmail, setValidateEmail] = useState<ValidateStatus>({
    validateStatus: "",
    message: "",
  });
  const [validatePassword, setvalidatePassword] = useState<ValidateStatus>({
    validateStatus: "",
    message: "",
  });

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response: AxiosResponse<any> = await UserAPI.login(
        {
          email: values.email,
          password: values.password,
          provider: "local",
        },
        LOGIN_LOCAL_ENDPOINT
      );

      if (response.data.errors) {
        return formError(
          response.data.errors,
          setValidateEmail,
          setvalidatePassword
        );
      }

      console.log("im here");
    } catch (error) {
      console.log(error);
    }
  };
  const facebookResponse = async (data: FacebookResponseType) => {
    console.log(data);
    try {
      const response: AxiosResponse<any> = await UserAPI.login(
        {
          email: data.email,
          // password: data.,
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
    }
  };
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ validateEmail, validatePassword }}
        onFinish={onFinish}
        onFinishFailed={({ errorFields }) =>
          formError(errorFields as any, setValidateEmail, setvalidatePassword)
        }
      >
        <Form.Item
          name="email"
          validateStatus={validateEmail.validateStatus}
          help={validateEmail.message}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          validateStatus={validatePassword.validateStatus}
          help={validatePassword.message}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>

      <div>
        <FacebookLogin
          appId="1284184291945657"
          // autoLoad={true}
          fields="name,email,picture"
          callback={facebookResponse}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
      </div>
    </>
  );
};

export default Login;
