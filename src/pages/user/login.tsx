import LoginForm from "../../components/Login/LoginForm";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập để trải nghiệm tốt hơn!" />
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
