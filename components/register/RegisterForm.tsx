import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Grid, Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import InputField from "../common/InputField";
import MyButton from "../common/MyButton";
import { onSubmitRegister } from "./service";


const RegisterForm = () => {
  const router = useRouter();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Formik
        initialValues={{
          email: "",
          password: "",
          repassword: "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          await onSubmitRegister(values, setErrors, router);
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
