import Head from "next/head";
import RegisterForm from "../../components/register/RegisterForm";
import Wrapper from "../../components/common/Wrapper";

const Register = () => {
  return (
    <>
      <Head>
        <title>Dang ky</title>
        <meta name="description" content="Dang ky de trai nghiem tot hon!" />
      </Head>
      <Wrapper>
          <RegisterForm />
      </Wrapper>
    </>
  );
};

export default Register;
