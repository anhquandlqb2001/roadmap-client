import LoginForm from "../../components/Login/LoginForm";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Dang nhap</title>
        <meta name="description" content="Dang nhap de trai nghiem tot hon!" />
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
