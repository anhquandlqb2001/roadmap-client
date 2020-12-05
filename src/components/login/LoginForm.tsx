import {
  TextField,
  Button,
  Paper,
  Grid,
  Box,
  Typography,
  Link,
  CssBaseline,
} from "@material-ui/core";
import styled from "styled-components";

import { Formik, Form } from "formik";
import { onSubmitLogin } from "./service";
import { useRouter } from "next/router";
import InputField from "../common/InputField";
import NextLink from "next/link";

const GridContainer = styled(Grid)`
  height: 100vh;
`;

const PaperStyled = styled(Paper)`
  margin: 20px;
  display: "flex";
  flex-direction: "column";
  align-items: "center";
`;

const FormContainer = styled.div`
  width: "100%"; // Fix IE 11 issue.
  margin-top: 20%;
`;

const SubmitBtnStyled = styled(Button)`
  margin: 20px;
`;

const LoginForm = () => {
  const router = useRouter();
  return (
    <GridContainer container>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={PaperStyled}
        elevation={6}
        square
      >
        <div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <FormContainer>
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
                  <InputField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <InputField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <SubmitBtnStyled
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Đăng nhập
                  </SubmitBtnStyled>
                </Form>
              )}
            </Formik>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <NextLink href="/user/register" passHref >
                  <Link variant="body2">
                    {"Chưa có tài khoản? Đăng ký ngay"}
                  </Link>
                </NextLink>
              </Grid>
            </Grid>
          </FormContainer>
        </div>
      </Grid>
    </GridContainer>
  );
};

export default LoginForm;
