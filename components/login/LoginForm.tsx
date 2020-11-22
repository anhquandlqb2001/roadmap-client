import React from "react";
import { Form, Formik } from "formik";
import InputField from "../common/InputField";
import Grid from "@material-ui/core/Grid";
import LoginFacebook from "./LoginFacebook";
import MyButton from "../common/MyButton";
import Box from "../common/Box";
import Link from "next/link";
import { onSubmitLogin } from "./service";
import { useRouter } from 'next/router'

const LoginForm = () => {
  const router = useRouter()
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          await onSubmitLogin(values, setErrors, router);
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
      {/* <LoginFacebook /> */}
    </Grid>
  );
};

export default LoginForm;
