import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import UserOutlined from "@ant-design/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import UserAPI from "../lib/api/user";
import { AxiosResponse } from "axios";
import React from "react";
import formError from "../lib/util/formError";
import "antd/dist/antd.css";
import "../styles/form.module.css";
import { LOGIN_LOCAL_ENDPOINT } from "../lib/util/constant";
import { useRouter } from "next/router";
import Link from "next/link";
import { ValidateStatus } from "antd/lib/form/FormItem";

export interface ValidateField {
  validateStatus: ValidateStatus;
  errors: string;
}

export interface ValidateFields {
  email: ValidateField;
  password: ValidateField;
}

const LoginForm = () => {
  const router = useRouter();

  const [validateField, setValidateField] = React.useState<ValidateFields>({
    email: { errors: "", validateStatus: "" },
    password: { errors: "", validateStatus: "" },
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
          setValidateField
        );
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log('validate field: ', validateField);

  
  return (
    
    <div>
      <Form
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
            Dang nhap
          </Button>
          &nbsp;hoac{" "}
          <Link href="/user/register">
            <a>Dang ky ngay</a>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
