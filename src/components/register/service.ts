import { NextRouter } from "next/router";
import { EProvider } from "../../lib/util/types";
import UserAPI from "../../lib/api/user";
import errorsMap from "../../lib/util/errorsMap";

const checkRetypePassword = (
  pwd,
  rePwd,
  fn: any
) => {
  const error: Record<string, string> = {}
  if (rePwd.length !== 0) {
    if (rePwd !== pwd) {
      error['repassword'] = 'Mat khau phai trung'
    } else {
      error['repassword'] = ""
      return false
    }
  } else {
    error['repassword'] = null
  }
  fn(error as any)
  return true
};

export const onSubmitRegister = async (
  values: { email: string; password: string, repassword: string },
  setErrors,
  router: NextRouter
) => {
  if (checkRetypePassword(values.password, values.repassword, setErrors)) {
    return;
  }
  
  try {
    const { data } = await UserAPI.register({
      email: values.email,
      password: values.password,
      provider: EProvider.Local,
    });

    if (data.errors) return setErrors(errorsMap(data.errors));
    if (data.success) return router.push("/");
    
  } catch (error) {
    console.log(error);
  }
};
