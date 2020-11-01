import UserAPI from "../lib/api/user";
import { AxiosResponse } from "axios";
import React from "react";
import "../styles/form.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import errorsMap from "../lib/util/errorsMap";
import { Grid, Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import InputField from "./InputField";
import MyButton from "./MyButton";

const checkRetypePassword = (
  pwd,
  rePwd,
  fn: any
) => {
  const error: Record<string, object> = {}
  if (rePwd.length !== 0) {
    if (rePwd !== pwd) {
      error['repassword'] = {
        errors: 'Mat khau phai trung',
        validateStatus: 'error',
      }
    } else {
      error['repassword'] = {
        errors: '',
        validateStatus: 'success',
      }
      return false
    }
  } else {
    error['repassword'] = {
      errors: null,
      validateStatus: 'success',
    }
  }
  fn(error as any)
  return true
};

const RegisterForm = () => {
  const router = useRouter();

  const onFinish = async (
    values: { email: string; password: string, repassword: string },
    setErrors
  ) => {
    if (checkRetypePassword(values.password, values.repassword, setErrors)) {
      return;
    }
    
    try {
      const response: AxiosResponse<any> = await UserAPI.register({
        email: values.email,
        password: values.password,
        provider: "local",
      });
      if (response.data.errors) {
        return setErrors(errorsMap(response.data.errors));
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Formik
        initialValues={{
          email: "",
          password: "",
          repassword: "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          await onFinish(values, setErrors);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Box margin="10px" key="email">
                <InputField name="email" id="email" label="Email" type="text" />
              </Box>
              <Box margin="10px" key="password">
                <InputField
                  name="password"
                  id="password"
                  label="Mat khau"
                  type="password"
                />
              </Box>
              <Box margin="10px" key="repassword">
                <InputField
                  name="repassword"
                  id="repassword"
                  label="Nhap lai mat khau"
                  type="password"
                />
              </Box>
              <Box margin="10px" key="button">
                <MyButton
                  label="Dang ky"
                  type="submit"
                  onClick={() => {}}
                  loading={isSubmitting}
                />
                <Box><>Da co tai khoan? <Link href="/user/login"><a>Dang nhap ngay!</a></Link></></Box>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default RegisterForm;
