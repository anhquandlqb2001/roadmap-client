import React, { createContext } from "react";
import { TUser } from "./types";
import useCurrent from "./useCurrent";
export const UserContext = createContext<TUser | undefined>(null);

const UserProvider = ({ children }) => {
  const user = useCurrent();
  if (user?.user?.user?.jwt) {
    localStorage.setItem("token", user.user.user.jwt)
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
