import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import UserOutlined from "@ant-design/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import UserAPI from "../lib/api/user";
import { AxiosResponse } from "axios";
import React from "react";
import formError from "../lib/util/formError";
import "antd/dist/antd.css";
import "../styles/form.module.css";
import { useRouter } from "next/router";
import Link from 'next/link'
import { ValidateStatus } from '../lib/util/types';
import { ValidateFields } from './LoginForm';
//  git
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const checkRetypePassword = (pwd, rePwd, fn: any) => {
  if (rePwd.length !== 0) {
    if (rePwd !== pwd) {
      fn({
        message: "Khong trung mat khau",
        validateStatus: "error",
      });
    } else {
      fn({
        message: null,
        validateStatus: "success",
      });
    }
  } else {
    fn({
      message: null,
      validateStatus: "success",
    });
  }
}

const RegisterForm = () => {
  const router = useRouter();

  const [validateField, setValidateField] = React.useState<ValidateFields>({
    email: { errors: "", validateStatus: "" },
    password: { errors: "", validateStatus: "" },
  });

  const [validateRePassword, setvalidateRePassword] = React.useState<ValidateStatus>({
    validateStatus: "",
    message: "",
  });

  const [pwd, setPwd] = React.useState("");
  const [rePwd, setRePwd] = React.useState("");

  React.useEffect(() => {
    checkRetypePassword(pwd, rePwd, setvalidateRePassword)
  }, [rePwd]);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response: AxiosResponse<any> = await UserAPI.register({
        email: values.email,
        password: values.password,
        provider: "local",
      });
      if (response.data.errors) {
        return formError(
          response.data.errors, setValidateField
        );
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...layout}
      name="normal_login"
      className="login-form"
      initialValues={{ validateField }}
      onFinish={onFinish}
      onFinishFailed={({ errorFields }) =>
        formError(errorFields as any, setValidateField)
      }
    >
      <Form.Item
        name="email"
        validateStatus={validateField.email?.validateStatus}
        help={validateField.email?.errors}
        rules={[
          {
            required: true,
            message: "Please input your Email!",
            type: "email",
          },
        ]}
        label="Email"
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        validateStatus={validateField.password?.validateStatus}
        help={validateField.password?.errors}
        rules={[{ required: true, message: "Please input your Password!" }]}
        label="Mat khau"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="re-password"
        validateStatus={validateRePassword.validateStatus}
        help={validateRePassword.message}
        label="Nhap lai mat khau"
        rules={[{ required: true, message: "Please re-type your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Re-type your password"
          value={rePwd}
          onChange={(e) => setRePwd(e.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Dang ky
        </Button>
        Da co tai khoan? <Link href="/user/login"><a>Dang nhap ngay!</a></Link>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

