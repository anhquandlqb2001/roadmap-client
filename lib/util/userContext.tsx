import React, { createContext } from "react";
import { UserType } from "./types";
import useCurrent from "./useCurrent";

export const UserContext = createContext<UserType | undefined>(null)

const UserProvider = ({children}) => {
  const user = useCurrent()
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider