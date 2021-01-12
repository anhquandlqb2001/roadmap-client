import { NextRouter } from "next/router";
import { mutate } from "swr";
import { register } from "../../lib/api/user";
import { USER_ENDPOINT } from "../../lib/util/endpoints.constant";
import errorsMap from "../../lib/util/errorsMap";

type TCheckReTypePassword = {
  password: string;
  retype_password: string;
  cb(e: Record<string, string>): void;
};

const checkRetypePassword = ({
  password,
  retype_password,
  cb,
}: TCheckReTypePassword) => {
  const error: Record<string, string> = {};
  if (retype_password.length !== 0) {
    if (retype_password !== password) {
      error["repassword"] = "Mat khau phai trung";
    } else {
      error["repassword"] = "";
      return false;
    }
  } else {
    error["repassword"] = null;
  }
  cb(error as any);
  return true;
};

export const onSubmitRegister = async (
  values: { email: string; password: string; repassword: string },
  setErrors,
  router: NextRouter
) => {
  if (
    checkRetypePassword({
      password: values.password,
      retype_password: values.repassword,
      cb: setErrors,
    })
  )
    return;

  try {
    const { data } = await register({
      email: values.email,
      password: values.password,
      provider: "LOCAL",
    });

    if (data.errors) return setErrors(errorsMap(data.errors));
    mutate(`${USER_ENDPOINT}`);
    if (data.success) return router.push("/user/login", undefined, { shallow: true });
  } catch (error) {
    console.log(error);
  }
};
