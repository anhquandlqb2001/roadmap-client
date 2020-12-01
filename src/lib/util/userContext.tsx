import React, { createContext } from "react";
import useCurrent from "./useCurrent";

export const UserContext = createContext<{ user, map }>(
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
