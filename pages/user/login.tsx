import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import UserAPI from "../../lib/api/user";
import { AxiosResponse } from "axios";
import { useState } from "react";
import formError from "../../lib/util/formError";
import 'antd/dist/antd.css';

import '../../styles/form.module.css'

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
      const response: AxiosResponse<any> = await UserAPI.login({
        email: values.email,
        password: values.password,
      });

      if (response.data.errors) {
        return formError(response.data.errors, setValidateEmail, setvalidatePassword);
      }

      console.log("im here");
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ validateEmail, validatePassword }}
      onFinish={onFinish}
      onFinishFailed={({errorFields}) => formError((errorFields as any), setValidateEmail, setvalidatePassword)}
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
