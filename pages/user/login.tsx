import LoginForm from "../../components/LoginForm";
import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import LoginFacebook from "../../components/LoginFacebook";

const Login = () => {
  return (
    <>
      <Head>
        <title>Dang nhap</title>
        <meta name="description" content="Dang nhap de trai nghiem tot hon!" />
      </Head>
      <Wrapper>
        <>
          <LoginForm />
          <LoginFacebook />
        </>
      </Wrapper>
    </>
  );
}

export default Login