import UserAPI from "../lib/api/user";
import React from "react";
import errorsMap from "../lib/util/errorsMap";
import "../styles/form.module.css";
import { CURRENT_USER_ENDPOINT, LOGIN_LOCAL_ENDPOINT } from "../lib/util/constant";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import InputField from "./InputField";
import Grid from "@material-ui/core/Grid";
import LoginFacebook from "./LoginFacebook";
import MyButton from "./MyButton";
import Box from "./Box";
import Link from "next/link";
import { EProvider } from "../lib/util/types";
import {mutate} from 'swr'

const LoginForm = () => {
  const router = useRouter();

  const onFinish = async (
    values: { email: string; password: string },
    setErrors
  ) => {
    try {
      const { data } = await UserAPI.login(
        LOGIN_LOCAL_ENDPOINT,
        {
          email: values.email,
          password: values.password,
          provider: EProvider.Local,
        }
      );

      if (data.errors) {
        return setErrors(errorsMap(data.errors));
      }
      mutate(CURRENT_USER_ENDPOINT)
      data.success && router.push("/");
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
              <Box margin="10px">
                <InputField name="email" id="email" label="Email" type="text" />
              </Box>
              <Box margin="10px">
                <InputField
                  name="password"
                  id="password"
                  label="Mat khau"
                  type="password"
                />
              </Box>
              <Box margin="10px">
                <MyButton
                  label="Dang nhap"
                  type="submit"
                  onClick={() => {}}
                  loading={isSubmitting}
                />
              </Box>
              <Box>
                <>
                  Chua co tai khoan?{" "}
                  <Link href="/user/register">
                    <a>Dang ky ngay!</a>
                  </Link>
                </>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
      <LoginFacebook />
    </Grid>
  );
};

export default LoginForm;
