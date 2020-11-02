import React from 'react'
import { useContext } from "react";
import { UserContext } from "../lib/util/userContext";
import UserAPI from '../lib/api/user'
const Home = () => {
  const user = useContext(UserContext);
  console.log(user);
  
  return (
    <div>
      <button onClick={() => UserAPI.start_react()}>Start React Road</button>
    </div>
  );
};

export default Home;
