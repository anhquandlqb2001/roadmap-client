import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import UserAPI from "../../lib/api/user";
import { AxiosResponse } from "axios";
import { useState } from "react";
import formError from "../../lib/util/formError";
import 'antd/dist/antd.css';

import '../../styles/form.module.css'
import { LOGIN_LOCAL_ENDPOINT } from "../../lib/util/constant";

export type ValidateStatus = {
  validateStatus: "" | "success" | "warning" | "error" | "validating";
  message: string;
};

const Register = () => {
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
        provider: "local"
      }, LOGIN_LOCAL_ENDPOINT);

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

      <Form.Item
        name="password"
        validateStatus={validatePassword.validateStatus}
        help={validatePassword.message}
        rules={[{ required: true, message: "Please re-type your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Re-type your password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        Or <a href="">Login now!</a>
      </Form.Item>
    </Form>
  );
};

export default Register;
