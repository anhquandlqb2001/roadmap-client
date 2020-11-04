import { EProvider, TFacebookResponse } from "../../lib/util/types";
import {
  CURRENT_USER_ENDPOINT,
  LOGIN_FACEBOOK_ENDPOINT,
  LOGIN_LOCAL_ENDPOINT,
} from "../../lib/util/constant";
import UserAPI from "../../lib/api/user";
import { mutate } from "swr";
import errorsMap from "../../lib/util/errorsMap";
import { NextRouter } from "next/router";

export const facebookResponse = async (
  user: TFacebookResponse,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await UserAPI.login(LOGIN_FACEBOOK_ENDPOINT, {
      email: user.email,
      provider: EProvider.Facebook,
      extend: {
        accessToken: user.accessToken,
        expiresIn: user.expiresIn,
        name: user.name,
        picture: user.picture,
      } as TFacebookResponse,
    });
    if (!data.success) {
      return alert("fail");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const onSubmitLogin = async (
  values: { email: string; password: string },
  setErrors,
  router: NextRouter
) => {
  try {
    const { data } = await UserAPI.login(LOGIN_LOCAL_ENDPOINT, {
      email: values.email,
      password: values.password,
      provider: EProvider.Local,
    });

    if (data.errors) {
      return setErrors(errorsMap(data.errors));
    }
    mutate(CURRENT_USER_ENDPOINT);
    data.success && router.push("/");
  } catch (error) {
    console.log(error);
  }
};
