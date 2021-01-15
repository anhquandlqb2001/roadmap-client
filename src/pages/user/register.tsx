import Head from "next/head";
import RegisterForm from "../../components/Register/RegisterForm";

const Register = () => {
  return (
    <>
      <Head>
        <title>Đăng ký</title>
        <meta name="description" content="Đăng ký lotrinh ngay!" />
      </Head>
      <RegisterForm />
    </>
  );
};

export default Register;
