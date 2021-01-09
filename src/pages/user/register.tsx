import Head from "next/head";
import RegisterForm from "../../components/Register/RegisterForm";

const Register = () => {
  return (
    <>
      <Head>
        <title>Dang ky</title>
        <meta name="description" content="Dang ky de trai nghiem tot hon!" />
      </Head>
      <RegisterForm />
    </>
  );
};

export default Register;
