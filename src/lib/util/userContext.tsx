import React, { createContext } from "react";
import { TMapData, TUserData } from "./types";
import useCurrent from "./useCurrent";

export const UserContext = createContext<{ user: TUserData; map: TMapData }>(
  null
);

const UserProvider = ({ children }) => {
  const user = useCurrent();
  if (user?.user.jwt) {
    localStorage.setItem("token", user.user.jwt);
  }
  return (
    <UserContext.Provider value={{ user: user?.user, map: user?.map }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
