import {
  Paper,
  Grid,
  Typography,
  Link,
  CssBaseline,
  Avatar,
} from "@material-ui/core";
import styled from "styled-components";
import { LockOutlined } from "@material-ui/icons";

import { Formik, Form } from "formik";
import { onSubmitLogin } from "./service";
import { useRouter } from "next/router";
import InputField from "../common/InputField";
import NextLink from "next/link";
import Button from "../common/MyButton";

const GridContainer = styled(Grid)`
  height: 100vh;
`;

const PaperStyled = styled(Paper)`
  margin: ${(props) => props.theme.spacing(8, 4)};
  padding: ${(props) => props.theme.spacing(1)}%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled(Form)`
  width: 100%; // Fix IE 11 issue.
  margin-top: ${(props) => props.theme.spacing(1)}rem;
`;

const SubmitBtnStyled = styled(Button)`
  margin: ${(props) => props.theme.spacing(3, 0, 2)} !important;
`;

const GridImage = styled(Grid)`
  background-image: url("https://source.unsplash.com/random");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const AvatarStyled = styled(Avatar)`
  margin: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.palette.secondary.main};
`;

const LoginForm = () => {
  const router = useRouter();
  return (
    <GridContainer container>
      <CssBaseline />
      <GridImage item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <PaperStyled>
          <AvatarStyled>
            <LockOutlined />
          </AvatarStyled>
          <Typography component="h1" variant="h3">
            Đăng nhập
          </Typography>
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
              <FormContainer>
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
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  label="Đăng nhập"
                />
              </FormContainer>
            )}
          </Formik>

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <NextLink href="/user/register" passHref>
                <Link variant="body2">
                  <h4>{"Chưa có tài khoản? Đăng ký ngay"}</h4>
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </PaperStyled>
      </Grid>
    </GridContainer>
  );
};

export default LoginForm;
