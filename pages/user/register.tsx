import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import UserAPI from "../../lib/api/user";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import formError from "../../lib/util/formError";
import "antd/dist/antd.css";
import "../../styles/form.module.css";
import { ValidateStatus } from "../../lib/util/types";
import {useRouter} from "next/router";



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = () => {

  const router = useRouter()

  const [validateEmail, setValidateEmail] = useState<ValidateStatus>({
    validateStatus: "",
    message: "",
  });
  const [validatePassword, setvalidatePassword] = useState<ValidateStatus>({
    validateStatus: "",
    message: "",
  });

  const [validateRePassword, setvalidateRePassword] = useState<ValidateStatus>({
    validateStatus: "",
    message: "",
  });
  const [pwd, setPwd] = useState("");
  const [rePwd, setRePwd] = useState("");

  useEffect(() => {
    if (rePwd !== pwd) {
      setvalidateRePassword({ message: "Khong trung mat khau", validateStatus: "error" });
    } else {
      setvalidateRePassword({ message: "Hoan thanh", validateStatus: "success" });
    }
  }, [rePwd]);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response: AxiosResponse<any> = await UserAPI.register(
        {
          email: values.email,
          password: values.password,
          provider: "local",
        }
      );
      if (response.data.errors) {
        return formError(
          response.data.errors,
          setValidateEmail,
          setvalidatePassword
        );
      }

      router.push("/")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
    {...layout}
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
        label="Email"
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
        label="Mat khau"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
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
          Register
        </Button>
        Or <a href="">Login now!</a>
      </Form.Item>
    </Form>
  );
};

export default Register;
