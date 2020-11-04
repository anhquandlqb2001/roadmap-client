import UserAPI from "../api/user";
import useSWR from "swr";
import { CURRENT_USER_ENDPOINT } from "./constant";


const useCurrent = () => {
  const { data } = useSWR(CURRENT_USER_ENDPOINT, UserAPI.current);
    if (!data?.data.success) {
      return null
    }
    return data?.data.user;
};

export default useCurrent;
