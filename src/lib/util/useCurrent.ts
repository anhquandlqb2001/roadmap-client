import { current } from "../api/user";
import useSWR from "swr";
import { USER_ENDPOINT } from "./endpoints.constant";

const useCurrent = () => {
  const { data } = useSWR(`${USER_ENDPOINT}/current`, current);
  if (!data?.data.success) {
    return { user: null };
  }
  return { user: data?.data.user, map: data?.data.map };
};

export default useCurrent;
