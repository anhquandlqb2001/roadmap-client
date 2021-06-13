import { useRouter } from "next/router";
import {
  Paper,
  Grid,
  Typography,
  Link,
  CssBaseline,
  Avatar,
} from "@material-ui/core";

import { Formik, Form } from "formik";
import InputField from "../Common/InputField";
import { onSubmitRegister } from "./service";
import { LockOutlined } from "@material-ui/icons";
import NextLink from "next/link";
import Button from "../Common/MyButton";
import styled from "styled-components";

const RegisterForm = () => {
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
          Đăng ký
          </Typography>
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
                <InputField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="repassword"
                  label="Nhập lại mật khẩu"
                  type="password"
                  id="repassword"
                />
                <SubmitBtnStyled
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  label="Đăng ký"
                />
              </FormContainer>
            )}
          </Formik>

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <NextLink href="/user/login" passHref>
                <Link variant="body2">
                  <h4>{"Đã có tài khoản? Đăng nhập ngay"}</h4>
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </PaperStyled>
      </Grid>
    </GridContainer>
  );
};

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
  background-image: url("/images/register.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const AvatarStyled = styled(Avatar)`
  margin: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.palette.secondary.main};
`;

export default RegisterForm;
