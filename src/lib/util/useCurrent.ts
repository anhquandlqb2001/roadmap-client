import { current } from "../api/user";
import useSWR from "swr";
import { USER_ENDPOINT } from "./endpoints.constant";
import React from 'react'

const useCurrent = () => {
  const [mounted, setMounted] = React.useState(false)
  const { data } = useSWR(mounted ? `${USER_ENDPOINT}` : null, current);
  React.useEffect(()=> {
    setMounted(true)
  }, [])
  
  if (!data?.data.success) {
    return { user: null };
  }
  return { user: data?.data.user, map: data?.data.map };
};

export default useCurrent;
