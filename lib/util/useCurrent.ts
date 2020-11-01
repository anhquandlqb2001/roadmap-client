import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import UserAPI from "../api/user";
import { UserType } from "./types";

const useCurrent = () => {
  const [data, setData] = useState<UserType>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse = await UserAPI.current();
      setData(response.data);
    }
    fetchData()
  }, []);
  return data;
};

export default useCurrent;
