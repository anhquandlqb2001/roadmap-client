import { useEffect, useState } from "react";
import UserAPI from "../api/user";
import { TUser } from "./types";
import useSWR from "swr";
import axios from "./axios.config";

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

const useCurrent = () => {
  // const [data, setData] = useState<TUser>(null);
  const { data, error } = useSWR("/api/node/user/current", UserAPI.current);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await UserAPI.current();
  //     response.data.success && setData(response.data.user);
  //   };
  //   fetchData();
  // }, []);
  
    if (!data?.data.success) {
      return null
    }
    return data?.data.user;
};

export default useCurrent;
