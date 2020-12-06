import { TFacebookResponse } from "../../lib/util/types";
import {
  CURRENT_USER_ENDPOINT,
  LOGIN_FACEBOOK_ENDPOINT,
  LOGIN_LOCAL_ENDPOINT,
} from "../../lib/util/endpoints.constant";
import { login } from "../../lib/api/user";
import { mutate } from "swr";
import errorsMap from "../../lib/util/errorsMap";
import { NextRouter } from "next/router";

export const facebookResponse = async (
  user: TFacebookResponse,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await login({
      endpoint: LOGIN_FACEBOOK_ENDPOINT,
      data: {
        email: user.email,
        provider: "FACEBOOK",
        extend: {
          accessToken: user.accessToken,
          expiresIn: user.expiresIn,
          name: user.name,
          picture: user.picture,
        } as TFacebookResponse,
      },
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
    const { data } = await login({
      endpoint: LOGIN_LOCAL_ENDPOINT,
      data: {
        email: values.email,
        password: values.password,
        provider: "LOCAL",
      },
    });

    if (data.errors) {
      return setErrors(errorsMap(data.errors));
    }
    if (!data.success) {
      return;
    }
    mutate(CURRENT_USER_ENDPOINT);
    data.success && router.push("/");
  } catch (error) {
    console.log(error);
  }
};
