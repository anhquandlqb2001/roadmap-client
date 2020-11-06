import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/util/userContext";
import UserAPI from "../lib/api/user";
import { EMap } from "../lib/util/types";

const Home = () => {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <button onClick={() => UserAPI.start_map(EMap.React)}>
        Start React Road
      </button>
    </div>
  );
};

export default Home;
